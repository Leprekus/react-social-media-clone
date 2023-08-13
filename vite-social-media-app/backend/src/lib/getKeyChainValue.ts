import { ObjectLiteral } from '../../typings';

export default function getKeyChainValue(
    keyChain: string,
    data: ObjectLiteral
): unknown {
    
    const parts = String(keyChain).split('.')
    const key = parts.shift() as string;
    const value = data[key] as ObjectLiteral

    if(parts.length) {
        if(value && typeof value === 'object') {
            return getKeyChainValue(parts.join('.'), value)
        }
        throw new Error(`Cannot get ${parts.join('.')} of ${value}`)
    }

    return value
}