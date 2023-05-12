/* eslint-disable quotes */
const { News, User } = require("../models");
const controller = require("../controllers/news");
const mockNews = require("./constants");
const mockPost = require("./constants");

describe("Test newsGet controller ", () => {
  it("Should return all news with user data", async () => {
    jest.spyOn(News, "findAll").mockResolvedValue(mockNews);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
    };

    await controller.newsGet(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.status().send).toHaveBeenCalledWith(mockNews);
  });
});

describe("Test addPost controller ", () => {
  it("Should create a new post with user data", async () => {
    jest.spyOn(News, "create").mockResolvedValue(mockPost);
    jest.spyOn(News, "findByPk").mockResolvedValue(mockPost);

    const mockReq = { body: mockPost };
    const mockRes = {
      send: jest.fn(),
      status: jest.fn().mockReturnValueOnce({ then: jest.fn() }),
    };

    await controller.addPost(mockReq, mockRes);

    expect(News.create).toHaveBeenCalledWith(mockPost);
    expect(News.findByPk).toHaveBeenCalledWith(mockPost.id, {
      include: [{ model: User }],
    });
    expect(mockRes.send).toHaveBeenCalledWith(mockPost);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  });
});
