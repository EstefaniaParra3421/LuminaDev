const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://celisdaniel_db_user:YLdZ92Vj1uIeQ132@luminadev.th8npud.mongodb.net/?retryWrites=true&w=majority&appName=LuminaDev"
    );
    console.log("✅ Conexión exitosa a MongoDB");
    console.log(`📦 Base de datos conectada: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  }
};

module.exports = connectDB;
