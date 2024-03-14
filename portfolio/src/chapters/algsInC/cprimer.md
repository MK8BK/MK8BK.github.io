# C Language Notes

**Hello World**
```c
#include <stdio.h>
int main(){
    printf("Hello World\n");
    return 0;
}
```

**Read from Standard Input**
```c
#include <stdio.h>
int main(){
    int x;
    scanf("%d", &x);
    printf("You typed %d\n", x);
    return 0;
}
```

**Standard Data Types**
```c
int n; // integer
float x; // float
double y; // double
char c; // char
unsigned y; // unsigned: prefix to numeric types
```

**Conversions**
```c
int x = 3;
double y = (double) x;
```

**Constants**
```c
#define PI 3.1415
```

**typedef**
```c
typedef char board[8][8]
...
board b; // still an 8x8 char array
```

