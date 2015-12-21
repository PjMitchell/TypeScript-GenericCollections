declare module Collections {
    interface IEqualityComparer<T> {
        equals(value1: T, value2: T): boolean;
        getHashCode(value: T): number;
    }
    interface IEqualityComparable {
        equals(value1: any): boolean;
        getHashCode(): number;
    }
    class HashSet<T extends IEqualityComparable> {
        private buckets;
        private count;
        constructor();
        add(item: T): boolean;
        remove(item: T): boolean;
        contains(item: T): boolean;
        getCount(): number;
        clear(): void;
    }
}
