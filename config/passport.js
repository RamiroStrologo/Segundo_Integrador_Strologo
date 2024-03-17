const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { SECRET_KEY } = require("../utils/generateToken.js");
const UserMananger = require("../db/userManagerMongo");
const um = new UserMananger();

const initializePassport = () => {
  passport.use(
    "login_github",
    new GithubStrategy(
      {
        clientID: "Iv1.1606bcb88434c508",
        clientSecret: "ac4c72e6babb9ab89b8be99d074587e20adcacf0",
        callbackURL: "http://localhost:8080/api/auth/login_github",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const response = await um.loginWithGitHub(profile._json);
          return response
            ? done(null, response)
            : done(null, false, {
                message: "Usuario no encontrado",
              });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["cookieToken"];
  }
  return token;
};
module.exports = { initializePassport };
