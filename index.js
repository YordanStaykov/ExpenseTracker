//Configure the ports and DB connections
const config = require("./config");

//Express Setup
const express = require("express");
const app = express();
require("./config/express")(app);

//Mongoose Setup
require("./config/mongoose")();

//Router Setup
const routes = require("./routes");
app.use(routes);

app.listen(config.PORT || 5000, () =>
	console.log(`Server is running on port http://localhost:${config.PORT}...`)
);
