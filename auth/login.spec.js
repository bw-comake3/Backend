const db = require('../data/dbConfig.js');
const request = require('supertest');

const server = require('../api/server.js');

describe('Testing login endpoint', () => {
 
  it('Return status of new user created', async () => {
      const statusCode = 200;
      let newUser = {
          username: "jestTest",
          password:  "jestTest"
      }
      const response = await request(server)
        .post("/api/auth/login")
        .send(newUser)
        .expect('Content-Type', /json/)
        .set('Accept', 'application/json')
        .expect(200)

      expect(response.status).toEqual(statusCode)
      })
      
      it('returns a status of 500 when posting no credentials to the db', async () => {
        const testUser = { username: ""};
        const response = await request(server)
          .post('/api/auth/login')
          .send(testUser);
            
        expect(response.status).toBe(401);
      })
  
      it('return body of new  created user', async () => {
        const response = await request(server).post("/api/auth/login")
          .send({username:"jestTest1", password:"asdf"})
          .expect('Content-Type', /json/)
          .set('Accept', 'application/json')
          .expect(function(res) {
              res.body = {username:"jestTest1", password:"asdf"}
          })
              
        expect(response.body).toEqual({username:"jestTest1", password:"asdf"})
    })

   

    

  })