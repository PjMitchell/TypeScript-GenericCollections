declare module Collections {
    interface IEqualityComparer<T> {
        equals(value1: T, value2: T): boolean;
        getHashCode(value: T): number;
    }
    interface IEqualityComparable {
        equals(value1: any): boolean;
        getHashCode(): number;
    }
    interface ISet<T> {
        add(item: T): boolean;
        remove(item: T): boolean;
        contains(item: T): boolean;
        getCount(): number;
        clear(): void;
        toArray(): Array<T>;
        exceptWith(other: Array<T>): void;
        intersectWith(other: Array<T>): void;
        unionWith(other: Array<T>): void;
        isSubsetOf(other: Array<T>): boolean;
        isSupersetOf(other: Array<T>): boolean;
        overlaps(other: Array<T>): boolean;
        setEquals(other: Array<T>): boolean;
    }
    interface IDictionary<Tkey, TValue> {
        add(key: Tkey, item: TValue): void;
        remove(key: Tkey): boolean;
        containsKey(key: Tkey): boolean;
        getCount(): number;
        clear(): void;
        toArray(): Array<KeyValuePair<Tkey, TValue>>;
        get(key: Tkey): TValue;
    }
    class CollectionException implements Error {
        message: string;
        name: string;
        constructor(message: string);
        toString(): string;
    }
    class KeyNotFoundException extends CollectionException {
        constructor(message: string);
    }
    class KeyValuePair<Tkey, TValue> {
        key: Tkey;
        value: TValue;
        constructor(key: Tkey, value: TValue);
    }
    abstract class Set<T> implements ISet<T> {
        protected buckets: T[][];
        protected count: number;
        constructor(source?: Array<T>);
        abstract getHashCode(item: T): number;
        abstract areEqual(value1: T, value2: T): boolean;
        add(item: T): boolean;
        remove(item: T): boolean;
        contains(item: T): boolean;
        getCount(): number;
        clear(): void;
        toArray(): T[];
        exceptWith(other: Array<T>): void;
        intersectWith(other: Array<T>): void;
        unionWith(other: Array<T>): void;
        isSubsetOf(other: Array<T>): boolean;
        isSupersetOf(other: Array<T>): boolean;
        overlaps(other: Array<T>): boolean;
        setEquals(other: Array<T>): boolean;
        private buildInternalBuckets(source);
        private bucketsContains(internalBuckets, item);
    }
    class HashSet<T extends IEqualityComparable> extends Set<T> {
        constructor(source?: Array<T>);
        getHashCode(item: T): number;
        areEqual(value1: T, value2: T): boolean;
    }
    class ObjectSet<T> extends Set<T> {
        private comparer;
        constructor(comparer: IEqualityComparer<T>, source?: Array<T>);
        getHashCode(item: T): number;
        areEqual(value1: T, value2: T): boolean;
    }
    abstract class Table<Tkey, TValue> implements IDictionary<Tkey, TValue> {
        protected buckets: KeyValuePair<Tkey, TValue>[][];
        protected count: number;
        constructor();
        abstract getHashCode(item: Tkey): number;
        abstract areEqual(value1: Tkey, value2: Tkey): boolean;
        add(key: Tkey, value: TValue): void;
        get(key: Tkey): TValue;
        remove(key: Tkey): boolean;
        containsKey(key: Tkey): boolean;
        clear(): void;
        getCount(): number;
        toArray(): KeyValuePair<Tkey, TValue>[];
    }
    class HashTable<Tkey extends IEqualityComparable, TValue> extends Table<Tkey, TValue> {
        getHashCode(item: Tkey): number;
        areEqual(value1: Tkey, value2: Tkey): boolean;
        constructor();
    }
    class ObjectTable<Tkey extends IEqualityComparable, TValue> extends Table<Tkey, TValue> {
        private comparer;
        constructor(comparer: IEqualityComparer<Tkey>);
        getHashCode(item: Tkey): number;
        areEqual(value1: Tkey, value2: Tkey): boolean;
    }
}
