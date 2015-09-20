/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/collections.ts" />
/// <reference path="helpers/testitem.ts" />

describe("HashSet", () => {
    describe("Contructor", () => {
    })
    describe("Add", () => {
        it("returns true if no items already added", () => {
            var item1 = new TestClasses.TestItem(1);
            var hashSet = new Collections.HashSet<TestClasses.TestItem>();
            expect(hashSet.add(item1)).toEqual(true);
        })

        it("returns false if equal item already added", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(1);

            var hashSet = new Collections.HashSet<TestClasses.TestItem>();
            hashSet.add(item1);
            expect(hashSet.add(item2)).toEqual(false);
        })
    })
    describe("Contains", () => {
        it("contains works", () => {
            var item1 = new TestClasses.TestItem(1);
            var item2 = new TestClasses.TestItem(2);

            var hashSet = new Collections.HashSet<TestClasses.TestItem>();
            hashSet.add(item1);
            expect(hashSet.contains(item1)).toEqual(true);
            expect(hashSet.contains(item2)).toEqual(false);
        })
    })

    describe("GetCount", () => {
        it("is zero on Construction", () => {
            var hashSet = new Collections.HashSet<TestClasses.TestItem>();
            expect(hashSet.getCount()).toEqual(0);
        })
        it("is adjusted on ItemAdded", () => {
            var hashSet = new Collections.HashSet<TestClasses.TestItem>();
            hashSet.add(new TestClasses.TestItem(3));
            expect(hashSet.getCount()).toEqual(1);
        })
    })
})