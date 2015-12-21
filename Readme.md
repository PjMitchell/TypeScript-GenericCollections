## TypeScript Generic Collection
An attempt to implement the dot net genric collection in type script.

## IEqualityComparer&lt;T&gt;
Provides interface to determined object's hash code and wether two items are equal

Determines if two objects are equal

* equals(value1: T, value2: T): boolean;
   
Generates hash code for object

* getHashCode(value: T): number;

## IEqualityComparable
Object declares its own equality method and Hashcode generation

Determines if another object is equal to this instance

* equals(other: any): boolean;
   
Generates hash code for object

* getHashCode(value: T): number;

##HashSet and ObjectSet
Implements a Set. 
HashSet is restricted to objects that implement IEqualityComparable
ObjectSet requires an IEqualityComparer declared in the constructor

##HashTable and ObjectTable
Implements a Dictionary. 
HashTable is restricted to objects that implement IEqualityComparable
ObjectTable requires an IEqualityComparer declared in the constructor
