# C

A `char` type is always encoded using 8 bits (single byte) \\(\rightarrow\\)
just an integer type with a fixed range.

An `int` type usually has the same size as the processor's registers. 

\\[8=taille(char)\leq taille(short)\leq taille(int) \leq taille(long)
\leq taille(long \\ long)\\]

Operations on integer types ALWAYS return integer types: 3/2 \\(\rightarrow\\) 1.

IEEE-764 floating point encodings (most frequently used):

| type | # bits | # digits of precision |
|--|--|--|
| float | 4 | 6 |
| double | 8 | 15 |
| long double | 10 | 18 |

If a literal contains a point or exponent (`e` or `E`), then it is a floating type.
Otherwise, it is an integer type.

To use a different number base (*ie: not decimal*), prefix with `0b` for binary, 
`0x` for hexadecimal and `0` for octal.

In C: `'A'` is of type `int`, in C++: it is of type `char`.

```c 
printf("\a"); // produces a sound
``` 

By default, `2.3` is of type `double`.

To specify a literals type, use a suffix (or a combination for unsigned types):

| type | suffix |
|--|--|
| char | *none* |
| short | *none* |
| int | *none* |
| long | L |
| long long | LL |
| float | F/f |
| double | *none* |
| long double | L |
| unsigned int | U/u |

Addresses and Pointers Nonsense:
```c
char u; // a character
char *pu; // a pointer to a character
char *ppu; // a pointer to a pointer to a character

u = 2; // assign the value of the literal 2 to u
pu = &u; // assign the address of u to pu
ppu = &pu; // assign the address of pu to ppu

// pointer dereference, lines 13, 14 and 15 have the same effect
int a = 2;
int *pa = &a;
int **ppa = &pa;
a = 0; 
*pa = 0;
**ppa = 0;
```

`The value of a pointer is an address.`

Pointer to Function Example:
```c
#include <stdio.h>

int f(int n){
    return n/2;
}

int main(){
    int (*fp)(int) = &f;
    printf("%d\n", (*fp)(8));
    return 0;
}
```

Always initialize a pointer.

```cpp
int *p1 = 0 // the only allowed int to pointer assignment!
int *p2 = NULL // same
p1 = nullptr; // preferable in std>=C++11
```

Enumerated int constants:
```c
enum {f, t}; // f: 0, t: 1
enum {f=10, t, d=2}; // f: 10, t: 11, d: 2
```

Constants and pointers
```c
int const  *ptr; 
// ptr is a pointer to constant int -> can't modify the pointed variable with this pointer
int *const ptr = &x; // constant pointer --> needs initilization
// ptr is a constant pointer to int -> can't modify the address stored in this pointer
```

Prepend a variable declaration with the `volatile` keyword to inform the compiler
that the variable may change without being explicitly reassigned; this disables any
optimizations.

Never use `volatile` with `const`.

```c
char x = 3;
x = ~x; // The bitwise complement operator (unary)
```

The binary bitwise AND `&` and OR `|` operators.

The binary bitwise XOR `^` operator.

```c
int a = 1<<4; //The left-shift operator; left shift by 4, pad with 0's
// k<<n is equivalent to multiplying by 2^n
int a = 1>>4; //The right-shift operator; right shift by 4, pad with 0's
// k>>n is equivalent to dividing by 2^n
```

If a variable `x` is of type `T`, the expression `&x` is of type `T*`. 

If a variable `x` is of type `const T`, the expression `&x` is of type `const T *`. 

Increasing numeric size types:

- `char`, `short`, `int`, `long int`, `long long int`.
- `float`, `double`, `long double`.
  
The unsigned versions have the same sizes.

```cpp
void function(const int *p){
    // this function won't use p to alter the pointed variable 
    // (which might or might not actually be const)
    int j = *p;
    *p = 0; // error
}
```

```c
T a[s]; // an array `a` of size s and containing s elements with type `T`.
T a[s][s2]; // an array of arrays. contains s arrays each of size s2.
```

Array initialization:
```c
int a[3] = {1, 2, 3};
int b[] = {1, 2, 3, 4};
double c[4] = {3}; // rest are set to zero
int d[4] = {[0]=3, [3]=3}; // rest are set to zero
char carr[] = "bruh";
```

String manipulation in C
```c
#include <string.h>
char a[12] = "bruh";
int length = strlen(a); // length = 4, due to \0 terminated value in a

char b[12];
strcpy(b, "nonsense"); // copy into b
strcpy(a, b); // a now contains nonsense

strcpy(b, "no"); // b = "no"
strcat(b, " nonsense"); // b = "no nonsense"

strcmp(t1, t2); // -> ~ t1 codes - t2 codes

char a[20];
scanf("%s", a); // NOT &a
```
All these functions consider the null terminator as the end of the string.

