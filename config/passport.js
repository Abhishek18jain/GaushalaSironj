const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModels');

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.correctPassword(password, user.password))) {
        return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
