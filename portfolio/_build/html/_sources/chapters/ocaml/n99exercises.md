# Ninety-Nine Problems in Ocaml

Write a function that returns the last element of a list.
```
last : 'a list -> 'a option 
```


```` {dropdown} Show solution

   ```ocaml
    let rec last (l: 'a list): 'a option = 
      match l with
      | [] -> None
      | [e] -> Some e
      | _::tail -> last tail
````