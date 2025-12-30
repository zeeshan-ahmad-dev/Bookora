import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy} from "passport-local";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password"},async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      console.log("User.password: ", user.password);
      console.log("password: ", password);
      if (!user) return done(null, false);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (error) {
        return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("passport.googleStrategy");
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            authType: "google",
            isVerified: true,
            profilePicture: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("passport.serializeUser", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("passport.deserializeUser", id);
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
