

const cassandra = require('cassandra-driver');

const Uuid = require("cassandra-driver").types.Uuid;
const TimeUuid = require("cassandra-driver").types.TimeUuid;

const client = new cassandra.Client({
	contactPoints: ['127.0.0.1:9042'],
	localDataCenter: 'datacenter1',
	keyspace: 'covid'
});





class GestionUsagers {



	static async register(data) {

		console.log(data);

		console.log("Modèle");

		const query = `
		INSERT INTO usagers (codeusager, dateinscription, api_key, nom, prenoms, mdp, sexe, age, villeResidence, telephone, statut)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`;




		var usagerId = Uuid.random()
		var dateInscription = TimeUuid.now()


		/*
		const queries = [
			{
			  query: query,
			  params: [ usagerId, dateInscription, "Bini", "SAMUEL", "M", 20, "Abidjan", "89990640", 0, "Bini", "Etienne", "77375702", "frère" ]
			},
			{
			  query: "INSERT INTO usagers (codeusager, dateinscription, codeProcheUsager, nomProcheUsager, prenomsProcheUsager, lien) VALUES (?, ?, uuid(), ?, ?, ?)",
			  params: [ usagerId, dateInscription, 'Bini', 'Rachel', "soeur" ]
			},
		  ];

		*/



		var params = [usagerId, dateInscription, data.api_key, data.nom, data.prenom, data.mdp, data.sexe, data.age, data.ville_residence, data.telephone, 0]



		try {

			await client.execute(
				query,
				params,
				{ prepare: true }
			);

			console.log("Enregistrement réussi");

		} catch (error) {
			console.error("une erreur est survenue : ", error);

			return false
		}

		return true

	}




	static async getPasswordByTelephone(telephone) {

		const query = `
		SELECT mdp, api_key FROM usagers WHERE telephone = ? ALLOW FILTERING;
		`;


		const queryResult = await client.execute(
			query,
			[telephone],
			{ prepare: true }
		);


		console.log(queryResult.rows)


		if (queryResult.rowLength == 0) {
			let result = {
				status : 0
			}
			return result
		}
		else {
			let result = {
				status : 1,
				password : queryResult.first().mdp,
				api_key : queryResult.first().api_key
			}

			return result
		}



	}






}



module.exports = GestionUsagers;