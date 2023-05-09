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
describe('/api/topics', () => {
    test('should respond with a status 200', () => {
        return request(app).get('/api/topics').expect(200)
        })
    });
    test('should respond with a slug and description', () => {
        return request(app).get('/api/topics').expect(200).then((response) => {
            expect(response.body).toEqual(
                [
                    {
                      description: 'The man, the Mitch, the legend',
                      slug: 'mitch'
                    },
                    {
                      description: 'Not dogs',
                      slug: 'cats'
                    },
                    {
                      description: 'what books are made of',
                      slug: 'paper'
                    }
                  ]
            )
        })
    });
