// const mongoose = require("mongoose");

// function setupMongoose() {
// 	mongoose.connect(process.env.DB_CONNECTION, {
// 		useNewUrlParser: true,
// 		useFindAndModify: false,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	});

// 	const db = mongoose.connection;

// 	db.on("error", console.error.bind(console, "connection error:"));
// 	db.once("open", console.log.bind(console, "Db Connected!"));
// }

// module.exports = setupMongoose;

const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectionParams = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

function setupMongoose() {
	mongoose
		.connect(url, connectionParams)
		.then(() => {
			console.log("Connected to database ");
		})
		.catch((err) => {
			console.error(`Error connecting to the database. \n${err}`);
		});
}

module.exports = setupMongoose;
