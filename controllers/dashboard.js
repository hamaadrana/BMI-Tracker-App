"use strict";
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const userStore = require("../models/user-store");
const uuid = require("uuid");
const helpers = require("../utils/helper");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const user = userStore.getUserById(loggedInUser.id);
    const user_assessments = playlistStore.getUserPlaylists(loggedInUser.id);
    let latestWeight;
    if(user_assessments.length > 0){
      latestWeight = user_assessments[user_assessments.length-1].weight;
    }else{
      latestWeight = user.weight;
    }
    const bmi = helpers.calculateBMI(latestWeight, user);
    const assessments = playlistStore.getAllPlaylists();
    var members = userStore.getAllUsers();
    members = members.filter((user) => {
        return user.type === "Member";
    });
    const viewData = {
      title: "Playlist Dashboard",
      playlists: user_assessments,
      user: user,
      bmi: bmi,
      all_assessments:assessments,
      type: {member: user.type === "Member", trainer: user.type === "Trainer"},
      members: members
    };
    logger.info("about to render", playlistStore.getAllPlaylists());
    response.render("dashboard", viewData);
  },

  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid(),
      userid: loggedInUser.id,
      date: getcurrentDate(),
      weight: request.body.weight,
      upper_arm: request.body.upper_arm,
      chest: request.body.chest,
      waist: request.body.waist,
      thigh: request.body.thigh,
      hips: request.body.hips,
      songs: []
    };
    logger.info(newPlayList);

    logger.debug("Creating a new Playlist", newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  },

};

function getcurrentDate(){
  var dt = new Date();
  var DD = ("0" + dt.getDate()).slice(-2);
  var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
  var YYYY = dt.getFullYear();
  var hh = ("0" + dt.getHours()).slice(-2);
  var mm = ("0" + dt.getMinutes()).slice(-2);
  var ss = ("0" + dt.getSeconds()).slice(-2);
  return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}


module.exports = dashboard;
