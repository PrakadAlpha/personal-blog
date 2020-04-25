---
path: auth&auth
date: 2020-04-25T07:38:09.710Z
title: Sessions Auth & Auth
description: '" Ways to handle Sessions in Node Express and Security Pre-cautions "'
---
When i started to work with authentication i was confused to hell and went through some articles and here is the concise explanation on managing sessions particularly in NodeJS or any backend, lets get started..!

## 🔥Latest methods Used For Auth Management in Node🔥

- `express-session` [npm package](https://www.npmjs.com/package/express-session) provides an extensive support for session management with external memory adapters
- `jsonwebtoken` [npm package](https://www.npmjs.com/package/jsonwebtoken) provides methods to implement JWT token based authentication.
- `passportjs` [library](http://www.passportjs.org/) has different types of strategies and also facebook, google and other OAuth support, can also be combined with `express-session`.


# Introduction

A basic clarification on Authentication and Authorization


 - **Authentication**: Verifying the *Identity* (`401 Unauthorized`)  
 - **Authorization**: Handling the *Permissions* (`403 Forbidden`)

  There are two ways to handle these in web applications.
  
  - Stateful (Using `session` and `cookies`)method 
  - Stateless (`jwt` tokens and `OAuth`). 

# Stateful

- User sessions are managed by the server using a session store like Redis or MongoDB
- Each user has own Session Id to be verified.
- Client and Server are dependent(stateful)

### 🔀 Flow

1. User submits login credentials
2. Server verifies the user against the DB and creates a temporary user session
3. Server issues a cookie with a session ID
4. User sends the cookie with each request
5. Server validates it with the session store and provides access
6. When user logs out, server destroys the session and clears the cookie

## 🍪 Cookies

  - Cookies are list of key value pairs and flags for protection

  - Cookies are set in the server on the login request and sent to the client using the `Set-Cookie` header in the response and there after 
sent from the client for all the requests to identify the user.
  - *Server ➡ Client*
```
          HTTP/2.0 200 OK
          Content-type: text/html
          Set-Cookie: sessionId=12randomid45
```
 - *Client ➡ Server*
```
          GET /sample_page.html HTTP/2.0
          Host: www.example.org
          Cookie: sessionId=12randomid45;
```

- ### Options used in the cookies are as follows:
  
  - `Secure` ➡ Used to tell the browser to send cookies over https only.
  - `HttpOnly` ➡ Makes the cookies accesible only in the server, client side js cannot access it using document.cookie.
  - `SameSite` ➡ Blocks cross origin request(none, strict, lax)
  - `Domain and Path` ➡ These can be changes accordingly for security
  - `Expires or Max-Age` ➡ This is used to persist the cookie for the specified time

- ### Pros & Cons of Cookies
  Cons
   - Cookies are vulnerable to CSRF(Cross Site Request Forgery) but can be protected.
   - Server must store each user session in memory
   - Horizontal scaling is more challenging risk of single point failure, need sticky sessions with load balancing  

  Pros
   - Session IDs are vague and has no meaningful data
   - Cookies can be secured with relativly new flags (SameSite, http-only)
   - HttpOnly cookies mitigate XSS exploits
   - SameSite cookies protects against CSRF
   - 20+ years of usage 

# Stateless

 - Session is managed on the client side by storing the signed token in the browser  `localStorage` or `sessionStorage` 
 - Client and Server are decoupled(stateless)

### 🔀 Flow

 - User submits login credentials
 - Server verifies the user against the DB
 - Sever generates a signed token with a secret and embeds user data and send the token in header(Usually sent in `Authorization` header)
 - User stores the token in client storage(`localStorage` or `sessionStorage`)
 - User sends the token along with each request and server verifies the token and provides access.
 - When user logs out, token is cleared from the "client"
   
## 🎟 JSON Web Token

 - Consist of three parts

     - Header(Algorithm & token type)  
     - Payload(data)  
     - Signature(Verification Sign)

 - Server doesn't keep track of the user session, it only needs the token for providing access

 - Example:
```
          HTTP/1.1 200 OK
          Content-type: application/json
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0.WDKey8WGO6LENkHWJRy8S0QOCbdGwFFoH5XCAR49g4k 
```
  
   - ### Stateful JWT  
     - Only user reference (userId) is embedded in the token
     - Server uses ref in the token to retrieve user from the DB
     - Sent as an HTTP-only cookie (Set-Cookie header)
     - Sent along with X-CSRF-TOKEN cookie
     - No user sessions stored on the server
     - Revoked tokens still needs to be persisted

- ### Pros & Cons of JWT Auth
  Cons
   - Server has to maintain blacklist of revoked tokens (whitelist of active user tokens is secure).  
   - Tokens stored in client storage are vulnerable to XSS
   - While scaling secret's must be shared across server's

  Pros
   - Server does not need to keep track of user sessions
   - Horizontal scaling is easy possible
   - FrontEnd and BackEnd are decoupled
   - Operational even if cookies are disabled

# 🔐 Security Handling

 - XXS   

    ➡ Do not store tokens in clientStorage  
    ➡ Use `httpOnly` on cookie to mitigate 
 
- CSRF  

    ➡ Use X-CSRF-TOKEN header   
    ➡ Use `sameSite` on cookie with `lax` to mitigate(relativly new, less browser support)

- Use `helmet` [npm package](https://www.npmjs.com/package/helmet) provides inbuilt headers for increased protection

- Use `cors` [npm package](https://www.npmjs.com/package/cors) for handling cors issues

- Always use double round and strong encryption mechanism for token and cookies(*More on this soon..*)

# 🤔My Thought
   __*" Sessions are probably better suited for web applications.."*__

## Why not JWT?

 - Server state needs to be maintained regardless of jwt.
 - Sessions can be easily extended and invalidated.
 - Data is secured server side & doesn't leak through XSS.
 - CSRF is easier to mitigate than XSS.
 - Data never goes stale (always in sync with DB)
 - Sessions are generally easier to set up & manage.  


🗒__*Methods on overcoming the issues in JWT using `refresh_tokens` will be blogged soon..!!*__🗒

# 📓*References*
- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
- [XXS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)