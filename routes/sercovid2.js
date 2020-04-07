var express = require('express');
var router = express.Router();


var controleurUsager = require("../controleurs/usager.controleur")

var controleurNotifications = require("../controleurs/notifications.controlleur")



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'SERCOVID-2', host: req.hostname });
});


//  Toutes les requetes GET avec vue sont pour les tests

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'SERCOVID-2' });
});



/**
 * Envoie une requête avec sous forme d'objet
 * avec les clé : 
 *      "nom",
        "prenom",
        "sexe",
        "age",
        "ville_residence",
        "telephone",
        "motdepasse"

 */


router.post('/register_user', controleurUsager.register)


















/**
 * Envoie une requête avec sous forme d'objet
 * avec les clé : 
        "api_key",
        "statut"

 */

router.post('/change_statut', controleurUsager.change_statut)












/**
 * Envoie une requête avec sous forme d'objet
 * avec les clé : 
        "telephone",
        "password"

 */



router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'SERCOVID-2' });
});

router.post('/check_user', controleurUsager.authenticate)
















/**
 * Envoie une requête avec sous forme d'objet
 * avec les clé : 
        "datenotification",
        "contenu",
        "source"

 */






router.get('/new_notification', controleurNotifications.envoi_notifications_temps_reel)













router.get('/:apikey/warning_arearisk/:codeindividu', (req, res, next) => {
    var apikey = req.params.apikey
    var codeindividu = req.params.codeindividu

    //code ici

    if (1) {
        var result = {
            status: 1,
            //autre chose
        }
    } else {
        var result = {
            status: 0
        }
    }

    res.json(result)

})





module.exports = router;
