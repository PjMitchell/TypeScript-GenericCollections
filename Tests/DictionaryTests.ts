/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/collections.ts" />
/// <reference path="helpers/testitem.ts" />

describe("HashTable", () => {
    var dic: Collections.IDictionary<TestClasses.TestItem, number>

    beforeEach(() => {
        dic = new Collections.HashTable<TestClasses.TestItem, number>();
    })

    describe("Contructor", () => {
    })
    describe("Add and Get", () => {
        it("can add and get item", () => {
            var key = new TestClasses.TestItem(1);
            var value = 2;
            
            dic.add(key, value);
            var result = dic.get(key)
            expect(result).toEqual(value);
        });

        it("Adding more than one item with same key throws", () => {
            var key = new TestClasses.TestItem(1);
            var value = 2;
            dic.add(key, value);
            expect(() => dic.add(key, value)).toThrow();
        });

        it("Get item not in dictionary throws", () => {
            var key = new TestClasses.TestItem(1);
            expect(() => dic.get(key)).toThrow();
        });
    })
    describe("Contains", () => {
        it("contains works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            dic.add(item1, 3);
            expect(dic.containsKey(item1)).toEqual(true);
            expect(dic.containsKey(item2)).toEqual(false);
        });
    })

    describe("GetCount", () => {
        it("is zero on Construction", () => {
            expect(dic.getCount()).toEqual(0);
        });
        it("is adjusted on ItemAdded", () => {
            dic.add(new TestClasses.TestItem(3), 5);
            expect(dic.getCount()).toEqual(1);
        });
    })

    describe("Clear", () => {
        it("removes Items", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1,2);
            dic.clear();
            expect(dic.containsKey(item1)).toEqual(false);
        });
        it("sets count to zero", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1,2);
            dic.clear();
            expect(dic.getCount()).toEqual(0);
        });
    })

    describe("remove", () => {
        it("removes item from set", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 5);
            dic.remove(item1);
            expect(dic.containsKey(item1)).toEqual(false);
        });
        it("return true if item removed from set", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1,5);
            expect(dic.remove(item1)).toEqual(true);
        });
        it("return false if item not in set", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(dic.remove(item1)).toEqual(false);
        });

        it("remove reduces count", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1,8);
            dic.remove(item1)
            expect(dic.getCount()).toEqual(0);
        });
    })
})

describe("ObjectTable", () => {
    var dic: Collections.IDictionary<TestClasses.TestItem, number>

    beforeEach(() => {
        dic = new Collections.ObjectTable<TestClasses.TestItem, number>(
            {
                equals(value1: TestClasses.TestItem, value2: TestClasses.TestItem) {
                    return value1.Id === value2.Id
                },
                getHashCode(item: TestClasses.TestItem) {
                    return item.Id;
                }
            }
        );
    })

    describe("Contructor", () => {
    })
    describe("Add and Get", () => {
        it("can add and get item", () => {
            var key = new TestClasses.TestItem(1);
            var value = 2;

            dic.add(key, value);
            var result = dic.get(key)
            expect(result).toEqual(value);
        });

        it("Adding more than one item with same key throws", () => {
            var key = new TestClasses.TestItem(1);
            var value = 2;
            dic.add(key, value);
            expect(() => dic.add(key, value)).toThrow();
        });

        it("Get item not in dictionary throws", () => {
            var key = new TestClasses.TestItem(1);
            expect(() => dic.get(key)).toThrow();
        });
    })
    describe("Contains", () => {
        it("contains works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            dic.add(item1, 3);
            expect(dic.containsKey(item1)).toEqual(true);
            expect(dic.containsKey(item2)).toEqual(false);
        });
    })

    describe("GetCount", () => {
        it("is zero on Construction", () => {
            expect(dic.getCount()).toEqual(0);
        });
        it("is adjusted on ItemAdded", () => {
            dic.add(new TestClasses.TestItem(3), 5);
            expect(dic.getCount()).toEqual(1);
        });
    })

    describe("Clear", () => {
        it("removes Items", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 2);
            dic.clear();
            expect(dic.containsKey(item1)).toEqual(false);
        });
        it("sets count to zero", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 2);
            dic.clear();
            expect(dic.getCount()).toEqual(0);
        });
    })

    describe("remove", () => {
        it("removes item from set", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 5);
            dic.remove(item1);
            expect(dic.containsKey(item1)).toEqual(false);
        });
        it("return true if item removed from set", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 5);
            expect(dic.remove(item1)).toEqual(true);
        });
        it("return false if item not in set", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(dic.remove(item1)).toEqual(false);
        });

        it("remove reduces count", () => {
            var item1 = new TestClasses.TestItem(1);
            dic.add(item1, 8);
            dic.remove(item1)
            expect(dic.getCount()).toEqual(0);
        });
    })
})