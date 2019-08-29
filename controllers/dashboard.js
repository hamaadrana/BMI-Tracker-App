"use strict";
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const userStore = require("../models/user-store");
const uuid = require("uuid");
const helpers = require("../utils/helper");
let count = 0;
const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const user = userStore.getUserById(loggedInUser.id);
    const user_assessments = assessmentStore.getUserAssessments(loggedInUser.id);
    let latestWeight = user_assessments.length > 0 ? user_assessments[user_assessments.length-1].weight : user.weight;
    const bmi = helpers.calculateBMI(latestWeight, user);
    const bmi_category =  helpers.getBMICategory(bmi);
    const assessments = assessmentStore.getAllAssessments();
    var members = userStore.getAllUsers();
    members = members.filter((user) => {
        return user.type === "Member";
    });
    let message = "Set your goals and make them happen!";
    if(user.type === "Member"){
      count++;
      if(user.goals.length > 0){
        message = "Your last goal status is: "  + helpers.getGoalStatus(user.goals[user.goals.length - 1], user_assessments)
      }
    }
    const viewData = {
      title: "Assessment Dashboard",
      assessments: user_assessments,
      user: user,
      bmi: bmi,
      count: count === 1,
      message: message,
      bmi_category: bmi_category,
      all_assessments:assessments,
      type: {member: user.type === "Member", trainer: user.type === "Trainer"},
      members: members
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  deleteAssessment(request, response) {
    const assessID = request.params.id;
    assessmentStore.removeAssessment(assessID);
    response.redirect("/dashboard");
  },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const user_assessments = assessmentStore.getUserAssessments(loggedInUser.id);
    let trend = true;
    if(user_assessments.length > 1){
      trend = user_assessments[user_assessments.length-2].weight > user_assessments[user_assessments.length-1].weight;
    }
    const newAssess = {
      id: uuid(),
      userid: loggedInUser.id,
      date: helpers.getcurrentDate(),
      weight: request.body.weight,
      upper_arm: request.body.upper_arm,
      chest: request.body.chest,
      waist: request.body.waist,
      thigh: request.body.thigh,
      hips: request.body.hips,
      trend: trend
    };
    assessmentStore.addAssessment(newAssess);
    response.redirect("/dashboard");
  },

};

module.exports = dashboard;
