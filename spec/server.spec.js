const request = require('request')

describe('get messages', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      expect(res.statusCode).toEqual(200)
      done();
    })
  })
  it('should return a list thats not empty', (done) => {
    request.get('http://localhost:3000/messages', (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    })
  })
})


describe('get messages from a user', () => {
  it('should return 200 ok', (done) => {
    request.get('http://localhost:3000/messages/ankit', (err, res) => {
      expect(res.statusCode).toEqual(200)
      done();
    })
  })
  it('name should be Ankit', (done) => {
    request.get('http://localhost:3000/messages/Ankit', (err, res) => {
      expect(JSON.parse(res.body)[0].name).toEqual('Ankit')
      done();
    })
  })
})