/// <reference path="../typings/jasmine/jasmine.d.ts" />
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

    describe("Except with", () => {
        it("Removes all elements in the specified collection from the current set", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.exceptWith(other);
            expect(hashSet.contains(item3)).toEqual(false);
            expect(hashSet.contains(item4)).toEqual(true);
            expect(hashSet.contains(item5)).toEqual(true);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.exceptWith(other);
            expect(hashSet.getCount()).toEqual(2);
        });
    })

    describe("Intersect With", () => {
        it("Removes all elements in the specified collection from the current set", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.contains(item3)).toEqual(true);
            expect(hashSet.contains(item4)).toEqual(false);
            expect(hashSet.contains(item5)).toEqual(false);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("Union With", () => {
        it("Modifies the current set object to contain all elements that are present in itself, the specified collection, or both.", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item2, item3];
            hashSet.unionWith(other);
            expect(hashSet.contains(item2)).toEqual(true);
            expect(hashSet.contains(item3)).toEqual(true);
            expect(hashSet.contains(item4)).toEqual(true);
            expect(hashSet.contains(item5)).toEqual(true);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("isSubset", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.isSubsetOf(other1)).toEqual(false);
            expect(hashSet.isSubsetOf(other2)).toEqual(false);
            expect(hashSet.isSubsetOf(other3)).toEqual(false);
            expect(hashSet.isSubsetOf(other4)).toEqual(false);
            expect(hashSet.isSubsetOf(other5)).toEqual(true);
        });
        
    })

    describe("isSuperSet of", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.isSupersetOf(other1)).toEqual(false);
            expect(hashSet.isSupersetOf(other2)).toEqual(true);
            expect(hashSet.isSupersetOf(other3)).toEqual(false);
            expect(hashSet.isSupersetOf(other4)).toEqual(true);
            expect(hashSet.isSupersetOf(other5)).toEqual(false);
        });

    })
    describe("overlap", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.overlaps(other1)).toEqual(true);
            expect(hashSet.overlaps(other2)).toEqual(true);
            expect(hashSet.overlaps(other3)).toEqual(false);
            expect(hashSet.overlaps(other4)).toEqual(true);
            expect(hashSet.overlaps(other5)).toEqual(true);
        });
        
    })

    describe("Set equals", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            var other6 = [item3, item4, item5];
            expect(hashSet.setEquals(other1)).toEqual(false);
            expect(hashSet.setEquals(other2)).toEqual(false);
            expect(hashSet.setEquals(other3)).toEqual(false);
            expect(hashSet.setEquals(other4)).toEqual(false);
            expect(hashSet.setEquals(other5)).toEqual(false);
            expect(hashSet.setEquals(other6)).toEqual(true);

        });
    });
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

    describe("Except with", () => {
        it("Removes all elements in the specified collection from the current set", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.exceptWith(other);
            expect(hashSet.contains(item3)).toEqual(false);
            expect(hashSet.contains(item4)).toEqual(true);
            expect(hashSet.contains(item5)).toEqual(true);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.exceptWith(other);
            expect(hashSet.getCount()).toEqual(2);
        });
    })

    describe("Intersect With", () => {
        it("Removes all elements in the specified collection from the current set", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.contains(item3)).toEqual(true);
            expect(hashSet.contains(item4)).toEqual(false);
            expect(hashSet.contains(item5)).toEqual(false);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("Union With", () => {
        it("Modifies the current set object to contain all elements that are present in itself, the specified collection, or both.", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item2, item3];
            hashSet.unionWith(other);
            expect(hashSet.contains(item2)).toEqual(true);
            expect(hashSet.contains(item3)).toEqual(true);
            expect(hashSet.contains(item4)).toEqual(true);
            expect(hashSet.contains(item5)).toEqual(true);

        });
        it("adjusts count", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other = [item1, item2, item3];
            hashSet.intersectWith(other);
            expect(hashSet.getCount()).toEqual(1);
        });
    })

    describe("isSubset", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.isSubsetOf(other1)).toEqual(false);
            expect(hashSet.isSubsetOf(other2)).toEqual(false);
            expect(hashSet.isSubsetOf(other3)).toEqual(false);
            expect(hashSet.isSubsetOf(other4)).toEqual(false);
            expect(hashSet.isSubsetOf(other5)).toEqual(true);
        });

    })

    describe("isSuperSet of", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.isSupersetOf(other1)).toEqual(false);
            expect(hashSet.isSupersetOf(other2)).toEqual(true);
            expect(hashSet.isSupersetOf(other3)).toEqual(false);
            expect(hashSet.isSupersetOf(other4)).toEqual(true);
            expect(hashSet.isSupersetOf(other5)).toEqual(false);
        });

    })
    describe("overlap", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            expect(hashSet.overlaps(other1)).toEqual(true);
            expect(hashSet.overlaps(other2)).toEqual(true);
            expect(hashSet.overlaps(other3)).toEqual(false);
            expect(hashSet.overlaps(other4)).toEqual(true);
            expect(hashSet.overlaps(other5)).toEqual(true);
        });

    })

    describe("Set equals", () => {
        it("Works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);
            var item3 = new TestClasses.TestItem(3);
            var item4 = new TestClasses.TestItem(4);
            var item5 = new TestClasses.TestItem(5);
            hashSet.add(item3);
            hashSet.add(item4);
            hashSet.add(item5);
            var other1 = [item1, item2, item3];
            var other2 = [item3];
            var other3 = [item1, item2];
            var other4 = [item3, item5];
            var other5 = [item2, item3, item4, item5];
            var other6 = [item3, item4, item5];
            expect(hashSet.setEquals(other1)).toEqual(false);
            expect(hashSet.setEquals(other2)).toEqual(false);
            expect(hashSet.setEquals(other3)).toEqual(false);
            expect(hashSet.setEquals(other4)).toEqual(false);
            expect(hashSet.setEquals(other5)).toEqual(false);
            expect(hashSet.setEquals(other6)).toEqual(true);

        });
    });
})