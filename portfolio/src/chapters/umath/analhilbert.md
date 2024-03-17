# Analyse Hilbertienne

## Bases Hilbertiennes

**Defintion 9**

Soit \\(H\\) un espace de Hilbert. Une famille \\((u_i)_{i\in I}\in H^I\\) est:

- *Orthonormée* si
  \\( \forall i, j\in I \\ : \\ \langle u_i, u_j \rangle =\delta_{i, j} \\).
- *Totale* si
  \\( H = \overline{Vect(u_i)_{i\in I}} \\).
- Une *base hilbetienne* de \\(H\\) si elle est à la fois totale et orthonormée.

**Proposition 9** Inégalité de Bessel

Soient \\(H\\) un espace de Hilbert et \\((u_n)_{n\in\mathbb{N}}\\) une famille
orthonormée. Pour tout \\(f\in H\\),

\\[
    \sum_{n=0}^{+\infty}{|\langle f, u_n \rangle|^2} \leq ||f||^2.
\\]

**Rappel** Séries à termes orthogonaux

Soient \\((E, || \cdot ||)\\) un \\( \mathbb{K} \\)-espace vectoriel normé et 
\\( (x_n)_{n \in \mathbb{N} } \in E^{ \mathbb{N} } \\). On pose
\\( s_n = \sum\_{k=0}^{n} {x_k} \\).

- La série \\(\sum_{n\geq 0}{x_n}\\) est dite convergente si la suite
  \\((s_n)_{n\in\mathbb{N}}\\) converge dans \\((E, ||\cdot||)\\). La limite
  \\(lim\_{n\rightarrow\infty}\\)