export const auth = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login a user.",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "trinhanthanh@gmail.com",
                },
                password: {
                  type: "string",
                  example: "CyberSoft@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Registers a new user.",
      description: "Optional extended description in CommonMark or HTML.",

      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "trinhanthanh@gmail.com",
                },
                password: {
                  type: "string",
                  example: "CyberSoft@123",
                },
                fullName: {
                  type: "string",
                  example: "Trịnh An Thành",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
