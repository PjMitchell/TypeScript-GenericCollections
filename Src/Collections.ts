module Collections {
    export interface IEqualityComparer<T> {
        equals(value1: T, value2: T): boolean;
        getHashCode(value: T): number;
    }

    export interface IEqualityComparable {
        equals(value1: any): boolean;
        getHashCode(): number;
    }

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
}
