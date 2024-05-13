# gcc

| Extension | File Type |
|---|---|
| .c | C source file |
| .cpp/.cc/.cxx | C++ source file |
| .o/.obj | Object file |
| .exe | Windows executable |
| *no extension* | Unix/Linux executable |
| .dll | Windows dynamic library |
| .lib | Windows static library |
| .so | Unix/Linux dynamic library |
| .a | Unix/Linux/MacOS static library |
| .dylib | MacOS dynamic library |

## C
```bash
gcc -c x.c # compile c source file into x.o object file
gcc -c x.c y.c # compile c source files into x.o and y.o object files
gcc -o executable x.o y.o # link object files x.o and y.o into a single executable file

# compile and link source files x.c and y.c into a single executable file
gcc -o executable x.c y.c # intermediate object files are discarded

# compile and link source files x.c and y.c into a single executable file
# looks up any undefined symbols during linking in library named **libsomething**.
gcc -o executable x.c y.c -lsomething # -lABC -> search in libABC

# use the gcc preprocessor only
gcc -E in.c -o in.i

# see header file content
gcc -include stddef.h -E -dM - </dev/null | less

# check for memory leaks with valgring
valgrind --leak-check=yes ./program_name # if not in PATH and in working dir
```

## C++
```bash
g++ -c x.cpp # compile cpp source file into x.o object file
g++ -c x.cpp y.cpp # compile cpp source files into x.o and y.o object files
g++ -o executable x.o y.o # link object files x.o and y.o into a single executable file
# compile and link source files x.cpp and y.cpp into a single executable file
g++ -o executable x.cpp y.cpp # intermediate object files are discarded

# compile and link source files x.cpp and y.cpp into a single executable file
# looks up any undefined symbols during linking in library named **libsomething**
g++ -o executable x.cpp y.cpp -lsomething # -lABC -> search in libABC

# specify C++ standard -> use -std=bruh flag
g++ -o prog main.cpp -std=c++17
```