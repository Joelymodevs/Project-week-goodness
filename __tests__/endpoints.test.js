const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const jestSorted = require('jest-sorted')
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");
const createRef = require('../db/seeds/utils')
const app = require("../app");

beforeEach(() => {
  return seed({ articleData, commentData, topicData, userData });
});

afterAll(() => {
  return db.end();
});
describe("404 error", () => {
  test("should respond 404 for invalid endpoints ", () => {
    return request(app)
      .get("/api/asdasdasdasdasdas")
      .expect(404)
  });
});

describe("/api/topics", () => {
  test("should respond with a status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("should have a length of 3", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(3);
      });
  });

  test("should respond with a slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        response.body.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
  test("length expectation", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        response.body.forEach((topic) => {
          expect(Object.keys(topic).length).toBe(2);
        });
      });
  });
});

describe("/api", () => {
  test("should respond with a status 200", () => {
    return request(app).get("/api").expect(200);
  });

  test("should respond with a JSON object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response).toBe("object");
      });
  });
  test("should have a description key for EVERY endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        for (const obj in response.body) {
          for (const key in obj) {
            expect(obj.hasOwnProperty("description"));
          }
        }
      });
  });
  test("should match endpoints file", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(endpoints);
      });
  });
});

describe('/api/articles', () => {
  it('should have all properties of articles with new comment count column', () => {
    return request(app).get('/api/articles').expect(200).then((result) => {
      expect(result.body.length).toBe(12)
      result.body.forEach((article) => {
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.comment_count).toBe("number");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
    });
  
});
it('no article should have a body property', () => {
  return request(app).get('/api/articles').expect(200).then((result) =>{
    console.log(result.body)
    expect(result.body.length).toBe(12)
    result.body.forEach((article) => {
      expect(article.body).toBe(undefined)
    })
  })
});
it('should be ordered by created_by descending', () => {
  return request(app).get('/api/articles').expect(200).then((result) => {
    expect(result.body).toBeSortedBy('created_at', { descending: true });
  })
});
it('no article should have a body property', () => {
  return request(app).get('/api/articles').expect(200).then((result) =>{
    result.body.forEach((article) => {
      expect(article.body).toBe(undefined)
    })
  })
});
})




describe("/api/articles/:article_id", () => {
  test("test for 200 status on completion", () => {
    return request(app).get(`/api/articles/3`).expect(200);
  });
  test("should have all 8 properties", () => {
    return request(app)
      .get(`/api/articles/1`)
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveProperty("article_id");
        expect(result.body).toHaveProperty("title");
        expect(result.body).toHaveProperty("topic");
        expect(result.body).toHaveProperty("author");
        expect(result.body).toHaveProperty("body");
        expect(result.body).toHaveProperty("created_at");
        expect(result.body).toHaveProperty("votes");
        expect(result.body).toHaveProperty("article_img_url");
      });
  });
  test("all properties should be of the correct data type", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
        expect(typeof result.body.article_id).toBe("number");
        expect(typeof result.body.title).toBe("string");
        expect(typeof result.body.topic).toBe("string");
        expect(typeof result.body.author).toBe("string");
        expect(typeof result.body.body).toBe("string");
        expect(typeof result.body.created_at).toBe("string");
        expect(typeof result.body.votes).toBe("number");
        expect(typeof result.body.article_img_url).toBe("string");
      });
  });
  test('should return 404 not found for incorrect path', () => {
    return request(app).get('/api/articles/33').expect(404).then((response) => {
      expect(response.body).toEqual({"msg": "no article found"});
    });
    })
    test('should return 400 bad request for a bad request', () => {
      return request(app).get('/api/articles/notanarticle').expect(400).then((response) =>{
        expect(response.body).toEqual({"msg": "invalid input"});
      });
      })
  });


  describe('/api/articles/:article_id/comments POS', () => {
    it('should return an array of comments', () => {
      return request(app).get('/api/articles/3/comments').expect(200).then((response) => {
        expect(Array.isArray(response.body)).toBe(true)
      })
    });
    it('should have ALL properties of comments ', () => {
      return request(app).get('/api/articles/3/comments').expect(200).then((response) => {
        expect(response.body.length).toBe(2)
        response.body.forEach((comment) => {
          expect(typeof comment.comment_id).toBe('number');
          expect(typeof comment.votes).toBe('number');
          expect(typeof comment.created_at).toBe('string');
          expect(typeof comment.body).toBe('string');
          expect(typeof comment.article_id).toBe('number');

        })
      })
    });
    it('should be ordered, newest comments first', () => {
      return request(app).get('/api/articles/3/comments').expect(200).then((response) => {
        expect(response.body).toBeSortedBy('created_at', {descending: true})
      })
    });
    it('should return 404 for article that does not exist', () => {
      return request(app).get('/api/articles/5230235/comments').expect(404).then((response) => {
        expect(response.body).toEqual({msg: 'no comments found'})
      })
    });
    it('should return 400 for bad request e.g. article_id = not_an_id', () => {
      return request(app).get('/api/articles/not_an_id/comments').expect(400).then((response) => {
        expect(response.body).toEqual({msg: 'invalid input'})
      })
    });
  });

  describe('POST /api/articles/:article_id/comments', () => {
    it('should respond 201 ', () => {
      const comm = {
        author: 'lurker',
        body: 'I hope this works!',
      };
      return request(app).post('/api/articles/1/comments').send(comm).expect(201)
    });
    it('should respond with a comment which has been posted to the selected article', () => {
      const comm = {
        author: 'lurker',
        body: 'This also should work!'
      };

      return request(app).post('/api/articles/1/comments').send(comm).expect(201).then((response) => {
        expect(response.body.comment[0]).toHaveProperty('body')
        expect(response.body.comment[0]).toHaveProperty('author')
        expect(response.body.comment[0]).toHaveProperty('article_id', 1)
      })
    });
  });

  describe('PATH /api/articles/:article_id', () => {
    it('should succesfully update votes', () => {
      const vote = {
        inc_votes: 1
      }
      return request(app).patch('/api/articles/1').send(vote).expect(200).then((response) => {
        expect(response.body).toHaveProperty('article')
        expect(response.body.article.votes).toBe(101)
      })
    });
    it('should not accept a bad request', () => {
      const vote = {
        inc_votes: 'bad request'
      }
      return request(app).patch('/api/articles/1').send(vote).expect(400)
    });
  });




