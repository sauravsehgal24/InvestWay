// https://www.questrade.com/api/documentation

import * as jwt from "jsonwebtoken";
import HttpResponse from "../config/HttpResponse";

import SERVER_CONFIG from '../config/server.config';
export class AuthService{
    public static signToken = (payload) => {
    const tokenOptions = {
      algorithm: "HS256",
      expiresIn: "1 hour",
      issuer: "investway",
    };
    return jwt.sign(payload,SERVER_CONFIG["SERVER_IW_USER_SECRET"], tokenOptions);
  };

  public static verifyToken = (req, res, next) => {
    jwt.verify(
      req.token,
      SERVER_CONFIG["SERVER_IW_USER_SECRET"],
      { issuer: "investway" },
      (err, data) => {
        if (err) {
          res.status(HttpResponse.Forbidden.status).json({
            message: err.message,
            at: err.expiredAt,
          });
        } else {
          req.user = data;
          next();
        }
      }
    );
  };

  public static verifyRole = (roles: string[]) => {
    return (req, res, next) => {
      const roleHeader = req.headers.role;
      let isRoleVerified = false;
      roles.map((role) => {
        if (roleHeader === role) {
          isRoleVerified = true;
        }
      });
      if (isRoleVerified) {
        next();
      } else {
        res.status(HttpResponse.Forbidden.status).json({
          message: HttpResponse.Forbidden.message,
        });
      }
    };
  };

  public static ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(HttpResponse.Forbidden.status).json({
        message: HttpResponse.Forbidden.message,
      });
    }
  };

  public static cronAuth = (req, res, next) => {
    const c_key = req.headers.c_key
    if(SERVER_CONFIG["APP_IW_QS_CONSMER_KEY"] !== c_key){
      res.status(HttpResponse.Forbidden.status).json({
        message: HttpResponse.Forbidden.message,
        context: "CRON ERROR FORBIDDEN"
      });
    }
    else{
      next()
    }
  };

}  