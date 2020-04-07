
var modelUsager = require("../models/usager.model")







class ControlleurUsager {



    static async register(req, res, next) {


        //  Désaggregation des données
        var attributs = [
            "nom",
            "prenom",
            "sexe",
            "age",
            "ville_residence",
            "telephone",
            "motdepasse"
        ];



        //  Contôles à effectuer en cas de besoins

        var isError = false

        Object.keys(req.body).map((value, index) => {

            console.log(value + " => " + req.body[value])

            if (req.body[value] == "") {
                res.json({
                    status: 0,
                    details: "Une valeur est nulle"
                })
                isError = true
            }

            attributs.shift()

            /*
            if (value == "cmdp" && req.body.mdp != req.body.mdp) {
                res.json({
                    "error": "Les mots de passe ne correspondent pas"
                })
            }
            */

        })

        if (isError) {
            return false
        }


        //  On vérifie si tous les paramètres ont été envoyés
        if (attributs.length > 0) {
            res.json({
                status: 0,
                details: "Certains paramètres manquent"
            })

            return false

        }





        //  On vérifie que le téléphone n'est pas dejà utilisé
        var verificationUsager = await modelUsager.getPasswordByTelephone(req.body.telephone)

        if (verificationUsager.status == 1) {
            res.json({
                status: 0,
                details: "Ce numéro de téléphone est déjà utilisé"
            })
            return false
        }







        //  Génération de la clé d'API

        var api_key = ControlleurUsager.uniqid("", true)


        //  Enregistrement dans la BD

        var register = modelUsager.register({ ...req.body, api_key: api_key })


        if (register) {

            res.json({
                status: 1,
                api_key: api_key
            })

            return true
        }
        else {
            res.json({
                status: 0,
                details: "Erreur lors de l'enregistrement dans la BD"
            })

            return false
        }

    }















    static async authenticate(req, res, next) {


        //  Désaggregation des données
        var attributs = [
            "telephone",
            "password"
        ];



        //  Contôles à effectuer en cas de besoins

        var isError = false

        Object.keys(req.body).map((value, index) => {

            if (req.body[value] == "") {
                res.json({
                    status: 0,
                    details: "Une valeur est nulle"
                })
                isError = true
            }

            attributs.shift()

        })

        if (isError) {
            return false
        }


        //  On vérifie si tous les paramètres ont été envoyés
        if (attributs.length > 0) {
            res.json({
                status: 0,
                details: "Certains paramètres manquent"
            })

            return false

        }



        //  On fait les requêtes à la BD et on attend

        var queryResult = await modelUsager.getPasswordByTelephone(req.body.telephone)

        console.log(queryResult)

        if (queryResult.status == 1 && queryResult.password == req.body.mdp) {

            res.json({
                status: 1,
                api_key: queryResult.api_key
            })
        }

        else {
            res.json({
                status: 0,
                details: "Le numéro de téléphoneou le mot de passe est incorrect"
            })
        }




    }










    static async change_statut(req, res, next) {


        //  Désaggregation des données
        var attributs = [
            "api_key",
            "statut"
        ];


        //  Contôles à effectuer en cas de besoins

        var isError = false

        Object.keys(req.body).map((value, index) => {

            if (req.body[value] == "") {
                res.json({
                    status: 0,
                    details: "Une valeur est nulle"
                })
                isError = true
            }

            attributs.shift()

        })

        if (isError) {
            return false
        }



        socket.broadcast.emit('change_statut', { api_key: req.body.api_key, statut: req.body.statut })

        console.log("J'ai emis un statut")

        res.json({
            status: 1
        })

    }









    //  Fonction pour attibuer un id unique
    static uniqid(a = "", b = false) {
        var c = Date.now() / 1000;
        var d = c.toString(16).split(".").join("");
        while (d.length < 14) {
            d += "0";
        }
        var e = "";
        if (b) {
            e = "-";
            var f = Math.round(Math.random() * 100000000);
            e += f;
        }
        return a + d + e;
    }





}


module.exports = ControlleurUsager;