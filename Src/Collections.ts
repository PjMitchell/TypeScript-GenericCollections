module Collections {
    /*Provides interface to determined object's hash code and wether two items are equal
    */
    export interface IEqualityComparer<T> {
        /*Determines if two objects are equal
        *@param value1 first value to be compared
        *@param value2 second value to be compared
        */
        equals(value1: T, value2: T): boolean;
        /*Generates hash code for object
        *@param value value used to generate Hashcode
        */
        getHashCode(value: T): number;
    }

    /*
    Object declares its own equality method and Hashcode generation
    */
    export interface IEqualityComparable {
        /*Determines if another object is equal to this instance
        *@param other object to be compared
        */
        equals(other: any): boolean;
        /*Generates hash code for object
        */
        getHashCode(): number;
    }

    export interface ISet<T> {
        add(item: T): boolean
        remove(item: T): boolean
        contains(item: T): boolean
        getCount(): number
        clear(): void
        toArray(): Array<T>
        //Removes all elements in the specified collection from the current set
        exceptWith(other: Array<T>): void
        //Modifies the current Set object to contain only elements that are present in that object and in the specified array
        intersectWith(other: Array<T>): void
        //Modifies the current set object to contain all elements that are present in itself, the specified collection, or both.
        unionWith(other: Array<T>): void
        isSubsetOf(other: Array<T>): boolean
        isSupersetOf(other: Array<T>): boolean
        overlaps(other: Array<T>): boolean
        setEquals(other: Array<T>): boolean
    }

    export interface IDictionary<Tkey, TValue> {
        add(key: Tkey, item: TValue): void
        remove(key: Tkey): boolean
        containsKey(key: Tkey): boolean
        getCount(): number
        clear(): void
        toArray(): Array<KeyValuePair<Tkey, TValue>>
        get(key: Tkey): TValue
    }

    interface IBucketsWithCount<T> {
        Buckets: Array<Array<T>>
        Count: number
    }

    export class CollectionException implements Error{
        name = "CollectionException";
        constructor(public message: string) { }
        toString() {
            return this.name + ": " + this.message
        }
    }

    export class KeyNotFoundException extends CollectionException {       
        constructor(message: string) {
            super(message)
            name = "KeyNotFoundException";
        }
    };

    export class KeyValuePair<Tkey, TValue> {
        constructor(public key: Tkey, public value: TValue) { }
    }

    export abstract class Set<T> implements ISet<T> {
        protected buckets: T[][];
        protected count: number;
        constructor(source?: Array<T>) {
            this.clear();
            if (source)
                source.forEach(value => {
                    this.add(value);
                });
        }
        abstract getHashCode(item: T): number;
        abstract areEqual(value1: T, value2: T): boolean;

        add(item: T) {
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array<T>();
                newBucket.push(item);
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return true;
            }
            if (bucket.some((value) => this.areEqual(value,item)))
                return false;
            bucket.push(item);
            this.count = this.count + 1;
            return true;
        };

        remove(item: T) {
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array<T>();
            bucket.forEach((value) => {
                if (!this.areEqual(value, item))
                    newBucket.push(item);
                else
                    result = true;
            });
            this.buckets[hashCode] = newBucket;
            if (result)
                this.count = this.count - 1;
            return result;
        }

        contains(item: T) {
            return this.bucketsContains(this.buckets, item)
        };

        getCount() {
            return this.count;
        }

        clear() {
            this.buckets = new Array<Array<T>>();
            this.count = 0;
        }

        toArray() {
            var result = new Array<T>()
            this.buckets.forEach(value => {
                value.forEach(inner => {
                    result.push(inner);
                });
            });
            return result;
        }

        //Removes all elements in the specified collection from the current set
        exceptWith(other: Array<T>) {
            if (other) {
                other.forEach(value => {
                    this.remove(value);
                })
            }
        }
        //Modifies the current Set object to contain only elements that are present in that object and in the specified array
        intersectWith(other: Array<T>) {            
            if (other) {
                var otherBuckets = this.buildInternalBuckets(other);
                this.toArray().forEach(value => {
                    if (!this.bucketsContains(otherBuckets.Buckets, value))
                        this.remove(value);
                });
            }
            else {
                this.clear();
            }
        }

        unionWith(other: Array<T>) {
            other.forEach(value => {
                this.add(value);
            });
        }

        isSubsetOf(other: Array<T>) {

            var otherBuckets = this.buildInternalBuckets(other);
            return this.toArray().every(value => this.bucketsContains(otherBuckets.Buckets, value));

        }
        isSupersetOf(other: Array<T>) {
            return other.every(value => this.contains(value));
        }

        overlaps(other: Array<T>) {
            return other.some(value => this.contains(value));
        }

        setEquals(other: Array<T>) {
            var otherBuckets = this.buildInternalBuckets(other);
            if (otherBuckets.Count !== this.count)
                return false
            return other.every(value => this.contains(value));
        }

        private buildInternalBuckets(source: Array<T>): IBucketsWithCount<T> {
            var internalBuckets = new Array<Array<T>>();
            var internalCount = 0;
            source.forEach(item=> {
                var hashCode = this.getHashCode(item);
                var bucket = internalBuckets[hashCode];
                if (bucket === undefined) {
                    var newBucket = new Array<T>();
                    newBucket.push(item);
                    internalBuckets[hashCode] = newBucket;
                    internalCount = internalCount + 1;
                }
                else if (!bucket.some((value) => this.areEqual(value, item))) {
                    bucket.push(item);
                    internalCount = internalCount + 1;
                }
            });
            return { Buckets: internalBuckets, Count: internalCount };
        }

        private bucketsContains(internalBuckets: Array<Array<T>>, item: T) {
            var hashCode = this.getHashCode(item);
            var bucket = internalBuckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some((value) => this.areEqual(value, item));
        }
    } 


    export class HashSet<T extends IEqualityComparable> extends Set<T>  {
        constructor(source?: Array<T>) {
            super(source)
        }
        getHashCode(item: T) {
            return item.getHashCode();
        }
        areEqual(value1: T, value2: T) {
            return value1.equals(value2);
        }
    }

    export class ObjectSet<T> extends Set<T>{
        constructor(private comparer: IEqualityComparer<T>, source?: Array<T>) {
            super(source);
        }
        getHashCode(item: T) {
            return this.comparer.getHashCode(item);
        }
        areEqual(value1: T, value2: T) {
            return this.comparer.equals(value1,value2);
        }
        
    }

    export abstract class Table<Tkey, TValue> implements IDictionary<Tkey, TValue>{
        protected buckets: KeyValuePair<Tkey, TValue>[][];
        protected count: number;
        constructor() {
            this.clear();
        }
        abstract getHashCode(item: Tkey): number;
        abstract areEqual(value1: Tkey, value2: Tkey): boolean;

        add(key: Tkey, value: TValue) {
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array<KeyValuePair<Tkey, TValue>>();
                newBucket.push(new KeyValuePair(key, value));
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return;
            }
            if (bucket.some((value) => this.areEqual(value.key,key)))
                throw new CollectionException("Key already exists")
            bucket.push(new KeyValuePair(key, value));
            this.count = this.count + 1;
        }

        get(key: Tkey) {
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                throw new KeyNotFoundException("Key not found");
            }
            var result = bucket.filter(value => this.areEqual(value.key, key)).pop();
            if (bucket === undefined)
                throw new KeyNotFoundException("Key not found");
            return result.value;
        }

        remove(key: Tkey) {
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array<KeyValuePair<Tkey, TValue>>();
            bucket.forEach((value) => {
                if (!this.areEqual(value.key,key))
                    newBucket.push(new KeyValuePair(value.key, value.value));
                else
                    result = true;
            });
            this.buckets[hashCode] = newBucket;
            if (result)
                this.count = this.count - 1;
            return result;
        }

        containsKey(key: Tkey) {
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some((value) => this.areEqual(value.key, key));
        }

        clear() {
            this.buckets = new Array<Array<KeyValuePair<Tkey, TValue>>>();
            this.count = 0;
        }

        getCount() {
            return this.count;
        }

        toArray() {
            var result = new Array<KeyValuePair<Tkey, TValue>>()
            this.buckets.forEach(value => {
                value.forEach(inner => {
                    result.push(inner);
                });
            });
            return result;
        }

    };

    export class HashTable<Tkey extends IEqualityComparable, TValue> extends Table<Tkey, TValue>{
        getHashCode(item: Tkey) {
            return item.getHashCode();
        }
        areEqual(value1: Tkey, value2: Tkey) {
            return value1.equals(value2);
        }
        constructor() {
            super();
        }
    }

    export class ObjectTable<Tkey extends IEqualityComparable, TValue> extends Table<Tkey, TValue>{
        constructor(private comparer: IEqualityComparer<Tkey>) {
            super();
        }
        getHashCode(item: Tkey) {
            return this.comparer.getHashCode(item);
        }
        areEqual(value1: Tkey, value2: Tkey) {
            return this.comparer.equals(value1, value2);
        }
    }
}