Structs
```c
struct structure_name {
    member_declarations;
};

struct Color{
    int red;
    int green;
    int blue;
};

struct Color b;
b.red = 0;
b.green = 0;
b.blue = 255;

struct Color *pb;
pb = &b;

(*pc).red = 255;
pc->red = 255; // the two lines are equivalent

struct Color c = {128, 200, 0};
struct Color c = {.red=128, .green=200, .blue=0};

struct Color d = c; // shallow copy (d.red = c.red, ...)
```

Unions (synonym for Useless)
```c
union union_name{
    member_declarations;
};
```

Can't return an array from a function.

```c
do {
    nonsense();
}while(!working());
```

Switch
```c
switch (selector){ // an int expression
    case val1: // an int expression available at compile time
    instructions1
    break;
    case val2:
    instructions2
    break;
    ...
    default:
    default_instructions
    break;
}
```
A switch selects the matching case in constant time.

Program arguments
```c
int main(int argc, char *argv[]){
    // ...
}
// is equivalent to 
int main(int argc, char **argv){
    // ...
}
```
`argc` is the argument count, **including the program name**

`argv` is the argument array, containing `argc` strings (`char*` delimited by `\0`)

Send a different exit code to the os.
```c
#include <stdlib.h> // exit declaration

void procedure(){
    exit(17); // equivalent to having an immediate return 17 in main()
}
int main(){
    procedure();
    // ...
    return 0;
}
```

```c
#define PI 3.0
// ... duh

#define STRUCTURE \
struct bruh\
{\
  double x;\
  double y;\
}
// <=>
#define STRUCTURE struct bruh {double x; double y;}

// macro with no value, boolean flag
#define INT32

// function like macro
#define MAX(a, b) a>b?a:b

// variadic macros
#define DEBUG(fmt, ...) fprintf(stdout, fmt, __VA_ARGS__);\
                        fflush(stdout)
```

To avoid operator precedence problems, wrap each macro formal
parameter in parentheses.

NEVER USE AN OPERATION THAT PRODUCES SIDE EFFECTS AS A MACRO ARGUMENT. 
no idea how many times it will be called.

Macro names should ALWAYS be all uppercase.

```c
#define bruh 
#undef bruh 
// undefine macro named bruh
```

```c
#define LOGLEVEL 1
#if LOGLEVEL == 0
// ...
#elif LOGLEVEL == 1
// ...
// ...
#elif LOGLEVEL == 4
// ...
#else
// ...
#endif
```

```c
#define M1 bruh
#define M2
#ifdef M1 // evaluates to true
// ...
#endif
#ifdef M2 // evaluates to true
// ...
#endif
#ifndef M3 // also evaluates to true
// ...
#endif
```

The conventional way to include header files, using header guards
```c
// file: A.h
#ifndef A_H
#define A_H
//...
#endif
```

`#if expression` where

*The expression is a constant expression, using only literals and identifiers,
defined using #define directive. Any identifier, which is not literal, 
non defined using #define directive, evaluates to 0.*

The # operator transforms a formal macro parameter into a string.
```c
#define·DISPLAYCALC(x)·printf(#x·"·=·%d\n",·x)
// ...
int a = 4;
DISPLAYCALC(a); // prints: a = 4\n
DISPLAYCALC(a*a); // prints: a*a = 4\n
```

The ## operator concatenates two formal macro parameters or a formal macro parameter and a string.


```c
int k; // both a declaration and definition
extern int j; // is a declaration but not a definition,
              // j is defined in some other compilation unit.
double square(double x) {return x*x;} // is both a declaration and definition
double root2(double); // is a declaration but not a definition
```

To define a type alias, declare a variable of the desired type and prefix its
declaration with typedef.

```c
// intermediate step
char chess_board[8][8]; // models an 8x8 chess board, as a declaration 
typedef char chess_board[8][8]; // is now a type alias, not a variable
// can now use it to declare variables
chess_board c1, c2;
```

For structures, take a similar approach
```c
struct point {
    int x, y;
};
struct point p; // intermediate step, variable
typedef struct point p; // final form of type alias
// can now declare variable using p instead of struct point
p point1, point2;
```

we can even combine the struct definition and alias

```c
typedef struct point{
    int x, y;
} p;

struct point p1; // is ok
p p1; // is also ok
```

More useful version with a single identifier consumed
```c
typedef struct {
    int x, y;
} p;

struct point p1; // NOOOOOO STOOOUUUPID
p p1; // is also ok
```

Parsing complex types

| operator | sentence | priority |
|---|---|---|
| [] | array of ... | highest |
| () | function returning ... | mid |
| * | pointer to ... | lowest |

```c
int j = 3; // global variable is accessible to all functions
static int k = 3; // static variable is only accessible to functions in the same
// compilation unit ie same source file
```

