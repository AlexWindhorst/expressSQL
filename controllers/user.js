let models = require("../models");
let bcryptjs = require("bcryptjs");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpity} = require('lodash');
const validateUser = require("../validators/signup");

exports.show_login = function(req, res, next) {
    res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', { formData: req.body, errors: errors });
}

const generateHash = function(password) {
    res.render('user/signup', { formData: {}, errors: {} });
}
exports.signup = function(req, res, next){
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpity(errors)) {
            rerender_signup(errors, req, res, next);
        } else {
            return models.User.findOne({
                where: {
                    is_admin: true
                }
            }).then(user => {
                let newUser;
                if (user !== null) {
                    const newUser = models.User.buils=d({
                        email: req.body.email,
                        password: generateHash(req.body.password)
                    })
                } else {
                    const newUser = models.User.buils=d({
                        email: req.body.email,
                        password: generateHash(req.body.password),
                        is_admin: true
                    });
                }
                    return newUser.save().then(result => {
                        passport.authenticate('local', {
                            successRedirect: "/",
                            failureRedirect: "/signup",
                            failureFlash: true
                        })(req, res, next);
                })
        })
}

exports.login = function(req, res, next){
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

exports.login = function(req, res, next){
    req.logout();
    req.session.destroy();
    res,redirct('/');
}
