// backend/hash-password.js
const bcrypt = require('bcrypt');

const contraseñaEnTextoPlano = 'RAMOS123456'; // Cambia esto por la contraseña que usarás
const saltRounds = 10;

bcrypt.hash(contraseñaEnTextoPlano, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }

  console.log('Hash generado:', hash);
});
