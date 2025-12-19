# Configuration d'authentification E_BOSS

## 🔐 Sécurité

### Variables d'environnement à configurer

```bash
# Backend
JWT_SECRET=votre_secret_jwt_tres_secure_changez_moi
JWT_EXPIRES_IN=24h
NODE_ENV=production
PORT=3000
```

### Meilleures pratiques

1. **Générer un JWT_SECRET sécurisé:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **En production, utiliser une vraie base de données** (MongoDB, PostgreSQL, MySQL)

3. **Ajouter HTTPS** avec un certificat SSL

4. **Ajouter une rate limit** pour éviter les bruteforce

## 🗄️ Migration vers MongoDB (Exemple)

```javascript
const mongoose = require('mongoose');

// Schéma utilisateur
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

## 📱 Intégration OAuth

Pour ajouter Google/GitHub login:

```bash
npm install @react-oauth/google
npm install passport passport-google-oauth20
```

## 🔄 Flux de renouvellement du token

Implémentation d'un refresh token:

```javascript
// Créer deux tokens
const accessToken = jwt.sign(data, JWT_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign(data, REFRESH_SECRET, { expiresIn: '7d' });

// Endpoint refresh
app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  // Vérifier et renouveler le token
});
```

## 🚨 Gestion d'erreurs

Ajouter des middlewares d'erreur:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});
```

## 📊 Logging

Pour tracer les authentifications:

```javascript
const logger = require('winston');

logger.info(`User ${email} logged in successfully`);
logger.error(`Failed login attempt for ${email}`);
```

---

**À faire avant production:**
- [ ] Ajouter une véritable base de données
- [ ] Configurer HTTPS/SSL
- [ ] Ajouter rate limiting
- [ ] Ajouter logging
- [ ] Ajouter CSRF protection
- [ ] Vérifier la validation des inputs
- [ ] Ajouter les tests unitaires
