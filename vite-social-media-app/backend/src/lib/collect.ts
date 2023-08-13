import { Matcher } from '../../typings';
import where from './where';

export default function collect<T, R>(done: (res: Matcher<T>[]) => R) {
    
    const matchers: Matcher<T>[] = [];

    const run = async () => done(matchers)
    return {
        where: where<T, R>((key, comparator, value) => {
            matchers.push({ key, comparator, value })
        }, run),
        run
    }
}