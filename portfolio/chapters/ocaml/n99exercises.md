# Ninety-Nine Problems in Ocaml

**Exercise 1: Tail of a List**

Write a function that returns the last element of a list.
```ocaml
last : 'a list -> 'a option 
```

```` {dropdown} Show solution

   ```ocaml
    let rec last (l: 'a list): 'a option = 
      match l with
      | [] -> None
      | [e] -> Some e
      | _::tail -> last tail
   ```

  **Explanation**

  Here we are defining a recursive function in OCaml.

  Notice the optional type hints. The function takes a (homogenous) list `l` 
  of a generic type `'a` (`'SOMETHING` is OCaml syntax for generic types).

  If the list is empty, we return None, there is no last element.

  If the list contains a single element `e`, return `Some e`.

  Otherwise, discard the first element `_` and call last on the rest of the list.

  `'a option` is OCaml's solution to the billion dollar 
  mistake of the `NullPointerException`. All values in OCaml are non-null.

  The option type allows us to deal with a case where a "null" value would be 
  useful. 

  ```ocaml
  type 'a option = 
  | Some 'a
  | None
  ```

  The compiler will force you to handle `None` values in option types.

  The `e::l` operation appends element `e` to the beginning of the list `l`.
  
  The `match` allows us to perform different action based on the form of the list 
  `l`. It is basically an switch statement on steroids that allows us to 
  deconstruct a value of any type into its possible forms.
  
  The compiler will force you to handle all possible forms of the input type.

````

**Exercise 2: Last Two Elements of a List**

Find the last but one (last and penultimate) elements of a list.

```ocaml
last_two : 'a list -> ('a * 'a) option 
```

```` {dropdown} Show solution

   ```ocaml
    let rec last_two (l: 'a list): ('a * 'a) option = 
      match l with
      | [] 
      | [_] -> None
      | e1::e2::[] -> Some (e1, e2)
      | _::rest -> last_two rest
   ```

  **Explanation**

  Same idea, minor tweaks. We are returing a product type *ie:* tuple.
  
  If the list contains exactly two elements `e1` and `e2`, return the tuple
  `(e1, e2)` wrapped in `Some` (we HAVE to return an option type).
  
  If the list contains 0 or 1 elements, return `None`, we can match both cases
  with one arrow.

  Otherwise if the list contains 3 or more elements, discard the first one
  and call `last_two` on the rest of the list.

````


**Exercise 3: N'th Element of a List**

Find the N'th element of a list.

```ocaml
nth: 'a list -> int -> 'a option
```

```` {dropdown} Show solution

   ```ocaml
   let rec nth (lst: 'a list) (k: int): 'a option = 
     match (k, lst) with 
     | (_, []) -> None
     | (0, x::_) -> Some x
     | (k, _::rest) -> nth rest (k-1)
   ```

   This function still returns `None` for negative values.

````


**Exercise 4: Length of a List**


```
psig
```

```` {dropdown} Show solution

   ```ocaml
      (* solution *)
   ```

  **Explanation**

  pexpl

````



**Exercise n: ptitle**

pdescription

```
psig
```

```` {dropdown} Show solution

   ```ocaml
      (* solution *)
   ```

  **Explanation**

  pexpl

````