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

<img src="media/constexpr_func.png" width=600/>

`consteval` - specifies that a function is an immediate function, that is,
every call to the function must produce a compile-time constant.

<img src="media/consteval.png" width=600/>

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

If you have a virtual function that is not abstract, then you must implement it.

To declare a method abstract:
```cpp
virtual qualifiers returntype method(params) qualifiers = 0;
// also called pure virtual method
```

A class having at least one abstract method is considered abstract,
it can't be instanciated (incomplete class).

An interface is a class that only contains pure virtual methods.

> A destructor can be declared virtual (10.3) or pure virtual (10.4); if any
> objects of that class or any derived class are created in the program,
> the destructor shall be defined. If a class has a base class with a virtual
> destructor, its destructor (whether user- or implicitly-declared) is virtual.

The destructor of a base class is always called from the destructor of the
derived class, even if it is declared virtual pure. It must always be
implemented.

An abstract subclass of an abstract class can implement part of a virtual pure
method, and still declare it virtual pure; its subclasses can then call its 
implementation in their (hopefully) final implementation. Still, DECLARE IT
VIRTUAL PURE.

If a method is supposed to override a virtual method in a base class, use the 
`override` keyword, this way if the method signatures don't match (forgot
`const` for example), there will be a compile time error.

To overload a method in a base class, reinject it into the scope
`using Base::method;`.
See unqualified name lookup in 
[StackOverflow](https://stackoverflow.com/questions/35870081/c-base-class-function-overloading-in-a-subclass)
and [cppreference](https://en.cppreference.com/w/cpp/language/unqualified_lookup).

Templates
```cpp
template <int k, typename R, typename T>
T f(R){
  for(int n=0; n<k; k++) 
   // ...
}
```
either a type `T` or `int` param or `bool` param. can also be used for a class.

template default values
```cpp
template <int d, typename NT> // ok
class X{
  // ...
};
template <int d, typename NT=double> // ok
class X{
  // ...
};
template <int d=3, typename NT=double> // ok
class X{
  // ...
};
X<> ; // ok
X<2> ; // ok
X<2,double> ; // ok
X<,double> ; // no

template <int d=3, typename NT> // NOOOO
class X{
  // ...
};
```

Stack allocated objects created within a try bloc before an exception is thrown 
are automatically deleted. (NOT tru for dynamically allocated objects with new).

```cpp
try{
  int k;
  std::cin >> k;
  if(k<0)
    throw k;
  else if(k==0)
    throw std::exception;
}catch(int i){
  // if exception is of type int, execute this and jump after all catch blocks
}catch(std::exception e){
}
```

Standard Exceptions are in the header `<stdexcept>`,
they all inherit from `std::exception`.

Favor using exception classes instead of string and numeric constants in catch
block parameters. (create classes that inherit from the std::exception class).



- An exception forces calling code to recognize an error condition and handle it. Unhandled exceptions stop program execution.
- An exception jumps to the point in the call stack that can handle the error. Intermediate functions can let the exception propagate. They don't have to coordinate with other layers.
- The exception stack-unwinding mechanism destroys all objects in scope after an exception is thrown, according to well-defined rules.
- An exception enables a clean separation between the code that detects the error and the code that handles the error.

```cpp
try{
  executeProgram();
}catch(...){ // universal exception handler, catch all exceptions, unknown
  prepareProgramStop();
}
```

```cpp
// some dynamic memory is allocated
// some exception is thrown
catch(...){
// deallocate memory
  throw; // rethrow the exception
}
```

```cpp
class X{
  public:
  X(const X&) = delete; // don't allow copy constructor
};
```

See [StackOverflow](https://stackoverflow.com/questions/5513881/meaning-of-delete-after-function-declaration)
for more details on `method = delete`.

See Resource Acquisition is initialization (RAII) on
[wikipedia](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization).

```cpp
// careful, slicing: will only get base type and message
catch(std::exception e) 
catch(const std::exception e) 
// ok, virtual message, no slicing 
catch(const std::exception& e) // favor using const reference -> no slicing
```

The `catch` exception handlers are examined in order when an exception is 
thrown in the `try` block; as soon as one has a matching parameter type (even
if superclass), its block is executed. The other `catch` blocks are all skipped
, even when the parameters match. ORDEEEER!

Throwing an exception should never cause a memory leak, use RAII.

IOS INBREEDING

<img src="media/family1.png" width=300 height=200/>
<img src="media/family2.png" width=300 height=200/>
<img src="media/family3.png" width=300 height=200/>
<img src="media/family4.png" width=300 height=200/>
<img src="media/iostream_fam.png" width=600 />

`std::cout`, `std::cerr` and `std::clog` are all instances of `std::ostream`,
*ie:* `std::basic_ostream<char>`.

`std::cin` is an instance of `std::istream`,
*ie:* `std::basic_istream<char>`.

A stream can have four (non exclusive) states: `fail`, `good`, `bad` and `eof`.
- fail: error, but no data loss, cant read or write from now on
- bad: error, with data loss, cant read or write from now on
- eof: end of stream encountered, not an error,
  but cant read or write from now on
- good: good ... (duh)

a stream is automatically cast to a bool using `!fail()`. It is considered
`true` if the last IO operation succeded.

```cpp
while(std::cin){ // while the last input was successful <==> !(std::cin.fail())
  // continue processing
}
```

Force stream state
```cpp
std::cin.clear(std::ios_base::failbit);
std::cin.clear(std::ios_base::badbit);
std::cin.clear(std::ios_base::eofbit);
std::cin.clear(); // defaults to std::ios_base::goodbit
```

A stream's openmode is of type `std::ios_base::openmode`. It is a bitmask type
*ie:* can be combined with `|`; 
ex: `(ios_base::in | ios_base::out | ios_base::binary )`

See [CppReference](https://en.cppreference.com/w/cpp/io/ios_base/openmode) for
more information.

Input Stream Methods

- `std::ios_base::app` comes from 'append' - all output will be added (appended) to the end of
  the file. In other words you cannot write anywhere else in the file but at
  the end.

- `std::ios_base::ate` comes from 'at end' - it sets the stream position at the end of the
  file when you open it, but you are free to move it around (seek) and write
  wherever it pleases you.

More details on [openmodes](https://stdcxx.apache.org/doc/stdlibug/30-3.html).

- `is::get(char &)` -> get a char from a stream. returns the stream. Does not ignore 
non printable chars.
- `is::unget()` -> last char read is put back in the buffer, as if it was never read
also returns the stream.
- `is::putback(char_type)` -> char parameter is put in the buffer, also returns
  the stream.
- `is::peek()` -> returns the next character in the stream, does not read it.
- `getline(input_stream, string_storage, delimiter)` ->  reads until delimiter
  or EOF and writes into string until length is reached.
  see [CppReference](https://en.cppreference.com/w/cpp/string/basic_string/getline).
- `is::read(char* storage, count)` -> reads and stores into storage until count
  or EOF is reached.
  See [CppReference](https://en.cppreference.com/w/cpp/io/basic_istream/read).
- `basic_istream& ignore(std::streamsize count=1, int_type delim=Traits::eof());`
  bruh look it [up](https://en.cppreference.com/w/cpp/io/basic_istream/ignore).

Some input streams (non interactive ones, unline std::cin) support positioning
with the [tellg()](https://en.cppreference.com/w/cpp/io/basic_istream/tellg)
[seekg(pos | offset, seekdir)](https://en.cppreference.com/w/cpp/io/basic_istream/seekg)
functions.

`seekdir` can be `ios_base::beg`, `ios_base::end` or `ios_base::cur`.

Positioning often requires a stream to be open in `std::io_base::binary`.

`std::ifstream` follows RAII idiom, its constructor takes a file name as a string
and an optional (default = `std::ios_base::in`) `std::ios_base::openmode`; 
see more on [CppReference](https://en.cppreference.com/w/cpp/io/basic_ifstream/basic_ifstream).

The `rdbuf()` method returns a pointer to the stream_buffer associated with the
basic_ios.
[CppReference](https://en.cppreference.com/w/cpp/io/basic_ios/rdbuf).
```cpp
#include <fstream>
#include <iostream>
int main(){
  std::ifstream dat("test.dat", std::ios_base::in | std::ios_base::binary);
  std::cout << "ifstream rdbuffer is open? " << dat.rdbuf()->is_open() << std::endl;
  dat.rdbuf()->close();
  std::cout << "ifstream rdbuffer is open? " << dat.rdbuf()->is_open() << std::endl;
  return 0;
}
```

The `void open( const char* filename,std::ios_base::openmode mode=std::ios_base::in)`
method opens and associates the file with name `filename` with the file stream. 
See [CppReference](https://en.cppreference.com/w/cpp/io/basic_ifstream/open) for more
details.

The `void close()` method of `ifstream` closes the associated file.
This function is called by the destructor of basic_fstream when the stream
object goes out of scope and is not usually invoked directly.
[CppReference](https://en.cppreference.com/w/cpp/io/basic_fstream/close).

The method `bool is_open()` checks if the file stream has an associated file.
[CppReference](https://en.cppreference.com/w/cpp/io/basic_fstream/is_open).
Used to ckeck if a file opened for reading exists.



[`stackoverflow`](https://stackoverflow.com/questions/4872361/why-are-there-two-different-getline-functions-if-indeed-there-are)
> The global getline() function works with C++ std::string objects.
  The istream::getline() methods work with "classic" C strings (pointers to char).


Use [`istringstream`](https://en.cppreference.com/w/cpp/io/basic_istringstream)
to convert a string into an objet whose class supports the `>>` operator.

[`istringstream::str()`](https://en.cppreference.com/w/cpp/io/basic_istringstream/str)
returns a copy of the underlying string.

```cpp
#include <iostream>
#include <sstream>
int main(){
  std::string s1 = "1 2";
  std::istringstream is(s1);

  // obtain string in the input string stream
  std::cout << is.str() << std::endl; // prints: 1 2

  // change string in the input string stream
  std::string s2 = "3 4";
  is.str(s2);

  int a, b;
  is >> a >> b; // read input string stream
  std::cout << "a=" << a << " b=" << b << std::endl; // prints: a=3 b=4
  return 0;
}
```

[`istringstream`](https://en.cppreference.com/w/cpp/io/basic_istringstream) supports
positioning with [`seekg(...)`](https://en.cppreference.com/w/cpp/io/basic_istream/seekg)
and [`tellg()`](https://en.cppreference.com/w/cpp/io/basic_istream/tellg).


Similarly to `istream`,
[`ostream`](https://en.cppreference.com/w/cpp/io/basic_ofstream)
can handle 3 kinds of operations:
- formatted (output) with `<<`
- unformatted (output) with
  [`put`](https://en.cppreference.com/w/cpp/io/basic_ostream/put) and
  [`write(char*, count)`](https://en.cppreference.com/w/cpp/io/basic_ostream/write)
- positioning with 
  [`tellp()`](https://en.cppreference.com/w/cpp/io/basic_ostream/tellp) and
  [`write(pos | offset, seekdir)`](https://en.cppreference.com/w/cpp/io/basic_ostream/seekp)

[`ofstream`](https://en.cppreference.com/w/cpp/io/basic_ofstream) 
has a destructor that automagically closes the associated file \\(\rightarrow\\)
RAII. A useful constructor is
[`ofstream(filename, openmode)`](https://en.cppreference.com/w/cpp/io/basic_ofstream/basic_ofstream).

[`ofstream`](https://en.cppreference.com/w/cpp/io/basic_ofstream) 
also has the usual
[`rdbuf`](https://en.cppreference.com/w/cpp/io/basic_ofstream/rdbuf),
[`open`](https://en.cppreference.com/w/cpp/io/basic_ofstream/open),
[`close`](https://en.cppreference.com/w/cpp/io/basic_ofstream/close) and
[`is_open`](https://en.cppreference.com/w/cpp/io/basic_ofstream/is_open)
methods.


Use [`ostringstream`](https://en.cppreference.com/w/cpp/io/basic_ostringstream)
to convert an objet whose class supports the `<<` operator into a string.
Its constructor takes a char sequence and an `openmode`
(default is `ios_base::out`). Its 
[`str`](https://en.cppreference.com/w/cpp/io/basic_ostringstream/str) method
manages the contents of the underlying string object, that object can be changed
through it.

The [`str`](https://en.cppreference.com/w/cpp/io/basic_ostringstream/str) method
comes is overloaded:
- one version (<=3) returns a copy of the string associated with the ostringstream.
- another version (>=4) can copy a string into the internal
  [`stringbuf`](https://en.cppreference.com/w/cpp/io/basic_stringbuf).

```cpp
#include <iostream>
#include <cmath>
#include <sstream>
template <typename T>
std::string toString(const T& x){
  std::ostringstream os(std::ios_base::app); // append to file
  std::string buf = "*"; // arbitrary prefix to show the effect of append mode
  os.str(buf);
  os << x;
  return os.str();
}
int main(){
  std::string pi_str = toString(std::acos(-1.0));
  std::cout << "PI=" << pi_str << std::endl; // PI=*3.14159
  return 0;
}
```

Some important io manipulators in `<ios>`
```cpp
#include <iomanip>
#include <ios>
#include <iostream>
#include <sstream>

int main() {
  bool v = true;

  // boolalpha , noboolalpha
  std::cout << std::boolalpha << v << " " << std::noboolalpha << v << std::endl;
  v = false; // print: true 1
  std::cout << std::boolalpha << v << " " << std::noboolalpha << v
            << std::endl; // print: false 0

  // showbase, noshowbase, dec, hex, oct
  std::cout << std::showbase;
  std::cout << std::dec << 15 << " " << std::hex << 15 << std::oct << " " << 15
            << std::endl; // prints: 15 0xf 017
  std::cout << std::noshowbase;
  std::cout << std::dec << 15 << " " << std::hex << 15 << std::oct << " " << 15
            << std::endl; // prints: 15 f 17

  // showpoint, noshowpoint
  double d = 33.0, q = 33.1;
  std::cout << std::showpoint << d << " " << std::noshowpoint << d << " " << q
            << std::endl; // prints: 33.0000 33 33.1

  // showpos, noshowpos
  double pi = 3.14159;
  std::cout << std::showpos << pi << " " << 0.0 << " " << std::noshowpos << pi
            << std::endl; // prints: +3.14159 +0 3.14159

  // skipws, noskipws
  char c1, c2, c3;
  std::cout << "type>";
  std::cin >> std::skipws >> c1 >> std::noskipws >> c2 >>
      c3; // type: <space> A <space> B
  std::cout << std::hex << std::showbase << static_cast<int>(c1) << " "
            << static_cast<int>(c2) << " " << static_cast<int>(c3)
            << std::endl; // prints: 0x41 0x20 0x42

  // scientific, fixed, defaultfloat, hexfloat
  double x = 0.00002;
  std::cout << std::fixed << x << std::endl;        // prints: 0.000020
  std::cout << std::scientific << x << std::endl;   // prints: 2.000000e-05
  std::cout << std::defaultfloat << x << std::endl; // prints: 2e-05
  std::cout << std::hexfloat << x << std::endl; // prints: 0x1.4f8b588e368f1p-16

  // uppercase, nouppercase
  double y = 300.1234;
  int k = -559038737;
  std::cout << std::scientific << std::hex;
  std::cout << std::uppercase << y << " " << k
            << std::endl; // prints: 3.001234E+02 0XDEADBEEF
  std::cout << std::nouppercase << y << " " << k
            << std::endl; // prints: 3.001234e+02 0xdeadbeef

  // std::setfill, std::left, std::right and std::internal
  std::cout << std::hex << std::showbase;
  std::cout << std::setfill('#') << std::setw(12);
  std::cout << std::left << 24 << std::endl; // prints: 0x18########
  std::cout << std::setfill('#') << std::setw(12);
  std::cout << std::right << 24 << std::endl; // prints: ########0x18
  std::cout << std::setfill('#') << std::setw(12);
  std::cout << std::internal << 24 << std::endl; // prints: 0x########18

  // std::ws
  char c4, c5;
  std::cout << "type>";
  std::cin >> std::skipws >> c4 >> std::noskipws >> std::ws >>
      c5; // type: <space> A <space> B
  std::cout << std::hex << std::showbase << static_cast<int>(c4) << " "
            << static_cast<int>(c5) << std::endl; // prints: 0x41 0x42

  // std::ends
  std::ostringstream os;
  os << "AAA" << std::ends << "BBB" << std::ends << "CCC" << std::ends
     << std::flush; // make c style strings
  std::string s = os.str();
  for (auto c : s)
    std::cout << std::hex << std::showbase << static_cast<int>(c) << " ";
  // prints: 0x41 0x41 0x41 0 0x42 0x42 0x42 0 0x43 0x43 0x43 0
  std::cout << std::endl;

  return 0;
}
```

[`unitbuf/nounitbuf`](https://en.cppreference.com/w/cpp/io/manip/unitbuf) 
enables or disables automatic flushing of the output stream after any 
output operation. 

The oracle at [stackoverflow](https://stackoverflow.com/a/6027938) informs us
that [`cerr/wcerr`](https://en.cppreference.com/w/cpp/io/cerr) default to
`unitbuf`. You do want to see the errors if a crash happens.

What's the difference between `ws` and `skipws` ? 
[\[🔮\]](https://stackoverflow.com/a/68341644)

- [`skipws`](https://en.cppreference.com/w/cpp/io/manip/skipws) enables or
disables skipping of leading whitespace by the formatted input functions.

- [`ws`](https://en.cppreference.com/w/cpp/io/manip/ws) discards leading
whitespace from an input stream \\(\rightarrow\\)
[`unformatted input function`](https://en.cppreference.com/w/cpp/named_req/UnformattedInputFunction)

`<ostream>` declares 3 manipulators:
- [`flush`](https://en.cppreference.com/w/cpp/io/manip/flush) flushes the 
  stream *ie:* writes all unwritten data on the stream buffer to the peripheral
  (file, string, whatever else), `unitbuf` performs a flush after each operation.
- [`endl`](https://en.cppreference.com/w/cpp/io/manip/endl)
  inserts a newline character into the output stream and flushes it.
- [ends](https://en.cppreference.com/w/cpp/io/manip/ends)
  inserts a null character into the output stream, does not flush.

[`setw(n)`](https://en.cppreference.com/w/cpp/io/manip/setw)
(declared in `<iomanip>`) specifies that the next operation should use a width `n`. 
If write: shorter than `n` will be padded with the filler char set by
- [`setfill`](https://en.cppreference.com/w/cpp/io/manip/setfill), longer won't be
troncated.
- If read: shorter than `n` is read entirely, longer is troncated (unless numeric).


[`setbase`](https://en.cppreference.com/w/cpp/io/manip/setbase)
sets the numeric base of the stream.

[`setfill`](https://en.cppreference.com/w/cpp/io/manip/setfill) is self
explanatory ... bruh.

[`setprecision`](https://en.cppreference.com/w/cpp/io/manip/setprecision) 
set the precision used to write or read floating point types, see the page
reference examples.

Formatted io for basic types is symmetic: a value written with `<<` can 
be read with `>>` (without loss of information). The only exception is the string
class: the `<<` operator writes the whole string, but the `>>` operator only
reads a word into the string.

The [`quoted`](https://en.cppreference.com/w/cpp/io/manip/quoted)
allows insertion and extraction of quoted strings,
such as the ones found in csv, json or xml.

```cpp
#include <iomanip>
#include <iostream>

int main(){
  std::string s, q = "c++ is fabulous";

  std::stringstream flow;
  flow << q;
  flow >> s;
  std::cout << s << std::endl; // prints: c++

  std::stringstream qflow; // implicit "
  qflow << std::quoted(q);
  qflow >> std::quoted(s);
  std::cout << s << std::endl; // prints: c++ is fabulous

  std::stringstream bflow;
  bflow << std::quoted(q, '|');
  bflow >> std::quoted(s, '|');
  std::cout << s << std::endl; // prints: c++ is fabulous

  std::stringstream xflow;
  xflow << std::quoted(q, '<', '>');
  xflow >> std::quoted(s, '<', '>');
  std::cout << s << std::endl; // prints: c++ is fabulous

  return 0;
}
```

To create a paramterless output manipulator use the 18-20 overload 
of the [`<<`](https://en.cppreference.com/w/cpp/io/basic_ostream/operator_ltlt)
operator of the `basic_ostream` class. 

```cpp
// prototype
std::basic_ostream& operator<<(
    std::basic_ostream<CharT, Traits>& (*func)
        (std::basic_ostream<CharT, Traits>&) );
// so if a function manip is declared as
std::ostream& manip(std::ostream&);
// the expression 
flow << manip; // is equivalent to
manip(flow);
```
Example:
```cpp
#include <iostream>
#include <ostream>

template<typename C, typename T>
std::basic_ostream<C,T>& compilation_date(std::basic_ostream<C,T>& os){
  return os << __DATE__ << " " << __TIME__ << std::flush;
}

int main(){
  std::cout << "Version : " << compilation_date;
  std::endl(std::cout); // equivalent to
  std::cout << std::endl;
  return 0;
}
```

Left and right shift nonsense
```cpp
std::cout << (4<<2) << std::endl; // equivalent to 4 * 2^2
std::cout << (8>>2) << std::endl; // equivalent to 8 / 2^2
```

Lambda expressions in C++: C++11 onwards
- the return type is automatically is automagically deduced by the compiler.
```cpp
auto f = [](const char *s=" default\n"){std::cout << 42 << s << std::endl;};
f(); // prints: 42 default
f(" not default"); // prints: 42 not default
[](int n){std::cout << n << std::endl;}(32); // prints: 32
```

Use `decltype(name)` to get the type of a lambda function named `name` (often
declared auto). Two lambda expressions, even if having the exact same definitions
don't have the same type. In a generic context, we need to name a lambda expression
to use its type as a template parameter.

Starting from C++17, the compiler can infer the template parameters of an instance
from the types of the constructor real parameters. So can do dis:
```cpp
auto lam = [](int n){return 2*n};
Feval<int, decltype(lam)> f(2, lam);
Feval f(2, lam); // works and is equivalent to 
Feval f(2, [](int n){return 2*n;}); // dis
```

Starting from C++14, lambda parameters can be auto: works as if there was
a generic type for each `auto` parameter.

```cpp
auto maxi = [](auto a, auto b){
  if(a>b) return a; else return b;
};

std::cout << maxi(1, 3) << std::endl; // prints: 3
std::cout << maxi(1, 0) << std::endl; // prints: 1
std::cout << maxi('a', 'c') << std::endl; // prints: c
std::cout << maxi(1, 3.14) << std::endl; // does not compile
// maxi would have to return either a or b of type int or double -- incompatible
// " Inconsistent types 'double' and 'int'
```

to force a lambda to return a type:
```cpp
auto maxi = [](auto a, auto b) -> decltype(a) {
  if(a>b) return a; else return b;
};
std::cout << maxi(1, 3.14) << std::endl; // now compiles and prints: 3
```

Other example
```cpp
auto div3 = [](int n=3) -> bool {
  return n%3==0;
};
std::cout << div3() << std::endl; // prints: 1
std::cout << div3(43) << std::endl; // prints: 0
```

A lambda can access all global and `static` local variables in the scope in
which it is defined. To capture a (nonstatic!) variable in the local context, 
use the `[]` operator to specify what local entities to capture:
```cpp
#include <iostream>

int main() {
  int x = 1, y = 2, w = 3;
  auto impure = [=]() {
    std::cout << x << std::endl;
  }; // total capture, can use x, y, w and any variable defined in main are
     // accessible to impure
  impure(); // prints: 1
  auto heathen = [w, y](int k = 0) {
    std::cout << w + k << y + k << std::endl;
  }; // selective capture, can only use w, y and global or static local
     // variables.
  heathen(2); // prints: 54
  // auto stoopid = [x, w]() {
  //   return x + y;
  // }; // has no access to y, so skoozy no compilo, no habla ingles
  x = 3;
  impure(); // prints: 1
  // x was captured with value 1, at the definition of impure, not at this call
  auto smort = [k = x, n = y]() {
    std::cout << k << n << std::endl;
  }; // rename param
  smort(); // prints: 3

  auto modx = [&]() { x = 7; }; // total reference capture, can modify all
                                // variables in the calling context.
  std::cout << x << std::endl;
  modx(); // modifies x
  std::cout << x << std::endl;

  int nonsense1 = 2, nonsense2 = 1;
  auto affine = [&a = nonsense1, &b = nonsense2](int x) {
    return a * x + b;
  }; // selective reference capture with renaming
  std::cout << affine(0) << std::endl; // prints: 1
  std::cout << affine(3) << std::endl; // prints: 7

  return 0;
}
```

Reference captures can cause UB.
```cpp
double *nonsense = new double(3);
auto mulNonsense = [&a = *nonsense](double x) { return a * x; };
std::cout << mulNonsense(4.0) << std::endl; // prints: 12.0
delete nonsense;
std::cout << mulNonsense(4.0)
          << std::endl; // UB, dangling reference used in lambda
```

Avoid three things with lambdas:
- functions that return lambdas that capture by reference
  any elements of the function context.
- a lambda capturing references of the current context is stored for futher use
  (using the generic 
  [`function`](https://en.cppreference.com/w/cpp/utility/functional/function)
  wrapper for example).
- thread shenanigans with lambdas capturing by reference.

```cpp
// an example of a mixed capture
#include <iostream>

int main() {
  int x = 32, y = 3;
  std::cout << "x=" << x << " y=" << y << std::endl; // prints: x=32 y=3
  [&a = x, b = y]() { a = b;}();
  std::cout << "x=" << x << " y=" << y << std::endl; // prints: x=3 y=3
  return 0;
}
```

An example of relevant uses of lambdas:
```cpp
#include <iostream>

// the common reduce function common in the functional paradigm
// T is a type, BinF is a callable object with the parameters (T,T) which return a T
template <typename T, typename F> 
// init is the initial value, list contains the other values in the calculation
T reduce(T list[], int n, T init, F f) { 
  for (int i = 0; i < n; i++){
    init = f(init, list[i]);
  }
  return init;
}
int main() {
  int v[] = {1, 2, 3, 4, 5, 6, 7, 8};
  int nv = sizeof(v) / sizeof(*v); // number of values in v
  int r1 = reduce(v, nv, 0, [](int a, int b) { return a + b; });
  // performs summations, prints: 36
  int r2 = reduce(v, nv, 1, [](int a, int b) { return a * b; });
  // performs products, prints: 40320
  int r3 = reduce(v, nv, 0, [](int a, int b) { return a ^ b; });
  // performs consecutive xor's (checksum), prints: 8
  std::cout << r1 << " " << r2 << " " << r3 << std::endl;
  return 0;
}
```

Let `M` > `N` and `f` be a function of `M` parameters. Currying is the 
process of creating a function `g` of `N` parameters by fixing `M-N` parameters 
in `f`.

example: 

```cpp
#include <iostream>

int main() {
  // lambda returning lambda
  auto in = [](auto min, decltype(min) max) {
    return [min, max](decltype(min) valeur) -> bool {
      return valeur >= min && valeur <= max;
    };
  };

  auto lowercase = in('a', 'z');
  std::cout << std::boolalpha << lowercase('v') << std::endl; // prints: true
  std::cout << lowercase('V') << std::endl;                   // prints: false

  auto proba = in(0.0, 1); // is a valid probability value
  std::cout << proba(2) << std::endl; // prints: false
  std::cout << proba(0) << std::endl; // prints: true
  std::cout << proba(1) << std::endl; // prints: true
  std::cout << proba(0.4) << std::endl; // prints: true
  return 0;
}
```

The Standard Template Library contains
- Algorithms
- Containers (~15 class templates)
- Iterators

[`std::list`](https://en.cppreference.com/w/cpp/container/list) implements a 
bidirectional linked list.

An iterator is a pointer-like object used to cycle through all
the elements stored in a container.
Iterators are a standard way to access a container. Each container type `X`
provides a type `X::iterator` to access its elements. The `begin()` method
returns an iterator that points to the first element of the container. Its value
can be accessed by using the `*` operator as if it was a pointer dereference.
The `++` operator applied (suffix or prefix) to an iterator goes to the next 
element in the container.

ITERATORS ARE NOT POINTERS.

All containers offer at least the `begin()` and `end()` methods.

Careful, The `end()` method returns an iterator to the element
following the last element, not the last element.

NEVER DEREFERENCE THE OPERATOR RETURNED BY `end()`.

However, one can compare that iterator with another iterator of the same type
and pointing to an element of the same container.

We can iterate through a container by using an iterator that goes through
\\([c.begin(), c.end()[\\)

Application
```cpp
#include <iostream>
#include <list>
#include <vector>

template <typename C> void displayAll(C &c) {
  // C::iterator it; // does'nt work, compiler does'nt know that C::iterator is
  // a type and not a member of class C
  typename C::iterator it; // specify explicitly that C::iterator is a type, and
                           // declare it to be of that type
  for (it = c.begin(); it != c.end(); it++)
    std::cout << *it << " ";
  // // or in C++11 onward:
  // for(auto it = c.begin(); it!=c.end(); it++)
  //   std::cout << *it << " ";
  std::cout << std::endl;
}

int main() {
  std::list<double> li = {1, 2, 3, 4};
  std::vector<double> ve = {20, 30, 70};
  displayAll(li); // prints: 1 2 3 4
  displayAll(ve); // prints: 20 30 70
  return 0;
}
```

There is not necessarily an order relation between iterators, USE `!=c.end()` and
not `<c.end()`.

If there is no need to modify the container elements, use a 
[`const_iterator`](https://en.cppreference.com/w/cpp/iterator/basic_const_iterator)
```cpp
template <typename C> void displayAll(const C &c) {
  for(auto it = c.begin(); it!=c.end(); it++) // it is a const_iterator
    std::cout << *it << " ";
  std::cout << std::endl;
}
```

| Iterator form | Description |
|--|--|
| input iterator | Read only, forward moving |
| output iterator | Write only, forward moving |
| forward iterator | Both read and write, forward moving |
| bidirectional iterator | Read and write, forward and backward moving |
| random access iterator | Read and write, Red and write, random access |

<img src="media/iterator_examples.png" width=400 />


There are three principal types of iterators:
- Iterators that move forward (
  [`input_iterator`](https://en.cppreference.com/w/cpp/iterator/input_iterator),
  [`output_iterator`](https://en.cppreference.com/w/cpp/iterator/output_iterator) and
  [`forward_iterator`](https://en.cppreference.com/w/cpp/iterator/forward_iterator)
  ) and the associated named requirements. operators: `++`, `*`, `==`, `!=`.
  More details on the 
  [`forward_iterator`](https://en.cppreference.com/w/cpp/iterator/forward_iterator)
  can be found on
  [`Quora`](https://www.quora.com/Whats-the-difference-between-an-InputIterator-and-a-ForwardIterator),
  [`Oracle Docs`](https://docs.oracle.com/cd/E19422-01/819-3703/2_2.htm) and 
  [`CPlusPlus.com`](https://cplusplus.com/reference/iterator/ForwardIterator/).
- Bidirectional Iterators  like 
  [`bidirectional_iterator`](https://en.cppreference.com/w/cpp/iterator/bidirectional_iterator)
  also implement the `--` operator.
- Random Access Iterators implement the `[]`, `+`, `+=`, `-`, `-=`, `<`, `<=`,
  `>` , `>=` on top of the other usual operators. There exists an order relation
  among Random Access Iterators of a container.
  An example is the the `std::vector::iterator` class and 
  [`std::random_access_iterator`](https://en.cppreference.com/w/cpp/iterator/random_access_iterator).

Output iterators are never constant, and input iterators always are.

Ordinary pointers are random access iterators, which are a superset of output
iterators.

See [`CPlusPlus.com`](https://cplusplus.com/reference/iterator/),
[`Oracle Docs`](https://docs.oracle.com/cd/E19422-01/819-3703/2.htm) and
[`CPlusPlus.com`](https://cplusplus.com/reference/iterator/) for a general
view of iterators. (especially the Oracle Docs, good stuff).


 <!-- VECTOR -->


[`std::vector`](https://en.cppreference.com/w/cpp/container/vector) is a dynamic
size array.

`Vector<T, A>` T is the type of the elements stored, A is the type of the allocators
that can manage the memory of the elements.

Useful constuctors of the `vector` class:

```cpp
// empty vector
std::vector<int> vi;
// vector initialized with 7 elements equal to 3
std::vector<int> vd(7, 3);
// vector initialized with initializer list
std::vector<int> vil({1,2,3,4});
// vector initialized with initializer list 
std::vector<int> wil = {1,2,3,4};
// vector initialized with the copy constructor
std::vector<int> cwil=wil;
// vector initialized with the copy constructor (same)
std::vector<int> c2wil(wil);
```

```cpp
#include <iostream>
#include <iterator>
#include <vector>

class X {
  double x_;
  char c_;

public:
  X(double x, char c = 'c') : x_(x), c_(c) {}
  friend std::ostream &operator<<(std::ostream &os, const X &x) {
    return os << x.c_ << ":" << x.x_;
  }
};

template <typename T>
std::ostream &operator<<(std::ostream &os, std::vector<T> v) {
  os << "{";
  for (auto val = v.begin(); val != v.end(); val++) {
    os << *val << ",";
  }
  return os << "}";
}

int main() {
  std::vector<X> v;
  // construct at the end of the vector
  v.emplace_back(2, '3');
  std::cout << v << std::endl; // prints: {3:2,}
  // insert at the end of the vector
  v.push_back(X(2));
  std::cout << v << std::endl; // prints: {3:2, c:2}
  // insert using a back insert iterator,
  std::back_insert_iterator<std::vector<X>> i(v);
  // litteraly just calls push_back according to the doc
  *i++ = X(3.14);
  *i++ = X(1. / 2);
  std::cout << v << std::endl; // prints: {3:2,c:2,c:3.14,c:0.5,}
  
  // insert using an insert iterator, start inserting at start+2
  std::insert_iterator<std::vector<X>> ia(v, v.begin()+2);
  // litteraly just calls insert at 2 according to the doc
  *ia++ = X(13);
  std::cout << v << std::endl; // prints: {3:2,c:2,c:13,c:3.14,c:0.5,}
  return 0;
}
```

[`emplace_back`](https://en.cppreference.com/w/cpp/container/vector/emplace_back)
passes its arguments to the constructor of the class, it creates a new object and 
appends it. This saves the cost of copying an intermediary object.

See more on the 
[`back_insert_iterator`](https://en.cppreference.com/w/cpp/iterator/back_insert_iterator)
and
[`insert_iterator`](https://en.cppreference.com/w/cpp/iterator/insert_iterator).

Vector elements can be accessed:
- with the 
  [`at`](https://en.cppreference.com/w/cpp/container/vector/at)
  method; accessess the elements at the specified index, it returns a reference to 
  it. throws an 
  [`std::out_of_range`](https://en.cppreference.com/w/cpp/error/out_of_range)
  exception if incompatible index.
- the `[]` operator; UB if index incompatible index.
- by dereferencing an iterator pointing to some vector element. UB if invalid.
- using a range based for loop (C++>=11)
- using the
  [`front`](https://en.cppreference.com/w/cpp/container/vector/front) and 
  [`back`](https://en.cppreference.com/w/cpp/container/vector/back) methods
  which return references to the first and last element in the vector.

```cpp
std::vector<int> v(3,5);
for(const auto& val : v) // uses iterators in the background
  std::cout << val << std::endl;
```

Vector elements are necessarily contiguous in memory (dictated by the C++
standard). 
```cpp
std::vector<int> v({1,2,3,4,5});
int *p = v.data();
std::cout << *p << std::endl; // prints: 1
p = &v[3];
std::cout << *p << std::endl; // prints: 4
std::cout << *(&v[0] + 3) << std::endl; // prints: 4
```
Use the 
[`capacity()`](https://en.cppreference.com/w/cpp/container/vector/front) method
to get the storage size of that array (always >= #elems).

Use the 
[`resize(newsize, optional filler)`](https://en.cppreference.com/w/cpp/container/vector/resize)
method to resize the vector container and fill the new elements with a filler
default value.

Application: using a pointer to traverse a vector
```cpp
std::vector<int> v({1,2,3,4,5});
auto p = &v[0];
auto pmax = p+v.size();
for(; p!=pmax; p++)
  std::cout << *p << " "; // prints: 1 2 3 4 5
```

|operation|cost|
|---|---|
|memory|\\(\propto N\\) |
|insertion at the front|\\(\propto N\\) |
|insertion at the back| Constant (and cheap)|
|insertion at position \\(p\\)| \\(\propto (N-p)\\)|
|deletion at the front|\\(\propto N\\) |
|deletion at the back| Constant (and cheap)|
|deletion at position \\(p\\)| \\(\propto (N-p)\\)|
|access via index| Constant (and very cheap)|
|reference and pointer invalidation on modification| YES ⚠️ |
|iterator invalidation on modification| YES ⚠️ |


 <!-- DEQUE -->

[`std::deque`](https://en.cppreference.com/w/cpp/container/deque)
is double-ended
queue. Insertions and deletions at the front and back are constant time.

The elements of a deque are not contiguous in memory \\( \rightarrow \\) can't
iterate with a pointer.

Some useful constructors for a deque
```cpp
// empty deque
std::deque<int> di;
// deque containing 10 elements all with value 5
std::deque<int> dd(10, 5);
// deque initialized with an initializer_list
std::deque<int> dil1({1, 2, 3, 4, 5});
// deque initialized with an initializer_list (same)
std::deque<int> dil2 = {1, 2, 3, 4, 5};
// cloning constructor
std::deque<int> dc1(di);
// cloning constructor (same)
std::deque<int> dc2=di;
```

`deque` provides the 
[`push_back`](https://en.cppreference.com/w/cpp/container/deque/push_back),
[`emplace_back`](https://en.cppreference.com/w/cpp/container/deque/emplace_back),
[`push_front`](https://en.cppreference.com/w/cpp/container/deque/push_front) and the
[`emplace_front`](https://en.cppreference.com/w/cpp/container/deque/emplace_front)
methods.

we can also use 
[`back_insert_iterator`](https://en.cppreference.com/w/cpp/iterator/back_insert_iterator),
[`front_insert_iterator`](https://en.cppreference.com/w/cpp/iterator/front_insert_iterator),
[`insert_iterator`](https://en.cppreference.com/w/cpp/iterator/insert_iterator),
for example:
```cpp
// assume di is an empty deque<int>
std::back_insert_iterator<std::deque<int>> i(di); 
*i++ = 100;
*i++ = 299;
for (const auto &val : di)
  std::cout << val << " "; // prints: 100 299
std::cout << std::endl;

std::front_insert_iterator<std::deque<int>> fi(di); 
*fi++ = 0;
*fi++ = 1;
for (const auto &val : di)
  std::cout << val << " "; // prints: 1 0 100 299
std::cout << std::endl;

std::insert_iterator<std::deque<int>> ii(di, di.begin()+2);
*ii++ = -1;
*ii++ = -2;
for (const auto &val : di)
  std::cout << val << " "; // prints: 1 0 -1 -2 100 299
std::cout << std::endl;
```

Deque elements can be accessed:
- using the 
  [`at`](https://en.cppreference.com/w/cpp/container/deque/at)
  method; accessess the elements at the specified index, it returns a reference to 
  it. throws an 
  [`std::out_of_range`](https://en.cppreference.com/w/cpp/error/out_of_range)
  exception if incompatible index.
- using the `[]` operator; UB if index incompatible index.
- by dereferencing an iterator pointing to some vector element. UB if invalid.
- using a range based for loop (C++>=11) // same as with vector, no example here
- using the
  [`front`](https://en.cppreference.com/w/cpp/container/deque/front) and 
  [`back`](https://en.cppreference.com/w/cpp/container/deque/back) methods
  which return references to the first and last element in the deque.


// not done

|operation|cost|
|---|---|
|memory|\\(\propto N\\) (> vector) |
|insertion at the front|Constant (and cheap) |
|insertion at the back| Constant (and cheap)|
|insertion at position \\(p\\)| \\(\propto N\\)|
|deletion at the front| Constant (and cheap)|
|deletion at the back| Constant (and cheap)|
|deletion at position \\(p\\)| \\(\propto N\\)|
|access via index| Constant (>vector)|
|reference and pointer invalidation on modification| NO ✅️ |
|iterator invalidation on modification| YES ⚠️ |

Use a deque when operations at the front are common and the number of elements 
is high.

An [`std::array<T, N>`](https://en.cppreference.com/w/cpp/container/array)
cannot be extended.

Useful constructors:
```cpp
std::array<int,5> a0;
for(const auto& x:a0) std::cout << x << " "; 
// prints: whatever was stored there before, garbage
std::cout << std::endl;

std::array<int,5> a1 = {1,2,3,4};
// std::array<int,5> a1({1,2,3,4}); // equivalent
for(const auto& x:a1) std::cout << x << " ";
// prints: 1 2 3 4 0
std::cout << std::endl;

// std::array<int, 5> a2 = {1,2,3,4,5,6}; // compilation error

std::array<int, 5> c(a1); // cloning constructor
for(const auto& x:c) std::cout << x << " ";
// prints: 1 2 3 4 0
std::cout << std::endl;
```

The logical size of an `array` is always equal to its physical size.
Can't insert elements, can overwrite.



Array elements can be accessed:
- using the 
  [`at`](https://en.cppreference.com/w/cpp/container/array/at)
  method; accessess the elements at the specified index, it returns a reference to 
  it. throws an 
  [`std::out_of_range`](https://en.cppreference.com/w/cpp/error/out_of_range)
  exception if incompatible index.
- using the `[]` operator; UB if index incompatible index.
- by dereferencing an iterator pointing to some array element, UB if invalid.
- using a range based for loop (C++>=11)
- using the
  [`front`](https://en.cppreference.com/w/cpp/container/array/front) and 
  [`back`](https://en.cppreference.com/w/cpp/container/array/back) methods
  which return references to the first and last element in the array.
- using the 
  [`data`](https://en.cppreference.com/w/cpp/container/array/data) method, which:
  returns a pointer to the underlying array serving as element storage.
  The pointer is such that range `[data(), data() + size()]` is always a valid
  range, even if the container is empty (`data()` is not dereferenceable
  in that case). 

Contrary to a C style array, an `std::array` object is not automatically converted
to a pointer to its first element; for a function to receive an `std::array<T, N>`
use a formal parameter of type `std::array<T, N>` or `std::array<T,N>&` but never
`T*`.

|operation|cost|
|---|---|
|memory|\\(\propto N\\)|
|insertions and deletions|NO ES POSIBLE!|
|access via index| Constant |
|reference and pointer invalidation on modification| NO ✅️ |
|iterator invalidation on modification| NO ✅️ |

The `std::array<T,N>` container is NEVER REALLOCATED.

Use an `array` if you want to use C style arrays with an OO interface.

`std::array::size()` is `constexpr`. Two arrays of different sizes don't even
have the same type (bcoz template param `N` is the size).

[`std::basic_string<C,T,A>`](https://en.cppreference.com/w/cpp/string/basic_string)
- `C` is the character type
- `T` is the traits type (used to manipulate objects of type `C`)
- `A` is the allocater type for type `C`

classes defined in `<string>`:

|name|definition|encoding|
|---|---|---|
|string|basic_string<char>|ASCII|
|wstring|basic_string<wchar_t>|unicode 16 or 32|
|u16string|basic_string<char16_t>|unicode 16|
|u32string|basic_string<char32_t>|unicode 32|

characters in the string class are stored contiguously.

some useful constructors of `std::string`
```cpp
std::string s1;
std::cout << "[" << s1 << "]" << std::endl; // []
std::string s2 = "abcdf fjd";
std::cout << "[" << s2 << "]" << std::endl; // [abcdf fjd]
std::string s3 = s2;
std::cout << "[" << s3 << "]" << std::endl; // [abcdf fjd]
std::string s4(s2, 4, 3);
std::cout << "[" << s4 << "]" << std::endl; // [f f]
std::string s5 = {'a', 'e', 'i', 'o', 'u', 'y'};
std::cout << "[" << s5 << "]" << std::endl; // [aeiouy]
std::string s6(6, '-');
std::cout << "[" << s6 << "]" << std::endl; // [------]
```



String characters can be accessed:
- using the 
  [`at`](https://en.cppreference.com/w/cpp/string/basic_string/at)
  method; accessess the elements at the specified index, it returns a reference to 
  it. throws an 
  [`std::out_of_range`](https://en.cppreference.com/w/cpp/error/out_of_range)
  exception if incompatible index.
- using the `[]` operator; UB if index incompatible index.
- by dereferencing an iterator pointing to some character in the string,
  UB if invalid.
- using a range based for loop (C++>=11)
- using the
  [`front`](https://en.cppreference.com/w/cpp/string/basic_string/front) and 
  [`back`](https://en.cppreference.com/w/cpp/string/basic_string/back) methods
  which return references to the first and last characters in the string.
- using the 
  [`c_str`](https://en.cppreference.com/w/cpp/string/basic_string/c_str) method,
  which: returns a pointer to a null-terminated character array with data
  equivalent to those stored in the string (*ie:* an equivalent C style string).


|operation|cost|
|---|---|
|memory|\\(\propto N\\)|
|insertions and deletions at the end|Constant|
|insertions and deletions at the beginning|\\(\propto N\\)|
|insertions and deletions at the position \\(p\\)|\\(\propto (N-p)\\)|
|access via index| Constant |
|reference and pointer invalidation on modification| YES ⚠️ |
|iterator invalidation on modification| YES ⚠️|

`void f(const string&);` accepts the parameter `"c style string"`, convesion
by constructor: `f (string("c style string"))`. To get a `string` instance
directly, use the suffix `s` after the `"`. `f("real string instance"s)`,
this way no data needs to be copied.

[`list<T,A>`](https://en.cppreference.com/w/cpp/container/list) and 
[`forward_list<T,A>`](https://en.cppreference.com/w/cpp/container/forward_list)
are declared in the `<list>` and `<forward_list>` headers respectively.
They are both parametrised by:
- `T` the type of elements stored.
- `A` the type of allocators used for 'T' (default is 
  [`std::allocator<T>`](https://en.cppreference.com/w/cpp/memory/allocator)
  ).


typical implementation of a list (doubly linked list):

<img src="media/list.png" width=400/>

typical implementation of a forward_list (linked list):

<img src="media/forward_list.png" width=400/>

The implementations are non intrusive: the stored elements don't need to store 
pointers to ther successors and predecessors.


```cpp
#include <iostream>
#include <list>
#include <string>

template <typename T> void printList(const std::list<T> &l) {
  std::cout << '[';
  for (const T &e : l)
    std::cout << e << " ";
  std::cout << ']' << std::endl;
}

int main() {
  std::list<int> li1;
  printList(li1); // prints: []
  std::list<std::string> li2 = {"first", "second"};
  printList(li2); // prints: [first second ]
  std::list<std::string> li3 = li2;
  printList(li3); // prints: [first second ]

  auto istart_li2 = li2.begin();
  auto iend_li2 = li2.end();
  // can't just do li2.begin()+1 , list has a bidirectional operator, which
  // is not a random access iterator
  istart_li2++; // ignore first element of li2
  std::list<std::string> li4(istart_li2, iend_li2);
  printList(li4); // prints: [second ]

  std::list<double> li5(4, 3.14159);
  printList(li5); // prints: [3.14159 3.14159 3.14159 3.14159 ]

  return 0;
}
```


List elements can be accessed by
- dereferencing an iterator pointing to some list element. UB if invalid.
- using a range based for loop (C++>=11).
- using the
  [`list::front`](https://en.cppreference.com/w/cpp/container/list/front) and 
  [`list::back`](https://en.cppreference.com/w/cpp/container/list/back) methods
  which return references to the first and last element in the list.
  (analogous methods are provided for `forward_list` ... RTFD)

NO RANDOM ACCESS

To delete all elements in a list, use the 
[`list::clear`](https://en.cppreference.com/w/cpp/container/list/clear) and
[`forward_list::clear`](https://en.cppreference.com/w/cpp/container/forward_list/clear)
methods.


Insert elements before an iterator's position using the 
[`insert`](https://en.cppreference.com/w/cpp/container/list/insert) method.

For a `foward_list`, it is inefficient to insert before a specified item, thus 
the [`insert_after`](https://en.cppreference.com/w/cpp/container/forward_list/insert_after)
method is provided.

The 
[`emplace`](https://en.cppreference.com/w/cpp/container/list/emplace) and 
[`emplace_after`](https://en.cppreference.com/w/cpp/container/forward_list/emplace_after)
methods play analogous roles, the elements are constructed in-place,
*i.e.* no copy or move operations are performed.
The constructor of the element is called with exactly the same arguments,
as supplied to the function.

The 
[`list::push_back`](https://en.cppreference.com/w/cpp/container/list/push_back),
[`list::emplace_back`](https://en.cppreference.com/w/cpp/container/list/emplace_back),
[`forward_list::push_back`](https://en.cppreference.com/w/cpp/container/forward_list/push_back)
and 
[`forward_list::emplace_back`](https://en.cppreference.com/w/cpp/container/forward_list/emplace_back)
methods can be used to add an element to the end of a list (or construct one).

The 
[`list::pop_back`](https://en.cppreference.com/w/cpp/container/list/pop_back),
methods can be used to remove the last element in the list.

The 
[`list::push_front`](https://en.cppreference.com/w/cpp/container/list/push_front),
[`list::emplace_front`](https://en.cppreference.com/w/cpp/container/list/emplace_front),
[`list::pop_front`](https://en.cppreference.com/w/cpp/container/list/pop_front),
[`forward_list::push_front`](https://en.cppreference.com/w/cpp/container/forward_list/push_front),
[`forward_list::emplace_front`](https://en.cppreference.com/w/cpp/container/forward_list/emplace_front)
and
[`forward_list::pop_front`](https://en.cppreference.com/w/cpp/container/forward_list/pop_front)
methods can respectively: add, construct and remove the first element in a list
or forward_list.

// not done 448
Some algorithms provided as methods for lists and forward_lists:
- the
[`list::merge`](https://en.cppreference.com/w/cpp/container/list/merge) and 
[`forward_list::merge`](https://en.cppreference.com/w/cpp/container/forward_list/merge)
can merge two sorted lists. No elements are copied, and the passed in container
becomes empty after the merge.
- the
[`list::merge`](https://en.cppreference.com/w/cpp/container/list/merge) and 
[`forward_list::merge`](https://en.cppreference.com/w/cpp/container/forward_list/merge)
can merge two sorted lists. No elements are copied, and the passed in container
becomes empty after the merge.

