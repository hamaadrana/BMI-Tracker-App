"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    playlistCollection: []
  }),
  collection: "playlistCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addAssessment(playlist) {
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addComment(id, comment) {
    const assessment = this.getAssessment(id);
    assessment.comment = comment;
    this.store.save();
  },

  removeSong(id, songId) {
    const playlist = this.getAssessment(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId });
    this.store.save();
  }
};

module.exports = assessmentStore;
