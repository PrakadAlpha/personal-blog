---
path: regex-cheatsheet
date: 2020-05-09T04:52:46.243Z
title: Regex Basics Javascript Cheatsheet
description: "Basic usage of REGEX concepts and references in javascript "
---
## Introduction 

  - Regex are the most commonly used ways for pattern matching, searching and replacing
  - Below are some of the most commonly used regex concepts explained in simplest way possible.
  - For more advanced expressions and explanation below are some [links](#refer) that might help.

## Creating a REGEX expression:

  - Regex Constructor

      ```let regex = new RegExp(pattern[, flags]);```
  - Regex Literal ➡ Starts and Ends with / 

      ```let ex = /hello/```
  
## Flags:
  
  - `i` ➡ Case insensitive
  - `g` ➡ Global matching
  - `m` ➡ Multi-line search.
  - `s`	➡ Allows . to match newline characters. 
  - `u`	➡ Unicode
  - `y`	➡ Sticky search that matches starting at the current position in the target string.(uses `lastIndex`)
    
  ## Methods:
  
  - `ex.exec('hellowolrd')` ➡ Returns the index in array or null

      ```
      const myRe = /(?!a)\w/g;
      let myArray;
      while( (myArray = myRe.exec('appf apsnds aabb')) !== null){
        console.log(myArray);
      }

      //Output
      [ 'dbbd', index: 1, input: 'cdbbddbbdsbz', groups: undefined ]
      [ 'dbbd', index: 5, input: 'cdbbddbbdsbz', groups: undefined ]
      ```

  - `ex.test('phrase')` ➡ Tests and returns `true` or `false`
  - `phrase.match(ex)` ➡ Same like `exec` but returns the matches in array without looping for `g`  flags.
    ```
    const myRe = /db+d/g;
    let myArray
    myArray = 'cdbbddbbdsbz'.match(myRe) 
    console.log(myArray)
    //Output
    [ 'dbbd', 'dbbd' ]
    ```
  - `phrase.search(ex)` ➡ Returns the index of the match else -1
  - `phrase.replace(ex, 'newPhrase')` ➡ Returns string with replaced value
  
  ## Symbols:
  
   - `^` ➡ Anything that starts with => `/^h/`
   - `$` ➡ anything that ends with => `/world$/ `  
   Ex - `/^hello$/` ➡ Must start with hello and end with hello
   - `.` ➡ matches any one char
   - `*` ➡ matches any 0 or more times
   - `?` ➡ optional char => `/gre?a?y/` =>  e or a or none
   - `+` ➡ one or more
  
  ## Brackets::
  
   - `[]` used for char set ➡ `/gr[ea]y/` ➡ must be a or e
   - `[^]` used for exception ➡ `/[^gf]ray/` ➡ must not be g or f
   - `[a-zA-Z0-9]` used for range ➡ `/[A-Z]ray/` ➡ anything in that range
   
   - `{}` ➡ Quantifiers, Used to restrict the number of elements  

          `/re{2}g/` ➡ 2 e's are allowed  
          `/re{2,4}g/` ➡ 2 to 4 e's are allowed   
          `/re{2,}g/` ➡ atleast 2 times e
   - `()` ➡ Used for grouping, also `$1$2` (while replacing) or `\1\2` can be used for specifying the groups in same statement
   
 ## Shorthands:
  
   - `\w` => word char or `_`(underscore)
   - `\W` => non-word char
   - `\d` => any digit
   - `\D` => any non-digit
   - `\s` => any space
   - `\S` => any non space
   - `/hell\b/` => word boundary(only that word) `hello` wont pass    

       `\w` matches a, b, c, d, e, and f in "abc def"  
       `\b` matches the (zero-width) position before a, after c, before d, and after f in "abc def"

   
  ## Lookaheads:
  
   Positive - `/s(?=y)/` ➡ s followed by y  
   Negative - `/s(?!y)/` ➡ s not followed by y

## <div id="refer">References:</div>

- Most used expressions are given above for deeper regex refer below links:-

  - [Regex CheatSheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/)
  - [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  - [Commonly used patterns](https://digitalfortress.tech/tricks/top-15-commonly-used-regex/)

## Platforms for Practice:

  - [regexr.com](https://regexr.com/)
  - [FreeCodeCamp]
(https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/)
 