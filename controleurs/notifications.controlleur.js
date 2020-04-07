
var modelNotification = require("../models/notification.model")


class ControlleurNotifications {



    static async envoi_notifications_temps_reel(req, res, next) {


        var data = {
            datenotification : req.body.datenotification,
            contenu : req.body.contenu,
            source : req.body.source,
        }

        io.emit('new_notification', data )


    }






    //  Cette fonction recois la date sous forme de timestamp

    static async envoi_notifications_diferre(date_derniere_notification) {



        //  On verifie dans la BD avec une requete
        //  On emet un event s'il y a une nouvelle notification

        var new_notifications = modelNotification.get_new_notifications(date_derniere_notification)


        //  Traitement des nouvelles notifications

        if (new_notifications && new_notifications.length > 0 ) {
            
            socket.broadcast.emit('new_notification', new_notifications )            

        }


    }





}


module.exports = ControlleurNotifications;