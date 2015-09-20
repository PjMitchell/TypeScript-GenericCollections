/// <reference path="../../src/collections.ts" />

module TestClasses {
    export class TestItem implements Collections.IEqualityComparable{
        public Id: number
        constructor(id: number) {
            this.Id = id;
        }
        equals(value1: any) {
            if (value1 instanceof TestItem)
                return value1.Id === this.Id
            else
                false;
        }
        getHashCode() {
            return this.Id;
        };
    }

}
