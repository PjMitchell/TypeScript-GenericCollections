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
            this.buckets = new Array<Array<T>>();
            this.count = 0;
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
    }
}
