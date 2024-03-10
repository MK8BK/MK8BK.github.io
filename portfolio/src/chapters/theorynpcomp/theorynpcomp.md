# The Theory of NP-Completeness

## Decision Problems, Languages and Encoding Schemes

The theory of \\(NP\\)-completeness is designed to be applied only to decision
problems.

A Decision problem is a problem with only two possible solutions: "yes" and "no".

**Definition**
A decision problem \\(\Pi\\) consists of a set \\(D_\Pi\\) of instances and a 
subset \\(Y_\Pi \subseteq D_\Pi\\) of *yes*-instances.

\\(\rightarrow\\) a more practical approach is to define a *generic instance* 
using a set of various components (graphs, functions, numbers, sets) and a 
*yes-no* question asked in terms of the generic instance.

An instance belongs to \\(D_\Pi\\) iff it can be obtained from a generic instance
by substiting particular objects of the specified types for all
the generic components.

An instance belongs to \\(Y_\Pi\\) iff the answer to the stated question,
when particularized to that instance, is *"yes"*.

**Examples**

- **Subgraph Isomorphism**

    *Instance*: Two graphs \\(G_1=(V_1, E_1)\\) and \\(G_2=(V_2, E_2)\\).

    *Question*: Does \\(G_1\\) contain a subgraph isomorphic to \\(G2\\), that is, 
    a subset \\(V'\subseteq V_1\\) and a subset \\(E'\subseteq E_1\\) such that
    \\(|V'|=|V_2|\\), \\(|E'|=|E_2|\\), and there exists a one-to-one function
    \\(f: V_2 \rightarrow V'\\) satisfying \\(\\{u, v\\}\in E_2\\) iff 
    \\(\\{f(u), f(v)\\}\in E'\\) ?

- **Traveling Salesman**

    *Instance*: A finite set \\(C=\\{c_1, ..., c_m\\}\\) of "cities", a "distance"
    \\(d(c_i, c_j)\in\mathbb{Z}^+\\) for each pair of cities \\(c_i, c_j \in C\\)
    , and a bound \\(B\in\mathbb{Z}^+\\).

    *Question*: Is there a "tour" of all the cities in \\(C\\) having total
    length no more than \\(B\\), that is an ordering 
    \\(< c_{\pi(1)}, ..., c_{\pi(m)} >\\) of \\(C\\) such that

    \\[(\sum_{i=1}^{m-1}{d(c_{\pi(i)}, c_{\pi(i+1)})}) + d(c_{\pi(m)}, c_{\pi(1)}) \leq B ?\\]

The traveling salesman problem variant described above is an example of how 
a non decision problem can be transformed into a decision problem.

**Definition**

For any finite set \\(\Sigma\\) of symbols, we denote by \\(\Sigma^* \\) the set
of all finite strings of symbols from \\(\Sigma\\). If \\(L\\) is a subset
of \\(\Sigma^* \\), we say that \\(L\\) is a **language** over the **alphabet** 
\\(\Sigma\\).


**Examples**
- If \\(\Sigma=\\{0, 1\\}\\) then \\(\Sigma^* \\) consists of the empty string 
  "\\(\epsilon\\)", the strings \\(0, 1, 00, 01, 11, 000, 001\\) and all other
  finite strings of \\(1\\)'s and \\(0\\)'s.
- \\(\\{01, 001, 111, 1101010\\}\\) is a language over \\(\\{0, 1\\}\\), as is 
  the set of all binary representations of integers that are perfect squares,
  as is \\(\\{0, 1\\}^* \\) itself.


**Definition**

An encoding scheme \\(e\\) for a problem \\(\Pi\\) provides a way of describing
each instance of \\(\Pi\\) by an appropriate string of symbols over some fixed
alphabet \\(\Sigma\\). 

**Remark**

The problem \\(\Pi\\) and the encoding sceme \\(e\\) for \\(\Pi\\) partition
\\(\Sigma^* \\) intro three classes of strings: 
- those that are not encodings of instances of \\(\Pi\\).
- those that encode instances of \\(\Pi\\) for which the answer is "*no*".
- those that encode instances of \\(\Pi\\) for which the answer is "*yes*".

**Definition**

Assuming that \\(\Sigma\\) is the alphabet used by \\(e\\),
the language associated to the problem \\(\Pi\\) and the encoding \\(e\\) is 
denoted :
\\[
    L[\Pi, e] = \\{x\in\Sigma^* :  x\\
    is\\ the\\ encoding\\ under\\ e\\ of\\ an \\ instance\\ I\in Y_{\Pi}\\}.
\\]

**Lemma**
If a result holds for the language \\(L[\Pi, e]\\), then it holds for the 
problem \\(\Pi\\) under the encoding scheme \\(e\\).

Assuming the encodings we employ are "reasonable" most properties are 
encoding-independant.

We assume that every decision problem \\(\Pi\\) has an associated 
encoding-independant function \\(Length: D_\Pi \rightarrow\mathbb{N}\\),
which is "polynomially related" to the input lengths we would we would obtain 
from a reasonable encoding scheme.

**A Standard Encoding Scheme**

The alphabet used is \\(\Psi=\\{ 0 , 1 , - , [ , ] , ( , ) , , \\} \\).

We define **structured strings** recursively:
1. An integer \\(k\\) is represented by a string of \\(0\\)'s and \\(1\\)'s
   preceded by a minus sign "\\(-\\)" if \\(k\\) is negative.
2. If \\(x\\) is a structured string representing the integer \\(k\\), then 
   \\([x]\\) is a structured string that can be used as a "name". (for examples:
   a vertex in a graph, a set element, a city in the traveling salesman problem).
3. If \\(x_1, \dots, x_m\\) are structured strings representing the objects 
   \\(X_1, ..., X_m\\), then \\((x_1, ..., x_m)\\) is a structured string
   representing the sequence \\(< X_1, ..., X_m >\\).

We already know how to encode **integers** and **sequences**.

- A **set** is represented by ordering its elements as a sequence 
  \\(< X_1, ..., X_m >\\) and taking the structured string corresponding
  to that sequence.
- A **graph** with vertex set \\(V\\) and edge set \\(E\\) is represented by a 
  structured string \\((x, y)\\), where \\(x\\) is a structured string 
  representing the set \\(V\\) and \\(y\\) is a structured string representing
  the \\(E\\) (the elements of \\(E\\) being the two-element subsets of \\(V\\)
  that are edges).
- A **finite function**  \\(f: \\{U_1, ..., U_m\\}\rightarrow W\\) is
  represented by a structured string \\(((x_1, y_1), ... ,(x_m, y_m))\\) where
  \\(x_i\\) is a structured string representing the object \\(U_i\\)
  and \\(y_i\\) a structured string representing the object \\(f(U_i)\in W\\)
   , \\(\forall \\ 1\leq i\leq m\\).
- A **rational number** \\(q\\) is represented by a structured string
  \\((x,y)\\) where \\(x\\) is a structured string representing an integer 
  \\(a\\), \\(y\\) is a structured string representing an integer \\(b\\), 
  \\(a/b=q\\), and \\(GCD(a, b)=1\\).

Two structured strings written in the standard encoding schemes can represent
a same object without being strictly the same.

From now on, an encoding scheme is said to be reasonable if it is equivalent 
to the standard encoding scheme, in the sense that there exist polynomial time
algorithms for converting an encoding of an instance back and forth between 
the two encoding schemes.

## Deterministic Turing Machines and the Class P

**Definition**


