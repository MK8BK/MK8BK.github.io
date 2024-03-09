# Reduction des Endomorphismes

Soit \\(\mathbb{K}\\) un corps.

Soit \\(E\\) un \\(\mathbb{K}\\)-espace vectoriel.

Soit \\(u: E \rightarrow E\\) un endomorphisme de \\(E\\).


---
**Definition 1** 

Un sous-espace vectoriel \\(F\\) de \\(E\\) est dit stable par \\(u\\) si
 \\(u(F)\subset F\\). 

---

---
**Proposition 1** 

Si les endomorphismes \\(u\\) et \\(v\\) de \\(E\\) commutent,
 *c'est a dire si* \\(u\circ v = v\circ u\\)
, alors \\(Ker(v)\\) et \\(Im(v)\\) sont stables par \\(u\\).

---


---
**Proposition 2** 

Si \\(F\\) est un sous-espace vectoriel de \\(E\\) 
engendré par une famille \\((e_i)_{i \in I}\\),
alors \\(F\\) est stable par \\(u\\) ssi:
\\[\forall i \in I\quad u(e_i) \in F.\\]

---


---
**Corollaire 3: traduction matricielle de la stabilité** 

Soit \\(F\\) un sous-espace vectoriel de \\(E\\) de dimension \\(p\\) et
\\(\mathcal{B}=(e_1, ..., e_n)\\)
une base de E adaptée a \\(F\\), c'est a dire telle que 
\\(\mathcal{B}' = (e_1, ..., e_p)\\) soit une 
base de \\(F\\).

Alors \\(F\\) est stable par \\(u\\) ssi sa matrice dans la base
\\(\mathcal{B}\\) est de la forme
\\(\begin{pmatrix}A & C\\\\0 & B\end{pmatrix}\\), 
avec \\(A\in \mathcal{M}_p(\mathbb{K})\\).

Dans ce cas, \\(A\\) est la matrice dans la base 
\\(\mathcal{B}'\\) de l'endomorphisme induit \\(u_F\\).

---


---
**Definition 3** 

1. On dit que \\(\lambda \in \mathbb{K}\\) est **valeur propre**
   de \\(u\\) s'il existe un vecteur non nul \\(x \in E\\) tel que
   \\(u(x) = \lambda x\\), c'est a dire si l'endomorphisme 
   \\(u - \lambda Id_E\\) est non injectif.
2. On dit que \\(x \in E\\) est **vecteur propre**
   de \\(u\\) associee a la valeur propre \\(\lambda\in\mathbb{K}\\) 
   s'il est non nul et vérifie \\(u(x)=\lambda x\\).
3. Si \\(\lambda \in \mathbb{K}\\) est valeur propre de \\(u\\), 
   le **sous-espace propre** de \\(u\\) associé a la valeur propre \\(\lambda\\)
   est: \\[E_\lambda (u)=Ker(u-\lambda Id_E)=
   \\{x\in E : u(x)=\lambda x\\}.\\]

---

---
**Definition 4** 

Le spectre d'un endomorphisme d'un espace de dimension finie
est l'ensemble de ses valeurs propres.

---

---
**Proposition 5**

Si les endomorphismes \\(u\\) et \\(v\\) commutent, 
c'est a dire si \\(u\circ v = v\circ u\\), alors les sous-espaces propres
de l'un sont stables par l'autre.

---

---
**Proposition 6**

- Si \\(\lambda_1, ..., \lambda_p\\) sont des valeurs propres deux a deux
  deux distinctes de \\(u\\), alors les sous-espaces propres associés 
  \\(E_{\lambda_1}(u), ..., E_{\lambda_p}(u)\\) sont en somme directe.
- Toute famille de vecteurs propres associés a des valeurs propres deux a deux 
  distinctes est libre.

---

---
**Corollaire 7**

Si \\(E\\) est de dimension finie et si \\(\lambda_1, ..., \lambda_p\\) sont
des valeurs propres deux a deux distinctes de \\(u\\), alors:
\\[
    \sum_{i=1}^{p}{dim(E_{\lambda_i} (u))} \leq dim(E)
\\]

---

---
**Corollaire 8**

Un endomorphisme d'un espace vectoriel de dimension \\(n\\) a au plus \\(n\\)
valeurs propres distinctes.

---
