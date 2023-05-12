/* eslint-disable quotes */
const { User } = require("../models");
const controller = require("../controllers/user");
const mockUser = require("./constants");

describe("Test getPage controller ", () => {
  it("Should return user by id with status code 200", async () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = {
      status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
    };

    jest.spyOn(User, "findOne").mockResolvedValue(mockUser);

    await controller.getPage(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: mockReq.params.id },
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.status().send).toHaveBeenCalledWith(mockUser);
  });

  it("Should return error with status code 400 when user id is not provided", async () => {
    const mockReq = { params: {} };
    const mockRes = {
      status: jest.fn().mockReturnValueOnce({ send: jest.fn() }),
    };

    await controller.getPage(mockReq, mockRes);

    expect(User.findOne).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("Should return error with status code 400 when user is not found", async () => {
    const mockReq = { params: { id: 1 } };
    const mockRes = { status: jest.fn(), send: jest.fn() };
    mockRes.status.mockReturnValue(mockRes);

    jest.spyOn(User, "findOne").mockResolvedValue(null);

    await controller.getPage(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: mockReq.params.id },
    });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.status().send).toHaveBeenCalledWith("User not found");
  });
});
