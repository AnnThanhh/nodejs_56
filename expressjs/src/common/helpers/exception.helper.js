import { statusCodes } from "./statusCode.helper.js";
//400
export class BadRequestException extends Error {
  code = statusCodes.BAD_REQUEST;
  name = "BadRequestException";
  constructor(message = "Bad request") {
    super(message);
  }
}

//401
export class UnauthorizedException extends Error {
  code = statusCodes.UNAUTHORIZED;
  name = "UnauthorizedException";
  constructor(message = "Unauthorized") {
    super(message);
  }
}

//403
export class ForbiddenException extends Error {
  code = statusCodes.FORBIDDEN;
  name = "ForbiddenException";
  constructor(message = "Forbidden") {
    super(message);
  }
}

//404
export class NotFoundException extends Error {
  code = statusCodes.NOT_FOUND;
  name = "NotFoundException";
  constructor(message = "Not found") {
    super(message);
  }
}

