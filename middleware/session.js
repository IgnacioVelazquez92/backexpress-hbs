const expressSession = require("express-session");

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Deberías establecerlo en true en un entorno de producción con HTTPS
    maxAge: 60 * 60 * 1000,
  },
};

module.exports = expressSession(sessionConfig);
