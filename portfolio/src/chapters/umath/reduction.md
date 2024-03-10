# Reduction des Endomorphismes

<!-- <details> -->
<!-- <summary>**Cours**</summary> -->

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

---
**Proposition 9**

Si \\(F\\) est un sous-espace vectoriel de \\(E\\) stable par \\(u\\),
les valeurs propres de l'endomorphisme \\(u_F\\) induit par \\(u\\) sur \\(F\\)
sont les valeurs propres \\(\lambda\\) telles que 
\\(E_\lambda(u)\cap F \neq \\{0\\}\\). On a alors: 
\\[E_\lambda(u_F) = E_\lambda(u)\cap F.\\]

---

---
**Proposition 10**

Si \\(f\\) est un endomorphisme de \\(E\\) et si \\(\mathcal{B}\\) et 
\\(\mathcal{B}'\\) sont deux bases de \\(E\\), alors les matrices \\(M\\) et
\\(M'\\) de \\(f\\) respectivement dans les bases \\(\mathcal{B}\\) et 
\\(\mathcal{B}'\\) sont reliés par: \\[M' = P^{-1}MP,\\]
ou \\(P\\) est la matrice de passage de \\(\mathcal{B}\\) a \\(\mathcal{B}'\\).

---


---
**Definition 5**

Deux matrices \\(A\\) et \\(B\\) sont semblables s'il existe 
\\(P\in GL_n(\mathbb{K})\\) telle que \\(B=P^{-1}AP\\).

---

---
**Proposition 11**


Deux matrices 
\\(M\\) et \\(M'\\) 
de \\(\mathcal{M}_n (\mathbb{K})\\) sont
semblables ssi elles representent le meme endomorphisme de 
\\(\mathbb{K}^n\\),
c'est a dire s'il existe \\(\mathcal{B}\\) et \\(\mathcal{B}'\\) deux
bases de \\(\mathbb{K}^n\\) et \\(f\in \mathcal{L}(\mathbb{K}^n)\\) telles que:

\\[
    M=Mat_{\mathcal{B}}(f) \quad et \quad M'=Mat_{\mathcal{B}'}(f).
\\]

---

---
**Proposition 12**

Deux matrices semblables ont meme trace et meme determinant.

---


---
**Definition 6**

Soit \\(A\in \mathcal{M}_n(\mathbb{K})\\)

1. On dit que \\(\lambda\in\mathbb{K}\\) est valeur propre de \\(A\\) s'il
   existe une matrice colonne \\(X\in\mathcal{M}_{n,1}(\mathbb{K})\\) 
   *non nulle* telle que \\(AX=\lambda X\\).
2. On dit que la matrice colonne \\(X\in \mathcal{M}_{n,1}(\mathbb{K})\\) est
   vecteur propre de \\(A\\) associée a la valeur propre
   \\(\lambda\in\mathbb{K}\\) si elle est non nulle et vérifie \\(AX=\lambda X\\).
3. Si \\(\lambda\in\mathbb{K}\\) est valeur propre de \\(A\\), le sous-espace 
   propre de \\(A\\) associée a la valeur propre \\(\lambda\\) est:
   \\[E_\lambda (A)=Ker(A-\lambda I_n)=
   \\{X\in \mathcal{M}_{n,1}(\mathbb{K}): AX=\lambda X\\}.\\]
4. L'ensemble des valeurs propres de \\(A\\) est appelé le **spectre** de \\(A\\)
   et noté \\(sp(A)\\).

---

---
**Proposition 13**

Soit \\(A\\) une matrice représentant l'endomorphisme \\(u\\) dans une base 
\\((e_1, ..., e_n)\\). On a alors \\(sp(A)=sp(u)\\) et, pour tout
\\(\lambda\in sp(u)\\):
\\[
    x = \sum_{i=1}^{n}{x_i e_i} \in E_\lambda (u) \iff X=
    \begin{bmatrix}
    x_1 \\\\
    \vdots \\\\
    x_n \\\\
    \end{bmatrix}
    \in E_\lambda (A).
\\]

---

---
**Corollaire 14**

Deux matrices semblables ont meme spectre et les sous-espaces propres 
associés sont de meme dimension.

---

---

**Proposition 15**

Soit \\(\mathbb{K}'\\) un sous-corps du corps \\(\mathbb{K}\\) et 
\\(A\in\mathcal{M}_n(\mathbb{K}')\\). Alors 

\\[sp_{\mathbb{K}'}(A) \subseteq sp_{\mathbb{K}}(A)\\]

---


---
**Proposition 16**

Soit \\(A\in \mathcal{M}_n(\mathbb{R})\\). Si \\(\lambda\in sp\_\mathbb{C}(A)\\)
, alors \\(\overline\lambda\\) est valeur propre de \\(A\\) et:

\\[
    X\in E_\lambda (A) \iff \overline X \in E_{\overline\lambda}(A).
\\]

Si \\((X_1, ..., X_k)\\) est une base de \\( E_\lambda (A) \\) alors 
\\((\overline X_1, ..., \overline X_k)\\) est une base de
\\( E_\overline\lambda (A) \\) donc 
\\(dim(E_\lambda (A))=dim(E_\overline\lambda (A))\\).

---

---
**Definition 7**

Soit \\(u\in\mathcal{L}(E)\\) et 
\\(P=\sum_{k=0}^{p}{a_k X^k} \in\mathbb{K}[X]\\).

On note \\(P(u)\\) l'endomorphisme de \\(E\\) defini par:

\\[
    P(u) = \sum_{k=0}^{p}{a_k u^k} .
\\]

Pour \\(A\in \mathcal{M}_n (\mathbb{K})\\), on definit de meme la matrice 
\\(P(A)\in\mathcal{M}_n (\mathbb{K})\\) par:

\\[
    P(A) = \sum_{k=0}^{p}{a_k A^k} .
\\]

---
**Proposition 17**

Pour tout \\((P, Q)\in\mathbb{K}[X]^2\\), les endomorphismes \\(P(u)\\) et 
\\(Q(u)\\) commutent. En particulier, pour tout \\(P\in\mathbb{K}[X]\\),
\\(Im(u)\\) et \\(Ker(u)\\) sont des sous-espaces stables par \\(u\\).

---
**Proposition 18**

1. Si \\(x\in E_\lambda (u)\\) et si \\(P\in\mathbb{K}[X]\\) alors 
   \\(P(u)(x) = P(\lambda) x\\).
2. En particulier, si \\(\lambda\\) est valeur propre de \\(u\\),
   alors \\(P(\lambda)\\) est valeur propre de \\(P(u)\\) et tout vecteur propre
   de \\(u\\) associé a la valeur propre \\(\lambda\\) est vecteur propre de 
   \\(P(u)\\) associé la valeur propre \\(P(\lambda)\\).

---
**Corollaire 19**

Soit \\(A\in\mathcal{M}_n(\mathbb{K})\\).

1. Si \\(X\in E_\lambda(A)\\) et si \\(P\in \mathbb{K}[X]\\) alors 
   \\(P(A)X=P(\lambda)X\\).
2. En particulier, si \\(\lambda\\) est valeur propre de \\(A\\),
   alors \\(P(\lambda)\\) est valeur propre de \\(P(A)\\) et tout vecteur propre
   de \\(A\\) associé a la valeur propre \\(\lambda\\) est vecteur propre de 
   \\(P(A)\\) associé la valeur propre \\(P(\lambda)\\).

---

---
**Definition 8**

On dit que \\(P\in\mathbb{K}[X]\\) est un polynome annulateur de \\(u\\), s'il
vérifie \\(P(u)=0\\).

On dit que \\(P\in\mathbb{K}[X]\\) est un polynome annulateur de \\(A\\), s'il
vérifie \\(P(A)=0\\).

---

---
**Proposition 20**

Si \\(P\\) est un polynome annulateur de \\(u\in\mathcal{L}(E)\\), alors
toute valeur propre de \\(u\\) est racine de \\(P\\).

---

---
**Corollaire 21**

Si \\(P\\) est un polynome annulateur de \\(A\in\mathcal{M}_n(\mathbb{K})\\),
alors toute valeur propre de \\(A\\) est racine de \\(P\\).

---

---
**Corollaire 22**

Si \\(P\\) est un polynome annulateur de \\(u\\) tel que \\(P(0)\neq 0\\) et si
\\(E\\) est de dimension finie, alors \\(u\\) est bijectif.

---

---
**Corollaire 23**

Si \\(P\\) est un polynome annulateur de \\(A\\) et si \\(P(0)\neq 0\\), alors
\\(A\\) est inversible.

---


---
**Definition 9**

Soit \\(A\in\mathcal{M}_n(\mathbb{K})\\). On appelle polynome caracteristique de 
\\(A\\) et on note \\(\chi_A(X)\\) l'unique polynome tel que:

\\[
    \forall \lambda \in \mathbb{C} \quad \chi_A(\lambda) = det(\lambda I_n - A).
\\]

On note alors \\(\chi_A(X)=det(XI_n-A)\\).

---

---
**Theoreme 24**

\\(\lambda\in\mathbb{K}\\) est valeur propre de \\(A\\) si et seulement s'il est
racine du polynome caracteristique de \\(A\\).

---

---
**Proposition 25**

Si \\(A\in\mathcal{M}_n(\mathbb{K})\\) est triangulaire de diagonale
\\((\alpha_1, ..., \alpha_n)\\), alors son polynome caracteristique est:
\\(\prod\_{k=1}^{n}{(X-\alpha\_k)}\\) et \\(sp(A)=\\{\alpha_1,...,\alpha_n\\}\\).

---

---
**Corollaire 26**

Soit \\(A\in\mathcal{M}_n(\mathbb{k})\\).
- Si \\(\mathbb{K}=\mathbb{C}\\), alors \\(A\\) a au moins une valeur propre.
- Si \\(\mathbb{K}=\mathbb{R}\\) et si \\(n\\) est impair, alors \\(A\\)
  a au moins une valeur propre.

---

---
**Proposition 27**

Soit \\(A\in\mathcal{M}_n(K)\\). Son polynome caracteristique \\(\chi_A\\) est
un polynome unitaire de degré \\(n\\) et l'on a :

\\[
    \chi_A(X) = X^n - (Tr(A))X^{n-1} + ... + (-1)^ndet(A).
\\]

---

---
**Lemme 28**

Deux matrices semblables ont meme polynome caracteristique.

---

---
**Définition 10**

On appelle polynome caractéristique de l'endomorphisme \\(u\\) et l'on note 
\\(\chi_u\\), le polynome caractéristique de toute matrice représentant \\(u\\).

On a donc, pour tout scalaire \\(\lambda\\),
\\(\chi_u(\lambda)=det(\lambda Id_E - u)\\).

---

---
**Proposition 29**

Le polynome caracteristique \\(\chi_u\\) est unitaire de degré \\(n\\) et l'on a :

\\[
    \chi_u(X) = X^n - (Tr(u))X^{n-1} + ... + (-1)^ndet(u).
\\]

---

---
**Theoreme 30**

\\(\lambda\in\mathbb{K}\\) est valeur propre de \\(u\\) si et seulement s'il est
racine du polynome caracteristique de \\(u\\).

---

---
**Corollaire 31**

- Si \\(\mathbb{K}=\mathbb{C}\\), alors \\(u\\) a au moins une valeur propre.
- Si \\(\mathbb{K}=\mathbb{R}\\) et si \\(n\\) est impair, alors \\(u\\)
  a au moins une valeur propre.

---

---
**Proposition 32**

Si \\(F\\) est un sous-espace vectoriel de \\(E\\) stable par \\(u\\), alors
le polynome caracteristique \\(\chi_{u_F}\\) de l'endomorphisme induit par 
\\(u\\) sur \\(F\\) divise \\(\chi_u\\).

---

---
**Proposition 33**

Si le polynome caracteristique de \\(u\\) est scindé (respectivement scindé a 
racines simples), alors celui de l'endomorphisme induit par \\(u\\) sur tout 
sous-espace vectoriel de \\(E\\) stable par \\(u\\) l'est aussi.

---

<!-- </details> -->