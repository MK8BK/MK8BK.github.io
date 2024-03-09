# Linear Programming

**General Form of a Linear Program**

\\[
    maximize/minimize \quad c_1x_1 + ... + c_n x_n  \\\\
    subject \quad to \quad a_{11}x_{1} + ... + a_{1n}x_n \quad \leq/=/\geq \quad b_1 \\\\
    \quad\quad\quad\quad\quad a_{21}x_{1} + ... + a_{2n}x_n \quad \leq/=/\geq \quad b_2 \\\\
    ...\\\\
    \quad\quad\quad\quad\quad a_{m1}x_{1} + ... + a_{mn}x_n \quad \leq/=/\geq \quad b_m \\\\
\\]

**Canonical Form of a Linear Program**

\\[
    maximize \quad c_1x_1 + ... + c_n x_n  \\\\
    subject \quad to \quad a_{11}x_{1} + ... + a_{1n}x_n \leq b_1 \\\\
    \quad\quad\quad\quad\quad a_{21}x_{1} + ... + a_{2n}x_n \leq b_2 \\\\
    ...\\\\
    \quad\quad\quad\quad\quad a_{m1}x_{1} + ... + a_{mn}x_n \leq b_m \\\\
    \quad\quad\quad\quad\quad x_1, ... , x_n \geq 0\\\\
\\]


**Standard Form of a Linear Program**

\\[
    maximize \quad c_1x_1 + ... + c_n x_n  \\\\
    subject \quad to \quad a_{11}x_{1} + ... + a_{1n}x_n = b_1 \\\\
    \quad\quad\quad\quad\quad a_{21}x_{1} + ... + a_{2n}x_n = b_2 \\\\
    ...\\\\
    \quad\quad\quad\quad\quad a_{m1}x_{1} + ... + a_{mn}x_n = b_m \\\\
    \quad\quad\quad\quad\quad x_1, ... , x_n \geq 0\\\\
\\]


**The Simplex Method**

Start with a linear problem in canonical form.


\\[
    maximize \quad c_1x_1 + ... + c_n x_n  \\\\
    subject \quad to \quad a_{11}x_{1} + ... + a_{1n}x_n \leq b_1 \\\\
    \quad\quad\quad\quad\quad a_{21}x_{1} + ... + a_{2n}x_n \leq b_2 \\\\
    ...\\\\
    \quad\quad\quad\quad\quad a_{m1}x_{1} + ... + a_{mn}x_n \leq b_m \\\\
    \quad\quad\quad\quad\quad x_1, ... , x_n \geq 0\\\\
\\]

Transform it into standard form by introducing \\((w_1, ..., w_m)\\) slack variables.

\\[
    maximize \quad \zeta = c_1x_1 + ... + c_n x_n  \\\\
    subject \quad to \quad a_{11}x_{1} + ... + a_{1n}x_n + w_1 = b_1 \\\\
    \quad\quad\quad\quad\quad a_{21}x_{1} + ... + a_{2n}x_n + w_2 = b_2 \\\\
    ...\\\\
    \quad\quad\quad\quad\quad a_{m1}x_{1} + ... + a_{mn}x_n + w_m = b_m \\\\
    \quad\quad\quad\quad\quad x_1, ... , x_n, w_1, ... , w_m \geq 0\\\\
\\]

Initial dictionary:

\\[
    (x_1, ... , x_n, w_1, ... , w_m) = (x_1, ... , x_n, x_{n+1}, ... , x_{n+m})\\\\
    \zeta = \sum_{j=1}^{n}{c_jx_j}
\\]
