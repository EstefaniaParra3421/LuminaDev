const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Registro
exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Validar campos
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear nuevo usuario
    const newUser = new User({
      nombre,
      correo,
      contraseña: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios" });
    }

    // Buscar usuario
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    // Login exitoso
    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
