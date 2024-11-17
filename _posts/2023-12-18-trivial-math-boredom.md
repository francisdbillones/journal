---
layout: post
title: trivial math boredom
---

![](/assets/images/trivial-math-boredom/saint-lucy.png)

Let's say you wanted to compute for the following integral:

<div>
$$\begin{aligned}
\int sin^Nx \, \mathrm{d}x
\end{aligned}$$
</div>

where <span> $$N = 2n + 1, n \in \mathbb{Z}$$</span>. In English, you want to get the integral of the sine function raised to an odd integer power.

First, we have to represent the integrand in a form wherein we can perform [u-substitution](https://en.wikipedia.org/wiki/Integration_by_substitution). We can do so by separating one of the sines in the exponential:

<div>
$$\begin{aligned}
\int \sin^{2n+1}x \, \mathrm{d}x = \int \sin^{2n}(x)\sin(x) \, \mathrm{d}x
\end{aligned}$$
</div>

and then, using the identity <span>$$\sin^{2}x = 1 — \cos^{2}x$$</span>:

<div>
$$\begin{aligned}
\int \sin^{2n}(x)\sin(x) \, \mathrm{d}x =
\int (\sin^{2}(x))^{n}\sin(x) \, \mathrm{d}x =
\int (1-\cos^{2}(x))^{n}\sin(x) \, \mathrm{d}x
\end{aligned}$$
</div>

Then, we can set <span>$$u = \cos x, \mathrm{d}u = -\sin{x}\mathrm{d}x$$</span>:

<div>
$$\begin{aligned}
\int (1-\cos^{2}(x))^{n}\sin(x) \, \mathrm{d}x =
-\int (1-u^{2})^{n} \, \mathrm{d}u
\end{aligned}$$
</div>

Now, you can stop here, but I didn't. I wanted to get a closed form solution (or rather, as close to closed form as possible).
<details closed>
<summary>On the use of "closed form"</summary>
I'm well aware that "closed form" is not the appropriate term here, but I wanted to use it to express the idea of a solution that is simply plug-and-play. Leaving the integral as is would require extensive work for N > 2.

As for "extensive work", I mean something that requires a CAS to do more than just simple integer multiplication.
</details>
<br>

Conveniently enough, since <span>$$(1 — u^2)^n$$</span> is a binomial, we can simply use the binomial theorem:

<div>
$$\begin{aligned}
(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k
\end{aligned}$$
</div>

For our binomial <span>$$(1 — u^2)^n$$</span>, <span>$$x$$</span> would correspond to $$1$$, and $$y$$ would correspond to $$-u^2$$:

<div>
$$\begin{aligned}
(1 -u^{2})^n = \sum_{k=0}^{n} \binom{n}{k} 1^{n-k} (-u^2)^k
\end{aligned}$$
</div>

which, when using the formula $$\binom{n}{k} = \frac{n!}{k!(n-k)!}$$, as well as removing the redundant $$1^{n-k}$$ (as 1 raised to any integer is 1), results in:

<div>
$$\begin{aligned}
(1 -u^{2})^n = \sum_{k=0}^{n} \frac{n!}{k!(n-k)!} (-u^2)^k
\end{aligned}$$
</div>

As this is simply the expansion of a binomial, which is a summation of terms each with a real coefficient and $$u$$ raised to an integer power, when we substitute this back into the integral, we can simply use the power rule of integration:
<div>
$$\begin{aligned}
\int \sum_{k=0}^{n} \frac{n!}{k!(n-k)!} (-u^2)^k \, \mathrm{d}u
=
\sum_{k=0}^{n} \frac{n!}{k!(n-k)!(2k+1)} (-u^2)^{k+1}
\end{aligned}$$
</div>

and there we have it. An expression for $$\int sin^Nx \, \mathrm{d}x$$ that requires nothing more than simple arithmetic.
