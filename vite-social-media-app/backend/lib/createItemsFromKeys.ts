import { ObjectLiteral } from '../typings';

export default function createItemFromKeys(
    keys: string[],
    data: ObjectLiteral
): ObjectLiteral {
    const partialItem: ObjectLiteral = {};

    //loops over key chains
    //until there are no more keys / children left
    keys.forEach((keyChain) => {
        let target = partialItem;
        let source = data;

        String(keyChain)
            .split('.')
            .forEach((key, index, parts) => {
                const value = source[key] as ObjectLiteral
                if(value === undefined)
                    throw new Error(`Key ${key} does not exist in ${JSON.stringify(source)}`)
                
                const isLastKey = index == parts.length - 1
                target[key] =
                    //if last key returns value
                    //else returns array if array else object
                    target[key] ?? (!isLastKey ? (Array.isArray(value) ? [] : {} ) : value)
                target = target[key] as ObjectLiteral;
                source = value
            })
    })
    return partialItem
}