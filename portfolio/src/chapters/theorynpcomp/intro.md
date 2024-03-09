# Theory of NP-Completeness

This chapter is a summary of the book 
"*Computers and Intractability: A Guide to the Theory of NP-Completeness*"
\- *Michael R.Garey / David S. Johnson*.
## Basics

**Purpose**: 
"*In short, the primary application of the theory of \\(NP\\)-completeness
is to assist algorithm designers in directing their problem-solving efforts
towards those approaches that have the greatest likelihood of leading to 
useful algorithms*"
<br>

**Definition**

\\(f(n)\\) is \\(O(g(n))\\) if there exists a constant \\(c\\) such that
\\(|f(n)|\leq c\cdot|g(n)|\\) for all values of \\(n\\).


**Definition**

A problem is **intractable** if no polynomial 
time algorithm can possibly solve it.


**Two cases of intractability**

1. A problem is so difficult that an exponential amount of time is required
   to find a solution.
2. A solution to the problem cannot be encoded into an expression having
   length bounded by a polynomial fuction of the input length.
   <br>\\(\longrightarrow\\) only problems for which the solution length is 
   bounded by a polynomial function of the input length will be considered.

**Definition**

A problem is said to be **undecidable** if no algorithm 
at all can be given for solving it.

*Examples*
1. The halting problem is undecidable: it is impossible to specify an algorithm
   which, given an arbitrary computer program and an arbitrary input to that
   program, can decide whether or not the program will eventually halt when 
   applied to that input.
2. Hilbert's tenth problem: solvability of polynomial equations in integers.
3. The triviality problem for finitely presented groups 
   [[Rabin 1958]](https://arxiv.org/pdf/1401.2273.pdf).

**Remark**
Undecidable problems are intractable.

**Definition**

A problem is said to be **non-deterministically intractable** if it cannot be solved
in polynomial time using a **non-deterministic computer** model, which has the
ability to pursue an unbounded number of independant computational sequences 
in parallel.

**Remark**
All provably intractable problems known to date are either undecidable or 
non-deterministically intractable.

**Definition**
- NP is the set of decision problems solvable in polynomial time by a nondeterministic Turing machine.
- NP is the set of decision problems verifiable in polynomial time by a deterministic Turing machine.

**Reduction** is a technique used for demonstrating that two problems are 
related to one another, by giving a constructive transformation that maps
any instance of the first problem into an equivalent instance of the second.

The Complexity of Theorem Proving Procedures - [paper by Cook](https://doi.org/10.1145/800157.805047)
1. Polynomial time reducibility: If we have a polynomial time reduction
   from one problem to another, this ensures that any polynomial time algorithm
   for the second problem can be converted into a polynomial time algorithm for
   the first problem.
2. Most of the apparently intractable problems encountered in practice, when 
   phrased as decision problems belong to the class of \\(NP\\) decision problems that
   can be solved in polynomial time by a non-deterministic computer.
3. Every problem in NP can be polynomially reduced to the satisfiability problem.

The satisfiability problem is the "hardest" problem in \\(NP\\). 

The problem "Does a graph \\(G\\) contain a 
complete subgraph on a given number \\(k\\) of vertices?" also has this property.



The class of these "hardest" problems in \\(NP\\) has been shown to include 
many other problems by *Richard Karp* in *1972*.
See this [page](https://en.wikipedia.org/wiki/Karp%27s_21_NP-complete_problems)
for more details.

The equivalence class of the Satisfiability problems is called the set of 
**\\(NP\\)-complete** problems.


Here is a more concrete definition from [wikipedia](https://en.wikipedia.org/wiki/NP-completeness):

A problem is **\\(NP\\)-complete** if:
- It is a decision problem, meaning that for any input to the problem, 
  the output is either "yes" or "no".
- When the answer is "yes", this can be demonstrated through the existence
  of a short (polynomial length) solution.
- The correctness of each solution can be verified quickly (namely, 
  in polynomial time) and a brute-force search algorithm can find a solution 
  by trying all possible solutions.
- The problem can be used to simulate every other problem for which we can
  verify quickly that a solution is correct. In this sense, NP-complete
  problems are the hardest of the problems to which solutions can be verified
  quickly. If we could find solutions of some NP-complete problem quickly,
  we could quickly find the solutions of every other problem to which a given
  solution can be easily verified.

**Open Question**: are the \\(NP\\)-complete problems intractable ?