```c
char c = g() + 2; // NO, has to be a constant
char k = 'i' + 2; // Ok, know at compile time

int main(){
    // ...
}
```

Pointer p + int k = Pointer pointing k positions after p

Pointer p - int k = Pointer pointing k positions before p

Pointer p1 - Pointer p2 = number of elements in between the pointed elements

(if homogenous, otherwise bruh)

(Pointer p1 < Pointer p2) evaluates to 0 or 1
(boolean result of numeric comparison)

```c
int x[3];
// the following expressions are equivalent
x <==> &x[0];
x[i] <==> (&x[0])[i];
*x <==> *(&x[0]) <==> x[0];
*(x+i) <==> x[i]

int t[4];
int *pt = &t[0];
// the following expressions are equivalent
t[i] <==> pt[i] <==> *(t+i) <==> *(pt+i)
```

"an array identifier is a constant pointer to the first element of the array"

```c
char *word[]; // array of pointers to char NOT pointer to array of char
```

dynamic memory management
```c
// prototypes
void *malloc(size_t size);
void free(void *ptr);
void *realloc(void *ptr, size_t size);
```

```c
#include <stdlib.h>
double *p;
int n = 30;
p = malloc(n*sizeof(double)); // in c void* can be assigned to a T*, in C++ NO

for(int i=0; i<n; i++) p[i] = 0.0; // can be used syntactically as an array
```

malloc may fail to allocate a block of memory, in which case it will return a 
null pointer.

ALWAYS CHECK FOR NULL POINTER AFTER A CALL TO `malloc`.
```c
int *p = malloc(20*sizeof(int));
if(p==NULL){
  // fix it ... or fail catastrophically
}else{
  // go ahead
}

free(p); // free the allocated block
```

```c
int *p = malloc(20*sizeof(int));
// use, then find out it had an inappropriate size
p = realloc(p, 30*sizeof(int));
// yay, new size
```

`realloc` check-list:
- allocate new block with the appropriate size (if no expansion possible)
- copy data from the old block to the new (if could not just expand old block)
- free the old block (if changed)
- return pointer to the first element of the new block (if different)

`realloc` safety
```c
double *realloc_safe(double *p, size_t newsize, int *ok){
  *ok = 1; // all is good for now
  int *q = realloc(p, newsize);
  if(q) p = q;
  else *ok = 0; // not good, inform the caller
  return p;
}
```
these checks insure that p is always a valid pointer regardless of the success
of the reallocation.

Advice:
- DO NOT TRY TO INFER THE SUCCESS OF THE OPERATION BY COMPARING THE NEW AND OLD
POINTER ADDRESSES. A SUCCESSFULL REALLOCATION CAN KEEP THE SAME ADDRESS.
- ALWAYS FREE ALLOCATED BLOCKS
- NEVER USE A POINTER AFTER FREEING ITS POINTED BLOCK
- NEVER FREE MORE THAN ONCE (including realloc with 0 size)
- NEVER ACCESS MEMORY BEYOND THE ALLOCATED LIMIT
(even worse than array out of bound access)



```c
// Generate all permutations of an array
#include <stdio.h>

void swap(int *a, int *b){
  int t = *a;
  *a = *b;
  *b = t;
}

void printarray(int n, int *a){
  for(int i=0; i<n; i++)
    printf("%d ", a[i]);
  printf("\n");
}

void auxperm(int n, int k, int *a){
  if(n==k) {printarray(n, a); return;}
  for(int i=k; i<n; i++){
    swap(a+i, a+k);
    auxperm(n, k+1, a);
    swap(a+i, a+k);
  }
}

void perm(int n, int *a){
  auxperm(n, 0, a);
}

int main(){
  int n = 5;
  int a[n];
  for(int i=1; i<=n; i++) a[i-1] = i;

  perm(n, a);

  return 0;
}
```

```c
typedef const char *(*txtptr)(double);
```
`txtptr` is the type "pointer to function taking a double and returning a
pointer to a constant char".

```c
assert(("message", expr)); // efficient use of the comma operator
```


C function name nonsense
```c
#include <stdio.h>

void printchar(char c){
  printf("%c", c);
}

int main(){
  printchar('M'); // prints: M
  (*printchar)('M'); // compiles, prints: M 
  printf("\n");
  return 0;
}
```
Functions readily decay into pointers to themselves, see more on 
[`reddit`](https://www.reddit.com/r/C_Programming/comments/1az5qnz/comment/krz6bnr/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
.

staticrap
```c
void foo() {
    static int x = 5; // assigns value of 5 only once, at compile time
    x++;
    printf("%d", x);
}

int main() {
    foo(); // x = 6
    foo(); // x = 7
    return 0;
}
```
See more on [`StackOverflow`](https://stackoverflow.com/a/23777789).

