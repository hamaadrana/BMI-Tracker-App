"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("playlist", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    user.type = "Member"; //By default only member can sign up, trainers are pre loaded in json file
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("playlist", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
  editUser(request, response){
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      user: loggedInUser
    };
    response.render("edit", viewData)
  },
  updateUser(request, response){
    const loggedInUser = accounts.getCurrentUser(request);
    userstore.updateUser(loggedInUser.id, request.body);
    response.redirect("/dashboard")
  },
  deleteUser(request, response){
    const userid = request.params.id;
    userstore.removeUser(userid);
    response.redirect("/dashboard");
  }


};

module.exports = accounts;
