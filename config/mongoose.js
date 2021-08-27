const mongoose = require("mongoose");
const config = require(".");

function setupMongoose() {
	mongoose.connect(config.DB_CONNECTION, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	const db = mongoose.connection;

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", console.log.bind(console, "Db Connected!"));
}

module.exports = setupMongoose;
