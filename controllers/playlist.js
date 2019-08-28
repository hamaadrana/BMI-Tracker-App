"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const userStore = require("../models/user-store");
const uuid = require("uuid");

const playlist = {
  index(request, response) {
    const userid = request.params.id;
    const viewData = {
      user: userStore.getUserById(userid),
      user_assessments: playlistStore.getUserPlaylists(userid)
    };
    response.render("playlist", viewData);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect("/playlist/" + playlistId);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug("New Song = ", newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect("/playlist/" + playlistId);
  },
  addComment(request, response) {
    const playlistId = request.params.id;
    console.log(request.body.comment);
    playlistStore.addComment(playlistId, request.body.comment);
    response.redirect("/dashboard");
  }
};

module.exports = playlist;
