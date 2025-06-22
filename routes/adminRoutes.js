const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModels');

// Login page
router.get('/login', (req, res) => {
    res.render('admin/login.ejs');
});

// Login handler
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Dashboard (protected)
router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/admin/login');
}

module.exports = router;
