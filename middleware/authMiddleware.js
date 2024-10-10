const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = verified; // Guarda os dados do usuário extraídos do token (como o userId)
    next(); // Prossegue para a rota
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = verifyToken;
