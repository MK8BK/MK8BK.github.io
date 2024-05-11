# C

A `char` type is always encoded using 8 bits \\(\rightarrow\\) just an integer type
with a fixed range.

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
int main(int argc, int *argv[]){
    // ...
}
// is equivalent to 
int main(int argc, int **argv){
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