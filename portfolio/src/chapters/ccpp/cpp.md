# C++

In C++, a true `bool` type is available with only `true` and `false` values.

In C, `'x'` and `'\n'` are of type `int`. In C++, they are of type `char`.

Can decorate `1000000` as `1'000'000`.

| C header file | C++ header file |
| --- | --- |
| `assert.h` | `cassert` |
| `ctype.h` | `cctype` |
| `errno.h` | `cerrno` |
| `float.h` | `cfloat` |
| `limits.h` | `climits` |
| `math.h` | `cmath` |
| `stdarg.h` | `cstdarg` |
| `stddef.h` | `cstddef` |
| `stdint.h` | `cstdint` |
| `stdio.h` | `cstdio` |
| `stdlib.h` | `cstdlib` |
| `string.h` | `cstring` |
| `time.h` | `ctime` |

Use C function in C++, if function is a common library function or was compiled
by a c compiler.

```c
// in.c
#include <stdio.h>

void my_printer(char *s){
  printf("%s\n", s);
}
```
compile with 
```bash
gcc -c in.c
```
```cpp
// extern.cpp
#include <iostream>

extern "C" double sin(double);

extern "C"
{
  double cos(double);
  double tan(double);
  void my_printer(char*);
}

int main(){
  std::cout << sin(1.0) << std::endl;
  std::cout << cos(1.0) << std::endl;
  std::cout << tan(1.0) << std::endl;
  char a[] = {'c', ' ', 'c', 'o', 'd', 'e'};
  my_printer(a);
  return 0;
}
```

compile with
```bash
g++ -o extern extern.cpp in.o
```

In C++ a function can be oveloaded: same name, different signatures
and definitions.

If an overloaded function can handle `int` and `double` arguments, a compiler 
error occurs if it is invoked on a `long` value \\(\rightarrow\\) the compiler
can't know to which type it should cast the `long`. Do an explicit cast.

Formal paramaters having default values should only be present in the function 
declaration. They should not be followed by formal parameters having no default
values.

A namespace declaration can only contain declarations and no definitions, use 
extern for namespace variable to avoid defining it and breaking the One
Definition Rule.


Extracting namespace component for use inside of a single compilation unit.
```cpp
// ...
y = Math::power(x, 3)*Math::pi;
```
becomes 
```cpp
using Math::power;
using Math::pi;
// ...
y = power(x, 3)*pi;
```

Extracting all namespace components, USE ONLY IF A FEW NAMESPACES ARE USED.
```cpp
using namespace Math;
```

Explicitly use a function in the globale namespace (*ie: not declared in any 
namespace*)

```cpp
#include <cstdio>

int main(){
    ::printf("bruh\n");
    return 0;
}
```

Anonymous Namespaces can only contain definitions (any declarations cannot
be accessed bruh). These definitions can only be used in the current compilation
unit.
```cpp
namespace {
    int f(n) {return n*n;}
}
```
has the same effect as
```cpp
static int f(n) {return n*n;}
```

all references must be initialized

```cpp
double x, y;
double &r = x; // r is a reference to the variable x
r = y; // the variable x now contains the value of the variable y
```
Never return a reference to a local variable or to a parameter not
passed by reference (*ie passed by value*).
```cpp
// OK
double& maximum(double& a, double& b){
    return (a>=b)?a:b;
}
// STOOPID
double& maximum(double a, double b){
    return (a>=b)?a:b;
}
```

A lot to unpack, but the common idiom is to declare a function receiving const
references and returning a const reference, and an overloaded version which 
receives non const references and returns a non const reference.
```cpp
double& maxi(double& a, double& b){
    return (a>b) ? a : b;
}
const double& maxi(const double& a, const double& b){
    return (a>b) ? a : b;
}
```

a reference must always be initialized or declared extern (*initialized in an
other compilation unit*).
```cpp
double& r1; // NOOOOO
extern double& r2; // OK, make sure it's defined elsewhere
```

"References behave like constant pointers who are automatically dereferenced"

```cpp
auto i = ... ; // let the compiler deduce the appropriate type
decltype(expr) j = ... ; // declare the variable j as having the same type as expr
```

