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
