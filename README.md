# **CoMake Backend**

[Postman Version](https://documenter.getpostman.com/view/10351511/SzKZtGU3?version=latest#rate-limit "alternative documentation") of documentation is also available.

<!-- **t-o-c** -->
|**Table of Contents:**|
|-|
|[Local Server Installation](#Local-Server-Installation)|
|[Authentication](#Authentication-Routes)|
|[CRUD /issues](#Crud-Issues)|
|[General Routes](#General-Routes)|
|[Future Goals](#Future-Goals)|

---------------------------------


## **Local Server Installation**
For developing and testing puposes, please follow the instructions below to install a version to your local machine.

Installing
1. donwload/clone backend repo
2. navigate to cloned repo
3. install dependencies on your console: `npm i`
4. construct a copy of the data base in console: `knex migrate:latest`*
5. populate database with dummy/seeded data: `knex seed:run` *
6. run the server: `npm run server`. Server port default is 5000.

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

Authenticates user's credentials. Returns JSON object with personalized welcome message and token.

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

A user **MUST** be authenticated in order to access the following end points. 

User authentication token sent in `res.headers.authorization`

### 1. Default route
#### **GET** */api/issues*

Return an array of objects of **ALL** issues created by **ALL** users.

Request: `req.body` 

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
#### **GET** */api/issues/`:id`*

Returns a single issue via the `:id` URL param.

Request: `req.body` 

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

### 3. Edit a specific issue
#### **PUT** */api/issues/`:id`*

Updates an existing issue via the `:id` URL param. Currently, all users can edit all tickets. However, users should not be able to edit the issue's vote count, based on this operation. 


Request: `req.body` 

```
{
	"issue": "Rename the issue",
	"description": "Edit and add to the previous description",
	"city": "Correct the city", 
	"zip": "Correct the zip"
}
```
Response: `res.body`

Returns JSON object with edited values.

```
{
    "id": 2,            // this is the id# of the issue (NOT USER)
    "issue": "New Issue Name",
    "description": "There are EVEN MORE potholes in this road!",
    "vote": 2,               
    "city": "Miami2",
    "zip": "123456",
    "user_id": 2
}
```


### 4. Add new issue
#### **POST** */api/issues/*

Creates a new issue. Vote count defaults to 0. All fields in `res.body` are **required string types**. 

Request: `req.body` 

```
{
	"issue": "New Issue Name",
	"description": "There are stray dogs roaming the streets!",
	"city": "New City", 
	"zip": "New Zip"
}
```
Response: `res.body`

Returns JSON object with user entered values, vote count, issue id and user_id fields.

```
{
    "id": 2,            // this is the id# of the issue (NOT USER)
    "issue": "New Issue Name",
    "description": "There are stray dogs roaming the streets!",
    "vote": 0,          // default value            
    "city": "New City",
    "zip": "New Zip",
    "user_id": 2        // id of the user that created ticket
}
```



[Return to Top](#coMake-backend)

--------------------------------

## General Routes

### 1. Get Users
#### **GET** */api/auth/users*

Fetches all usernames and id# from database. No authentication required.

Request: `req.body` 
 

```
// N/A
```
Response: `res.body`

Returns an array of JSON objects.

```
[
    {
        "id": 2,
        "username": "Ammon"
    },
    {
        "id": 5,
        "username": "Devoughn"
    },
    {
        "id": 4,
        "username": "Michael"
    },
    {
        "id": 1,
        "username": "Nic"
    },
    {
        "id": 6,
        "username": "TEST1"
    },
    {
        "id": 3,
        "username": "Thomas"
    }
]
```


[Return to Top](#coMake-backend)

--------------------------------


## **Future Goals** 
***(Features not yet supported)***

- migrate to Postgres database
  - Back-end does not yet support image storage
  - admin users to remove completed "issue"
  - restrict issues CRUD to be user specific
  - comment features
- retrieve an array of a user's own issues, e.g. GET /api/issues/mine
- patch request to edit issues votes


[Return to Top](#coMake-backend)

-----------------------------------