use `using` instead of `typedef` in C++
```cpp
using txtptr = const char * (*) (double);
using y = x; // y is the new (hopefully more intuitive) name for the type x
```

Use `nullptr` (of type `nullptr_t`) instead of `0` or `NULL`.

Favor the four kinds of modern C++ casts to standard C casts.
```cpp
static_cast<new_type>(expr); // use for numeric types
const_cast<new_type>(expr); // get something non constant or non volatile
reinterpret_cast<new_type>(expr); // use for pointer cast, often nonsensical
dynamic_cast<new_type>(expr); // stoopid oop nonsense
```

A function whose result is declared to be constexr can be evaluated at compile
time if its arguments are const, constexpr or litterals.

![](media/constexpr_func.png)

`consteval` - specifies that a function is an immediate function, that is,
every call to the function must produce a compile-time constant.

![](media/consteval.png)

Conditionally compile with `if constexpr(expr)` where `expr` is an expression
known at compile time.


```cpp
static_assert(expr, "message"); // expr must be evaluated at compile time
```

```cpp
double a[30];
for(double x : a)
    x = 0; // STOOPID, x is a copy of an element of a
for(double& x : a)
    x = 0; // OK, will modify, since x references an element of a
// if large elements, and no modification needed, favor a constant reference
for(const double& x : a) // or const auto&
    std::cout << x;
```

```cpp
double *p;
p = new double; // uninitialized
double *x = new double(5); // initialized to value 5
double *y = new double{6}; // initialized to value 6
double *z = new double(); // initialized to 0

double *p = new double[n]; // pointer to first element of
                           // array dynamically allocated
double *p = new double[3]{1.0, 3.0, 3.0}; // initialized version
delete p; // ok
double *q = reinterpret_cast<double*>(malloc(sizeof(int)));
delete q; // NOOOOO, STOOPID
```

Anything declared with `new[]` must be deleted with `delete[]`. 
U.B. .
If a type `T` aliases an array type, any allocated `new T` must be unallocated
with `delete[]`

```cpp
class TClass {
    private:
    // ... //
    protected:
    // ... //
    public:
    // ... //
}
// if absent, private
// can repeat sections
```

In C, `struct X` declares a type `struct X`, in C++ it declares a type `X`
(similar to `class X`).

Always place class declaration in `.h` header file with the same name as the 
class, place the implementation in a `.cpp` file with the same filename.

`this` is a constant pointer to the object, it is automatically added to member
methods by compilers.

For a setter, returning `*this` allows method chaining.

```cpp
class T{
  public:
    RT method(params) const; // this method won't modify the object 
};
```

If a method does not modify its calling object, declare it `const`.

A `const` method cannot call a non `const` method. It can however call a `static`
method.

Functions who are friends of a class can access all fields and methods of this 
class.

Inline functions must be declared and defined (below) in header files.
The compiler needs the definition.

A method defined in the class declaration is implicitly inline.

Inline functions can't be recursive.

The default constructor is invoked automatically if an object is not initialized.

If fields are initialized (using constants), the default constructor and all
other constructors will not have to initialize the fields. (... helpfull)

If a constructor with parameters exists, the compiler won't provide the default
parameterless constructor. To specifically request it, use:
```cpp
class S{
    public:
      S() = default; // request the default parameterless constructor
};
```

```cpp
class X{
    public:
      X(const X& x); // cloning constructor
};
```

```cpp
X x;
X y(x); // same as
X y = x; // this
X y{x}; // same as
```

Always provide a cloning constructor for classes that have dynamically allocated
fields (pointers, new nonsense ... etc). A cloner for class `T` has `T(const T&)`
for a signature.


```cpp
class Z{
  // assumed to have a parameterless AND a cloning constructor
  // assumed to be assignable: Z z1, z2; ...; z1 = z2;
};
class X{
  private:
    int k_;
    Z z_;
    X(int k, const Z& z); // constructor
};

// NO, STOOPID
X::X(int k, const Z& z){
  k_ = k;
  z_ = z; // here z_ is initialized first with the parameterless constructor
  // it is then reaffected using the cloning constructor
}

// CHAD
X::X(int k, const Z& z):k_(k), z_(z){ // call the cloning constructor first
}
```

