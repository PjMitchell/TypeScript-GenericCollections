module Collections {
    export interface IEqualityComparer<T> {
        equals(value1: T, value2: T): boolean;
        getHashCode(value: T): number;
    }

    export interface IEqualityComparable {
        equals(value1: any): boolean;
        getHashCode(): number;
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

    export class HashSet<T extends IEqualityComparable>{
        private buckets: T[][];
        private count: number;
        constructor() {
            this.clear();
        }

        add(item: T) {
            var hashCode = item.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array<T>();
                newBucket.push(item);
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return true;
            }
            if (bucket.some((value) => value.equals(item)))
                return false;
            bucket.push(item);
            this.count = this.count + 1;
            return true;
        };

        remove(item: T) {
            var hashCode = item.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array<T>();
            bucket.forEach((value) => {
                if (!value.equals(item))
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
            var hashCode = item.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some((value) => value.equals(item));            
        };

        getCount() {
            return this.count;
        }

        clear() {
            this.buckets = new Array<Array<T>>();
            this.count = 0;
        }
    }

    export class KeyValuePair<Tkey, TValue> {
        constructor(public key: Tkey, public value: TValue) { }
    }

    export class Dictionary<Tkey extends IEqualityComparable, TValue> {
        private buckets: KeyValuePair<Tkey, TValue>[][];
        private count: number;

        constructor() {
            this.clear();
        }
        add(key: Tkey, value: TValue) {
            var hashCode = key.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array<KeyValuePair<Tkey, TValue>>();
                newBucket.push(new KeyValuePair(key, value));
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return;                
            }
            if (bucket.some((value) => value.key.equals(key)))
                throw new CollectionException("Key already exists")    
            bucket.push(new KeyValuePair(key, value));
            this.count = this.count + 1;
        }

        get(key: Tkey) {
            var hashCode = key.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                throw new KeyNotFoundException("Key not found");
            }
            var result = bucket.filter(value => value.key.equals(key)).pop();
            if (bucket === undefined)
                throw new KeyNotFoundException("Key not found");
            return result.value;  
        }

        remove(item: Tkey) {
            var hashCode = item.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array<KeyValuePair<Tkey, TValue>>();
            bucket.forEach((value) => {
                if (!value.key.equals(item))
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
            var hashCode = key.getHashCode();
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some((value) => value.key.equals(key)); 
        }
        clear() {
            this.buckets = new Array<Array<KeyValuePair<Tkey, TValue>>>();
            this.count = 0;
        }

        getCount() {
            return this.count;
        }

    }
}
