export type ObjectLiteral = {
    [key: string]: any;
  };
  
  interface Matcher<T> {
    key: keyof T | string;
    comparator: Comparator;
    value: unknown | string | RegExp | [number, number] | unknown[] | number;
  }
  
  export enum Comparator {
    Equals,
    NotEqual,
    In,
    Between,
    GreaterThan,
    LessThan,
    GreaterOrEqual,
    LessOrEqual,
    Matches,
  }

interface Collector<T> {
  collector: (
  key: keyof T | string, 
  comparator: Comparator, 
  value: unknown
  ) => void
}
