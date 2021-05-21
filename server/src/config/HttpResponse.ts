export default class Response {
    static OK = {
      status: 200,
      message: "Successful request.",
    };
    static Created = {
      status: 201,
      message: "Resource created.",
    };
    static Accepted = {
      status: 202,
      message: "Request accepted.",
    };
    static NotModified = {
      status: 304,
      message: "Not modified",
    };
    static BadRequest = {
      status: 400,
      message: "Bad request.",
    };
    static Unauthorized = {
      status: 401,
      message: "Unauthorized request.",
    };
    static Forbidden = {
      status: 403,
      message: "Forbidden request, please authorize.",
    };
    static NotAcceptable = {
      status: 406,
      message: "Unauthorized request.",
    };
    static Conflict = {
      status: 409,
      message: "The username you specified exists.",
    };
    static Teapot = {
      status: 418,
      message: "I'm a teapot.",
    };
    static ServerError = {
      status: 500,
      message: "Internal server error.",
    };
    static NotFound = {
      status: 404,
      message: "Not Found.",
    };
  }
  