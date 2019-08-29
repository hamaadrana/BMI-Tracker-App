"use strict";
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const userStore = require("../models/user-store");
const uuid = require("uuid");
const helpers = require("../utils/helper");

const goal = {
    index(request, response) {
        const user = userStore.getUserById(request.params.id);
        var goals = user.goals;
        var assessments = assessmentStore.getUserAssessments(user.id);
        let status = 'Open';
        goals.forEach((goal) => {
            goal.status = helpers.getGoalStatus(goal, assessments);
        });
        user.goals = goals;
        const viewData = {
            user: user
        };
        response.render("goal", viewData);
    },
    addUserGoal(request, response){
        var goal = {
            measurements: {
                weight: request.body.weight,
                upper_arm: request.body.upper_arm,
                chest: request.body.chest,
                waist: request.body.waist,
                thigh: request.body.thigh,
                hips: request.body.hips,
            },
            date: request.body.date
        };
        userStore.addUserGoals(request.params.id, goal);
        response.redirect("/user/" +request.params.id + "/goals");
    },

};

module.exports = goal;
