const request = require('supertest')
const server = require('./app')

describe('Products', () => {
    it('get product', () => {
        return 
            request(server).get('/product')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})