const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.URL_DB);
    console.log("Estamos conectados a la db");
    return connection; // Devolvemos la instancia de la conexión
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar a la base de datos");
  }
};

module.exports = dbConnection(); // Exportamos la promesa de conexión
