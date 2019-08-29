~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const assessment = require("./controllers/assessment.js");
const goal = require("./controllers/goal.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.get("/edit-profile", accounts.editUser);
router.post("/update-user", accounts.updateUser);
router.get("/deleteUser/:id", accounts.deleteUser);


router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.get("/dashboard/deleteAssessment/:id", dashboard.deleteAssessment);
router.post("/dashboard/addAssessment", dashboard.addAssessment);

router.get("/about", about.index);
router.get("/assessment/:id", assessment.index);
router.get("/assessment/:id/deletesong/:songid", assessment.deleteSong);
router.post("/assessment/:id/addsong", assessment.addSong);
router.post("/assessment/:id/addComment", assessment.addComment);


router.get("/user/:id/goals", goal.index);
router.post("/user/:id/addGoal", goal.addUserGoal);



module.exports = router;
