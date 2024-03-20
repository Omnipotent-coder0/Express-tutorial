import passport from "passport";
import { Strategy } from "passport-local";
import { USERS } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside serialize fuction `);
  console.log(user);
  done(null, user.id); // This will attach request.session.passport.user = user.id
  // And that object will be used in the deserialize function to check for the user
});

// This funtion attaches .user property to the request object
// In this case that req.user will have the value of findUser
passport.deserializeUser(async (id, done) => {
  console.log(`Inside deserialize function `);
  console.log(`Deserialize user id : ${id}`);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("user not found!");
    done(null, findUser); // This is where request object .user property value
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "username" },
    async (username, password, done) => {
      console.log(`Username : ${username}`);
      console.log(`Password : ${password}`);
      try {
        const findUser = await User.findOne({ username });
        if (!findUser) throw new Error("User not found!");
        if (findUser.password != password)
          throw new Error("Invalid Credentials");
        done(null, findUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
