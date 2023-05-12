export const mockNews = [
  {
    id: 1,
    title: "News 1",
    text: "Text 1",
    tags: ["tag1", "tag2"],
    user_id: 1,
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    User: {
      login: "user1",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
  },
  {
    id: 2,
    title: "News 2",
    text: "Text 2",
    tags: ["tag3", "tag4"],
    user_id: 2,
    createdAt: "2022-01-02T00:00:00.000Z",
    updatedAt: "2022-01-02T00:00:00.000Z",
    User: {
      login: "user2",
      createdAt: "2022-01-02T00:00:00.000Z",
      updatedAt: "2022-01-02T00:00:00.000Z",
    },
  },
];

export const mockPost = {
  id: 1,
  title: "New Post",
  text: "New Text",
  tags: ["tag1", "tag2"],
  user_id: 1,
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  User: {
    login: "user1",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
};

export const mockUser = {
  id: 1,
  login: "User1",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  password: "password",
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
};
