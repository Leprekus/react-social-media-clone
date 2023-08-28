import { Comparator } from '../../enums';
import {  Matcher, ObjectLiteral } from '../../typings';
import getKeyChainValue from './getKeyChainValue';

export default function matchDataKeyValue<T>(
    data: T,
    { comparator, key, value }: Matcher<T>
) {
    const val = getKeyChainValue(key as string, data as ObjectLiteral)

    switch (comparator as Comparator) {
        case Comparator.Equals:
            return val === value;
        case Comparator.NotEqual:
            return val !== value;
        case Comparator.In:
            //handle includes in arrays and strings
            return Array.isArray(val) ? 
            (val as Array<unknown> ).includes(value) :
            (val as string).toLowerCase().includes((value as string).toLowerCase())
            ;
        case Comparator.Between:
            return (
                Number(val) > Number((value as Array<number>[0])) &&
                Number(val) > Number((value as Array<number>[1]))
            );
        case Comparator.GreaterOrEqual:
            return Number(val) >= Number(value);
        case Comparator.GreaterThan:
            return Number(val) > Number(value);
        case Comparator.LessOrEqual:
            return Number(val) <= Number(value);
        case Comparator.LessThan:
            return Number(val) < Number(value);
        case Comparator.Matches:
            return typeof value === 'string' 
            ? new RegExp(value).test(`${val}`)
            : (value as RegExp).test(`${val}`)
        default:
            return false;
            
    }
}