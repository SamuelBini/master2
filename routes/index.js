var express = require('express');
var router = express.Router();

var controlleurUsagers = require("../controlleurs/usager.controleur")



/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: "MEDI'S FAMILY" });
});


router.get('/register', function (req, res, next) {
	res.render('register', { title: "INSCRIPTION" });
});


router.post('/register', controlleurUsagers.register );

module.exports = router;
