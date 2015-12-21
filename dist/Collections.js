var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Collections;
(function (Collections) {
    var CollectionException = (function () {
        function CollectionException(message) {
            this.message = message;
            this.name = "CollectionException";
        }
        CollectionException.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return CollectionException;
    })();
    Collections.CollectionException = CollectionException;
    var KeyNotFoundException = (function (_super) {
        __extends(KeyNotFoundException, _super);
        function KeyNotFoundException(message) {
            _super.call(this, message);
            name = "KeyNotFoundException";
        }
        return KeyNotFoundException;
    })(CollectionException);
    Collections.KeyNotFoundException = KeyNotFoundException;
    ;
    var KeyValuePair = (function () {
        function KeyValuePair(key, value) {
            this.key = key;
            this.value = value;
        }
        return KeyValuePair;
    })();
    Collections.KeyValuePair = KeyValuePair;
    var Set = (function () {
        function Set(source) {
            var _this = this;
            this.clear();
            if (source)
                source.forEach(function (value) {
                    _this.add(value);
                });
        }
        Set.prototype.add = function (item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array();
                newBucket.push(item);
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return true;
            }
            if (bucket.some(function (value) { return _this.areEqual(value, item); }))
                return false;
            bucket.push(item);
            this.count = this.count + 1;
            return true;
        };
        ;
        Set.prototype.remove = function (item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array();
            bucket.forEach(function (value) {
                if (!_this.areEqual(value, item))
                    newBucket.push(item);
                else
                    result = true;
            });
            this.buckets[hashCode] = newBucket;
            if (result)
                this.count = this.count - 1;
            return result;
        };
        Set.prototype.contains = function (item) {
            return this.bucketsContains(this.buckets, item);
        };
        ;
        Set.prototype.getCount = function () {
            return this.count;
        };
        Set.prototype.clear = function () {
            this.buckets = new Array();
            this.count = 0;
        };
        Set.prototype.toArray = function () {
            var result = new Array();
            this.buckets.forEach(function (value) {
                value.forEach(function (inner) {
                    result.push(inner);
                });
            });
            return result;
        };
        //Removes all elements in the specified collection from the current set
        Set.prototype.exceptWith = function (other) {
            var _this = this;
            if (other) {
                other.forEach(function (value) {
                    _this.remove(value);
                });
            }
        };
        //Modifies the current Set object to contain only elements that are present in that object and in the specified array
        Set.prototype.intersectWith = function (other) {
            var _this = this;
            if (other) {
                var otherBuckets = this.buildInternalBuckets(other);
                this.toArray().forEach(function (value) {
                    if (!_this.bucketsContains(otherBuckets.Buckets, value))
                        _this.remove(value);
                });
            }
            else {
                this.clear();
            }
        };
        Set.prototype.unionWith = function (other) {
            var _this = this;
            other.forEach(function (value) {
                _this.add(value);
            });
        };
        Set.prototype.isSubsetOf = function (other) {
            var _this = this;
            var otherBuckets = this.buildInternalBuckets(other);
            return this.toArray().every(function (value) { return _this.bucketsContains(otherBuckets.Buckets, value); });
        };
        Set.prototype.isSupersetOf = function (other) {
            var _this = this;
            return other.every(function (value) { return _this.contains(value); });
        };
        Set.prototype.overlaps = function (other) {
            var _this = this;
            return other.some(function (value) { return _this.contains(value); });
        };
        Set.prototype.setEquals = function (other) {
            var _this = this;
            var otherBuckets = this.buildInternalBuckets(other);
            if (otherBuckets.Count !== this.count)
                return false;
            return other.every(function (value) { return _this.contains(value); });
        };
        Set.prototype.buildInternalBuckets = function (source) {
            var _this = this;
            var internalBuckets = new Array();
            var internalCount = 0;
            source.forEach(function (item) {
                var hashCode = _this.getHashCode(item);
                var bucket = internalBuckets[hashCode];
                if (bucket === undefined) {
                    var newBucket = new Array();
                    newBucket.push(item);
                    internalBuckets[hashCode] = newBucket;
                    internalCount = internalCount + 1;
                }
                else if (!bucket.some(function (value) { return _this.areEqual(value, item); })) {
                    bucket.push(item);
                    internalCount = internalCount + 1;
                }
            });
            return { Buckets: internalBuckets, Count: internalCount };
        };
        Set.prototype.bucketsContains = function (internalBuckets, item) {
            var _this = this;
            var hashCode = this.getHashCode(item);
            var bucket = internalBuckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some(function (value) { return _this.areEqual(value, item); });
        };
        return Set;
    })();
    Collections.Set = Set;
    var HashSet = (function (_super) {
        __extends(HashSet, _super);
        function HashSet(source) {
            _super.call(this, source);
        }
        HashSet.prototype.getHashCode = function (item) {
            return item.getHashCode();
        };
        HashSet.prototype.areEqual = function (value1, value2) {
            return value1.equals(value2);
        };
        return HashSet;
    })(Set);
    Collections.HashSet = HashSet;
    var ObjectSet = (function (_super) {
        __extends(ObjectSet, _super);
        function ObjectSet(comparer, source) {
            _super.call(this, source);
            this.comparer = comparer;
        }
        ObjectSet.prototype.getHashCode = function (item) {
            return this.comparer.getHashCode(item);
        };
        ObjectSet.prototype.areEqual = function (value1, value2) {
            return this.comparer.equals(value1, value2);
        };
        return ObjectSet;
    })(Set);
    Collections.ObjectSet = ObjectSet;
    var Table = (function () {
        function Table() {
            this.clear();
        }
        Table.prototype.add = function (key, value) {
            var _this = this;
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                var newBucket = new Array();
                newBucket.push(new KeyValuePair(key, value));
                this.buckets[hashCode] = newBucket;
                this.count = this.count + 1;
                return;
            }
            if (bucket.some(function (value) { return _this.areEqual(value.key, key); }))
                throw new CollectionException("Key already exists");
            bucket.push(new KeyValuePair(key, value));
            this.count = this.count + 1;
        };
        Table.prototype.get = function (key) {
            var _this = this;
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                throw new KeyNotFoundException("Key not found");
            }
            var result = bucket.filter(function (value) { return _this.areEqual(value.key, key); }).pop();
            if (bucket === undefined)
                throw new KeyNotFoundException("Key not found");
            return result.value;
        };
        Table.prototype.remove = function (key) {
            var _this = this;
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            var result = false;
            var newBucket = new Array();
            bucket.forEach(function (value) {
                if (!_this.areEqual(value.key, key))
                    newBucket.push(new KeyValuePair(value.key, value.value));
                else
                    result = true;
            });
            this.buckets[hashCode] = newBucket;
            if (result)
                this.count = this.count - 1;
            return result;
        };
        Table.prototype.containsKey = function (key) {
            var _this = this;
            var hashCode = this.getHashCode(key);
            var bucket = this.buckets[hashCode];
            if (bucket === undefined) {
                return false;
            }
            return bucket.some(function (value) { return _this.areEqual(value.key, key); });
        };
        Table.prototype.clear = function () {
            this.buckets = new Array();
            this.count = 0;
        };
        Table.prototype.getCount = function () {
            return this.count;
        };
        Table.prototype.toArray = function () {
            var result = new Array();
            this.buckets.forEach(function (value) {
                value.forEach(function (inner) {
                    result.push(inner);
                });
            });
            return result;
        };
        return Table;
    })();
    Collections.Table = Table;
    ;
    var HashTable = (function (_super) {
        __extends(HashTable, _super);
        function HashTable() {
            _super.call(this);
        }
        HashTable.prototype.getHashCode = function (item) {
            return item.getHashCode();
        };
        HashTable.prototype.areEqual = function (value1, value2) {
            return value1.equals(value2);
        };
        return HashTable;
    })(Table);
    Collections.HashTable = HashTable;
    var ObjectTable = (function (_super) {
        __extends(ObjectTable, _super);
        function ObjectTable(comparer) {
            _super.call(this);
            this.comparer = comparer;
        }
        ObjectTable.prototype.getHashCode = function (item) {
            return this.comparer.getHashCode(item);
        };
        ObjectTable.prototype.areEqual = function (value1, value2) {
            return this.comparer.equals(value1, value2);
        };
        return ObjectTable;
    })(Table);
    Collections.ObjectTable = ObjectTable;
})(Collections || (Collections = {}));
