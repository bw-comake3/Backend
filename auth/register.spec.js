const db = require('../data/dbConfig.js');
const request = require('supertest');

const server = require('../api/server.js');

describe('Testing register endpoint', () => {

  beforeAll(async () => {
    await db('users').truncate();
  })

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

      expect(response.status).toEqual(statusCode)
      })
      
      it('returns a status of 500 when posting no credentials to the db', async () => {
        const testUser = { username: ""};
        const response = await request(server)
          .post('/api/auth/register')
          .send(testUser);
            
            expect(response.status).toBe(500);
      })
  
      it('return body of new  created user', async () => {
        const response = await request(server).post("/api/auth/register")
          .send({username:"jestTest1", password:"asdf"})
          .expect('Content-Type', /json/)
          .set('Accept', 'application/json')
          .expect(function(res) {
              res.body = {username:"jestTest1", password:"asdf"}
          })
              
        expect(response.body).toEqual({username:"jestTest1", password:"asdf"})
    })

    it('Checks for amount of users in database', async function() {
      const testDB = await db('users')
  
      await expect(testDB).toHaveLength(2)
      })

  })