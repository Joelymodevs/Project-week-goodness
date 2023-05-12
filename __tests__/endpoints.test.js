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
