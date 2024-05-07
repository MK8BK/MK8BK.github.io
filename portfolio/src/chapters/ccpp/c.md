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