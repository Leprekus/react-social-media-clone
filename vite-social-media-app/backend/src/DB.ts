import path from 'path'
import fs from 'fs'
import { writeFile, readFile, unlink } from 'fs/promises'
import collect from './lib/collect';
import { Matcher, ObjectLiteral } from '../typings';
import matchDataKeyValue from './lib/matchDataKeyValue';
import createItemFromKeys from './lib/createItemsFromKeys';
import { mergeFilterObjects, mergeObjects } from './lib/mergeObject-helpers';

export class JSONDB<T extends object> {

    private _size = 0;
    private readonly  filePath: string;

    constructor(private filename: string) {
        this.filePath = path.join(__dirname, 'data', `${filename}.json`)
        if(!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]', 'utf-8')
        }
    }

    private async read(): Promise<Array <T>> {
        return JSON.parse(await readFile(this.filePath, 'utf-8'))
    }
    private async save(data: T | Array<T>) {
        try {

            let content = data
            
            if(!Array.isArray(data)) {
                content = await this.read()
                content.push(data)
            }
                
            return writeFile(this.filePath, JSON.stringify(content))

        }catch(error) {

            console.log(error)
            throw new Error('Failed to save data')
        }
    }
    get size() {
        return this._size
    }
    get path () {
        return this.filePath
    }
    async insert(data: T) {
        await this.save(data)
        this._size += 1;

        return data
    }
    getOne(...keys: (keyof T | string)[]) {
        return collect<T, Promise<T | Partial<T> | null>>(async (matchers) => {
            const item = (await this.read()).find((item) => {
                return matchers.every((matcher: Matcher<T>) =>
                    matchDataKeyValue(item, matcher)
                )
            })
            if(item) {
                if(keys.length) {
                    return createItemFromKeys(
                        keys as string[],
                        item as ObjectLiteral
                    ) as Partial<T>
                }
                return item
            }
            return null
        })
    }
    getAll(...keys: (keyof T | string)[]) {
        return collect<T, Promise<T[] | Partial<T[]> | null>>(async (matchers) => {
            const items = (await this.read()).filter((item) => {
                return matchers.every((matcher: Matcher<T>) =>
                    matchDataKeyValue(item, matcher)
                )
            })
            if(keys.length) {
                return items.map((item: T) => {
                    return createItemFromKeys(keys as string[], item as ObjectLiteral)
                }) as Partial<T[]>
            }
            return items
        })
    }
    updateOne(data: Partial<T>) {
        return collect<T, Promise<T | null>>(async (matchers) => {
            const list = await this.read()
            const item = list.find((item) => {
                return matchers.every((matcher: Matcher<T>) => 
                    matchDataKeyValue(item, matcher)
                )
            })
            if(item) {
                mergeObjects(item, data)

                await this.save(list)

                return item
            }

            return null
        })
    }
    filterOne(data: Partial<T>) {
        return collect<T, Promise<T | null>>(async (matchers) => {
            const list = await this.read()
            const item = list.find((item) => {
                return matchers.every((matcher: Matcher<T>) => 
                    matchDataKeyValue(item, matcher)
                )
            })
            if(item) {
                mergeFilterObjects(item, data)
                await this.save(list)
                return item
            }

            return null
        })
    }
    updateAll(data: Partial<T>) {
        return collect<T, Promise<T[] | null>>(async (matchers) => {
            const list = await this.read()
            const items = list.filter((item) => {
                return matchers.every((matcher: Matcher<T>) => 
                    matchDataKeyValue(item, matcher)
                )
            })
            items.forEach((item) => {
                mergeObjects(item, data)
            })
            await this.save(list);
            return items
        })
    }
    deleteOne() {
        return collect<T, Promise<T | null>>(async (matchers) => {
            const list = await this.read()
            const existingItemIndex = list.findIndex((item) => {
                return matchers.every((matcher: Matcher<T>) => 
                    matchDataKeyValue(item, matcher)
                    )
            })
            if(existingItemIndex >= 0) {
                const [existingItem] = list.splice(existingItemIndex, 1)
                await this.save(list);
                this._size -= 1
                return existingItem
            }
            return null
        })
    }
    deleteAll () {
        return collect<T, Promise<T[] | null>>(async (matchers) => {
            const existingItems: Array<T> = []
            const list = (await this.read()).filter((item) => {
                if(
                    matchers.every((matcher: Matcher<T>) =>
                        matchDataKeyValue(item, matcher)
                    )
                ) {
                    existingItems.push(item)
                    return false
                }
                return true
            })
            if(existingItems.length) {
                await this.save(list)
                this._size = list.length

                return existingItems
            }
            return null
        })
    }
    async drop() {
        console.log({path :this.filePath})
        await unlink(this.filePath)
    }

}