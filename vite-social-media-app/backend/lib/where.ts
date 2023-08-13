import { Comparator } from '../typings';

export default function where<T, R>(
    collector: (
  key: keyof T | string, 
  comparator: Comparator, 
  value: unknown
  ) => void,
    runner: () => Promise<R>
  ) {
    return (key: keyof T | string) => {

        const chain = {
            where: where<T, R>(collector, runner)
        }

        return {
            matches(val: string | RegExp) {
                collector(key , Comparator.Matches, val)
                return chain
            },
            equals(val: unknown) {
                collector(key, Comparator.Matches, val)
                return chain
            },
            notEqual(val: unknown) {
                collector(key, Comparator.NotEqual, val)
                return chain
            },
            in(val: Array<unknown>) {
                collector(key, Comparator.In, val)
                return chain
            },
            between(val: [number, number]) {
                collector(key, Comparator.Between, val)
                return chain
            },
            lessOrEqual(val: number) {
                collector(key, Comparator.LessThan, val)
            },
            greaterThan(val: number) {
                collector(key, Comparator.GreaterThan, val)
                return chain
            },
            greaterOrEqual(val: number) {
                collector(key, Comparator.GreaterOrEqual, val) 
                return chain
            }
        }
    }
  }

