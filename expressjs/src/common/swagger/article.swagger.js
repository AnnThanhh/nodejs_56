export const article = {
  "/article": {
    get: {
      tags: ["Article"],
      summary: "Returns a list of articles.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            example: 1,
            default: 1,
          },
        },
        {
          in: "query",
          name: "pageSize",
          schema: {
            type: "integer",
            example: 3,
            default: 3,
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
        400: {
          description: "Invalid status value",
        },
        401: {
          description: "Unauthorized",
        },
      },
    },
  },
  "/article/{id}": {
    get: {
      tags: ["Article"],
      summary: "Returns a single article by ID.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer",
            example: 1,
            default: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
    put: {
      tags: ["Article"],
      summary: "Updates a single article by ID.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer",
            example: 1,
            default: 1,
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Tiêu đề bài viết",
                },
                content: {
                  type: "string",
                  example: "Nội dung bài viết",
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
    delete: {
      tags: ["Article"],
      summary: "Deletes a single article by ID.",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "integer",
            example: 1,
            default: 1,
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
