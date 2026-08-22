export const swaggerDocument = {
  openapi: "3.0.4",
  info: {
    title: "Nodejs56 API",
    description:
      "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    version: "0.1.0",
  },
  servers: [
    {
      url: "http://trinhanthanh.com/api",
      description: "Optional server description, e.g. Main (production) server",
    },
    {
      url: "http://localhost:3069/api",
      description:
        "Optional server description, e.g. Internal staging server for testing",
    },
  ],
  paths: {
    "/article": {
      get: {
        tags: ["Article"],
        summary: "Returns a list of articles.",
        description: "Optional extended description in CommonMark or HTML.",
        parameters: [
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["approved", "pending", "closed", "new"],
              example: "approved",
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
  },
};
