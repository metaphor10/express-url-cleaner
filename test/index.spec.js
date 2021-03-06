const app = require('./app')(),
    request = require('supertest');

describe('the express-url-cleaner module', function () {
    describe('baseline', function () {
        it('GET /path', done => {
            request(app)
                .get('/path')
                .expect(200, done);
        });
    });

    describe('sanitizes html in the pathname', function () {
        it('GET /path/<script>test</script>', done => {
            request(app)
                .get('/path<script>test</script>')
                .expect('location', '/path')
                .expect(301, done);
        });
    });

    describe('sanitizes html in the search', function () {
        it('GET /path?key=value - 200', done => {
            request(app)
                .get('/')
                .expect(200, done);
        });

        it('GET /path?key=<script>alert("hello!")</script> - 301', done => {
            request(app)
                .get('/path?key=<script>alert("hello!")</script>')
                .expect('location', '/path?key=')
                .expect(301, done);
        });
    });
});
