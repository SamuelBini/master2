

const cassandra = require('cassandra-driver');

const Uuid = require("cassandra-driver").types.Uuid;
const TimeUuid = require("cassandra-driver").types.TimeUuid;

const client = new cassandra.Client({
	contactPoints: ['127.0.0.1:9042'],
	localDataCenter: 'datacenter1',
	keyspace: 'covid'
});





class GestionNotifications {



	static async get_new_notifications(date) {

		const query = `
		SELECT * FROM notification 
		WHERE datenotification > ?
		ALLOW FILTERING
		`;





		var params = [date]


		try {

			var result = await client.execute(
				query,
				params,
				{ prepare: true }
			);

            return result.rows

		} catch (error) {
			console.error("une erreur est survenue : ", error);

			return false
		}

    }






}



module.exports = GestionNotifications;