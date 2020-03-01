# **CoMake Backend**

[Postman Version](https://documenter.getpostman.com/view/10351511/SzKZtGU3?version=latest#rate-limit "alternative documentation") of documentation is also available.

<!-- **t-o-c** -->
|**Table of Contents:**|
|-|
|[Local Server Installation](#Local-Server-Installation)|
|[Authentication](#Authentication-Routes)|
|[CRUD /issues](#Crud-Issues)|
|[General](#General-Routes)|
|[Future Goals](#Future-Goals)|
---------------------------------

## **Authentication Routes**

### 1. User Registration
#### **POST** */api/auth/register*

Registers a new user account on database.

Request: `req.body` 

```
{
  username: "test1",        // String Requried
  password: "Test123"!      // String Requried
}
```
Response: `res.body`
```
{
  "id": 6,
  "username": "test1"      
}
  // password not returned, but is stored encypted on database.
```

[Return to Top](#coMake-backend)

### 2. User Login
#### POST /api/auth/login

Authenticates user's credentials. Returns JSON object with personalized welcomemessage and token.

Request: `req.body` 

```
{
  username: test1,        // String Requried
  password: Test123!      // String Requried
}
```
Response: `res.body`
```
{
    "message": "Welcome TEST1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6IlRFU1QxIiwiaWF0IjoxNTgzMDg1MjQ4LCJleHAiOjE1ODMwODg4NDh9.dSaZfJ9cGPAJYmgoIoZ-hrQPEXQeiMEs4ckOJDEgliw"
}
```

[Return to Top](#coMake-backend)

--------------------------------

## **CRUD /issues**

### 1. Default route
#### **GET** */api/auth/issues*

Return an array of objects of **ALL** issues created by **ALL** users.

Request: `req.headers` 

```
// N/A
```
Response: `res.body`
```
[
    {
        "id": 1,            // this is the id# of the issue (NOT USER)
        "issue": "issue1",
        "description": 
          "There are shoes hanging from the power cables near my house",
        "vote": 1,
        "city": "New york",
        "zip": "123456",
        "user_id": 1
    },
    {
        "id": 2,            // this is the id# of the issue (NOT USER)
        "issue": "issue2",
        "description": "There are so many potholes in this road!",
        "vote": 2,
        "city": "Miami2",
        "zip": "123456",
        "user_id": 2
    }, 
    // ... etc.
]
```

### 2. Access single issue
#### **GET** */api/auth/issues/:id*

Request: `req.headers` 

```
// N/A
```
Response: `res.body`
```
{
    "id": 2,            // this is the id# of the issue (NOT USER)
    "issue": "issue2",
    "description": "There are so many potholes in this road!",
    "vote": 2,
    "city": "Miami2",
    "zip": "123456",
    "user_id": 2
}
```

### 2. Edit a specific issue
#### **PUT** */api/auth/issues/:id*



### 4. Add new issue
#### **GET** */api/auth/issues/*





[Return to Top](#coMake-backend)

--------------------------------



## **Future Goals** 

- migrate to Postgres database
  - Back-end does not yet support image storage
  - admin users to remove completed "issue"
- retrieve an array of a user's own issues, e.g. GET /api/issues/mine

(Currently no support)

[Return to Top](#coMake-backend)

-----------------------------------