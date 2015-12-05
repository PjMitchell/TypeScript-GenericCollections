/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/collections.ts" />
/// <reference path="helpers/testitem.ts" />

describe("HashSet", () => {
    var hashSet: Collections.ISet<TestClasses.TestItem>;
    beforeEach(() => {
        hashSet = new Collections.HashSet<TestClasses.TestItem>()
    })

    describe("Contructor", () => {
    })
    describe("Add", () => {
        it("returns true if no items already added", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(hashSet.add(item1)).toEqual(true);
        });

        it("returns false if equal item already added", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            expect(hashSet.add(item2)).toEqual(false);
        });
    })
    describe("Contains", () => {
        it("contains works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            hashSet.add(item1);
            expect(hashSet.contains(item1)).toEqual(true);
            expect(hashSet.contains(item2)).toEqual(false);
        });
    })

    describe("GetCount", () => {
        it("is zero on Construction", () => {
            expect(hashSet.getCount()).toEqual(0);
        });
        it("is adjusted on ItemAdded", () => {
            hashSet.add(new TestClasses.TestItem(3));
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("Clear", () => {
        it("removes Items", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.clear();
            expect(hashSet.contains(item1)).toEqual(false);
        });
        it("sets count to zero", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.clear();
            expect(hashSet.getCount()).toEqual(0);
        });
    })

    describe("remove", () => {
        it("removes item from set", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.remove(item1);
            expect(hashSet.contains(item1)).toEqual(false);
        });
        it("return true if item removed from set", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            expect(hashSet.remove(item1)).toEqual(true);
        });
        it("return false if item not in set", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(hashSet.remove(item1)).toEqual(false);
        });

        it("remove reduces count", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.remove(item1)
            expect(hashSet.getCount()).toEqual(0);
        });
    })
})

describe("ObjectSet", () => {
    var hashSet: Collections.ISet<TestClasses.TestItem>;
    beforeEach(() => {
        hashSet = new Collections.ObjectSet<TestClasses.TestItem>({
            equals(value1: TestClasses.TestItem, value2: TestClasses.TestItem) {
                return value1.Id === value2.Id
            },
            getHashCode(item: TestClasses.TestItem) {
            return item.Id;
            }
        })
    })

    describe("Contructor", () => {
    })
    describe("Add", () => {
        it("returns true if no items already added", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(hashSet.add(item1)).toEqual(true);
        });

        it("returns false if equal item already added", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            expect(hashSet.add(item2)).toEqual(false);
        });
    })
    describe("Contains", () => {
        it("contains works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            hashSet.add(item1);
            expect(hashSet.contains(item1)).toEqual(true);
            expect(hashSet.contains(item2)).toEqual(false);
        });
    })

    describe("GetCount", () => {
        it("is zero on Construction", () => {
            expect(hashSet.getCount()).toEqual(0);
        });
        it("is adjusted on ItemAdded", () => {
            hashSet.add(new TestClasses.TestItem(3));
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("Clear", () => {
        it("removes Items", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.clear();
            expect(hashSet.contains(item1)).toEqual(false);
        });
        it("sets count to zero", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.clear();
            expect(hashSet.getCount()).toEqual(0);
        });
    })

    describe("remove", () => {
        it("removes item from set", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.remove(item1);
            expect(hashSet.contains(item1)).toEqual(false);
        });
        it("return true if item removed from set", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            expect(hashSet.remove(item1)).toEqual(true);
        });
        it("return false if item not in set", () => {
            var item1 = new TestClasses.TestItem(1);
            expect(hashSet.remove(item1)).toEqual(false);
        });

        it("remove reduces count", () => {
            var item1 = new TestClasses.TestItem(1);
            hashSet.add(item1);
            hashSet.remove(item1)
            expect(hashSet.getCount()).toEqual(0);
        });
    })
})