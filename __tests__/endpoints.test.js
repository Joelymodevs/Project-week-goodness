const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index')
const app = require('../app');

beforeEach(() => {
    return seed({articleData, commentData, topicData, userData})
})

afterAll(() => {
    return db.end()
})
describe('404 error', () => {
    test('should respond 404 for invalid endpoints ', () => {
        return request(app).get('/api/aoishdoaishdoiahsdoiasdh').expect(404).then((response) => {
            expect(response.body).toBe("Invalid endpoint")
        })
    });
});

describe('/api/topics', () => {
    test('should respond with a status 200', () => {
        return request(app).get('/api/topics').expect(200)
        });

    test('should respond with a slug and description', () => {
        return request(app).get('/api/topics').expect(200).then((response) => {
            response.body.forEach((topic) => {
                expect(typeof topic.slug).toBe('string')
                expect(typeof topic.description).toBe('string');
            })
        });
    });
    test('length expectation', () => {
        return request(app).get('/api/topics').expect(200).then((response) => {
            response.body.forEach((topic) => {
                expect(Object.keys(topic).length).toBe(2)
            })
        });
    });
})
