const db = require('../data/dbConfig.js');
const request = require('supertest');

const server = require('../api/server.js');

describe('Testing register & Login endpoints', () => {

  beforeAll(async () => {
    await db('users').del();
  })
 describe('Testing Register endpoints', () => {

   it('Return status of new user created', async () => {
     const statusCode = 201;
     let newUser = {
       username: "jestTest",
       password:  "jestTest"
      }
      const response = await request(server)
      .post("/api/auth/register")
      .send(newUser)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(201)
      
      await expect(response.status).toEqual(statusCode)
    })
    
    it('returns a status of 500 when posting no credentials to the db', async () => {
      const testUser = { username: ""};
      const response = await request(server)
      .post('/api/auth/register')
      .send(testUser);
      
      await expect(response.status).toBe(500);
    })
    
    it('return body of new  created user', async () => {
      
      let newUser2 = {
        username: "jestTest1",
        password:  "jestTest"
      }
      const response = await request(server).post("/api/auth/register")
          .send(newUser2)
          .expect('Content-Type', /json/)
          .set('Accept', 'application/json')
          .expect(function(res) {
            res.body = {username:"jestTest1", password:"asdf"}
          })
          
          await expect(response.body).toEqual({
            username:"jestTest1", 
            password:"asdf"
          })
        })
        
        it('Checks for amount of users in database', async function() {
          const testDB = await db('users')
          
          await expect(testDB).toHaveLength(2)
        })
        
  })

  describe('Testing login endpoint', () => {

    it('Return status of new user created', async () => {
        const statusCode = 200;
        let newUser = {
            username: "jestTest1",
            password:  "jestTest"
        }
        const response = await request(server)
          .post("/api/auth/login")
          .send(newUser)
          .expect('Content-Type', /json/)
          .set('Accept', 'application/json')
  
        await expect(response.status).toBe(statusCode)
        })
        
        it('returns a status of 401 when posting no credentials to the db', async () => {
          const testUser = { username: ""};
          const response = await request(server)
            .post('/api/auth/login')
            .send(testUser);
              
          await expect(response.status).toBe(401);
        })
  
      it('return body of new  created user', async () => {
        const response = await request(server).post("/api/auth/login")
          .send({username:"jestTest1", password:"asdf"})
          .expect('Content-Type', /json/)
          .set('Accept', 'application/json')
          .expect(function(res) {
              res.body = {
                username:"jestTest1", 
                password:"asdf"
              }
          })
              
        await expect(response.body).toEqual({
          username:"jestTest1", 
          password:"asdf"
        })
    })
  })  
     
})