```cpp
class C{
    public:
      ~C(); // Destructor
};
```

the `delete` operator calls the destructor before freeing the memory dynamically 
allocated with `new`.

> The expression `const_cast<T>(v)` can be used to change the `const` or `volatile`
qualifiers of pointers or references. (Among new-style casts, only `const_cast<>`
can remove const qualifiers.) `T` must be a pointer, reference, or
pointer-to-member type. 

If an object can have multiple equivalent physical representations, consider
using the `mutable` qualifier on fields that should be modifiable even if the 
object is declared `const`. 

`mutable` vs `const_cast<...>(this)` : EPIC FIGHT
- `const_cast`: make all fields modifiable, just now
- `mutable`: permits modification of the class member declared mutable even if
  the containing object is declared const.

Operators that cannot be overloaded: `::`, `.*`, `.`, `?:`, `sizeof`.

`=`, `[]`, `()`, `->`: always overload these operators with methods.

`T& operator=(const T&);` is the proper signature for the overloaded assignement
operator.

`ostream& operator<<(ostream&, const T&)` is the (only) proper signature for
the overloaded `<<` operator.

`istream& operator<<(ostream&, T&)` is the (only) proper signature for
the overloaded `>>` operator.

Call a method from within these two overloaded operators; this allows for
subclasses to define their own standards for stream operations \\(\rightarrow\\)
polymorphism.

`x[j]` is equivalent to `x.operator[](j)`

`explicit` specifies that a constructor is explicit, that is, it cannot be
used for implicit conversions and copy-initialization.

To convert an instance of class `T` into an instance of type `X`:
```cpp
T t;
X x;
x = t; // is equivalent to 
x = t.operator X(); // this
T.operator X() // -> convert the instance of type T into an equivalent instance of type X
```

```cpp
class A 
{
    public:
       int x;
    protected:
       int y;
    private:
       int z;
};

class B : public A
{
    // x is public
    // y is protected
    // z is not accessible from B
};

class C : protected A
{
    // x is protected
    // y is protected
    // z is not accessible from C
};

class D : private A    // 'private' is default for classes
{
    // x is private
    // y is private
    // z is not accessible from D
};
```

Constructors are never inherited.

Always call the parent constructor in the inherited constructor.

```cpp
class Y{
  private:
  T1 t1_;
  public:
  Y(T1 t1);
};

Y::Y(T1 t1){
  t1_ = t1;
}

class X : public Y{
  private:
  T2 t2_;
  public: 
    X(T1 t1, T2 t2);
};

X::X(T1 t1, T2 t2) : Y(t1){
  t2_ = t2;
}
```

```cpp
// multiple inheritance
class Child: public parent1, private parent2 {};
```

A pointer (or reference) to class `T` used to call method `m()`
uses the definition of `m` in the class `T`, even if the pointed instance is of 
a subclass of `T` which overrides `m`.
```cpp
#include <iostream>
using namespace std;

class X {
public:
  void do_smthg();
  virtual void do_smthg_else();
};

class Y : public X{
public:
  void do_smthg();
  void do_smthg_else() override;
};

void Y::do_smthg(){
  cout << "y do\n";
}

void Y::do_smthg_else(){
  cout << "y do\n";
}

void X::do_smthg(){
  cout << "x do\n";
}

void X::do_smthg_else(){
  cout << "x do\n";
}

int main(){
  X *a[3];
  a[0] = new Y();
  a[0]->do_smthg(); // x do: static dispatch
  a[0]->do_smthg_else(); // y do: dynamic dispatch
  return 0;
}
```

use `virtual` on base type, `virtual` or preferrably `override` on the child
type.

`static` methods (class methods) and constructors cannot be virtual.

A call to a virtual method in the constructor of a base class uses the definition
of the method in the base class. Avoid calling virtual methods in a constructor.

If polymorphism is used, USE A VIRTUAL DESTRUCTOR. Why ? Because.

