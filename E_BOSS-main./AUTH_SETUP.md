# 🔐 Système d'Authentification E_BOSS

## 📋 Description

Un système d'authentification complet avec **Express.js** et **React** permettant aux utilisateurs de s'inscrire et se connecter de manière sécurisée.

## 🚀 Démarrage

### Backend

1. **Naviguer vers le dossier backend:**
```bash
cd /home/khevin/Bureau/hackkk/E_BOSS-main./back
```

2. **Installer les dépendances:**
```bash
npm install
```

3. **Lancer le serveur:**
```bash
npm start
# ou
node server.js
```

Le serveur est lancé sur `http://localhost:3000`

### Frontend

1. **Naviguer vers le dossier frontend:**
```bash
cd /home/khevin/Bureau/hackkk/E_BOSS-main./E_BOSS-main
```

2. **Installer les dépendances:**
```bash
npm install
```

3. **Lancer le client:**
```bash
npm run dev
```

## 🔧 Fonctionnalités

### Backend (Express.js)

#### Routes d'authentification:

- **POST** `/api/auth/register` - Créer un compte
  ```json
  {
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "password": "Password123"
  }
  ```

- **POST** `/api/auth/login` - Se connecter
  ```json
  {
    "email": "jean@example.com",
    "password": "Password123"
  }
  ```
  Retourne un JWT token valide 24h

- **GET** `/api/auth/me` - Récupérer les infos utilisateur (authentifié)
  ```
  Header: Authorization: Bearer <token>
  ```

### Frontend (React)

#### Pages d'authentification:
- **LoginView** - Page de connexion
- **RegisterView** - Page d'inscription

#### Context d'authentification:
- **auth-context.jsx** - Gère l'état de l'utilisateur et du token

### Sécurité

✅ Mots de passe hashés avec **bcryptjs**  
✅ JWT tokens pour l'authentification  
✅ Validation côté serveur  
✅ CORS configuré  

## 📦 Dépendances

### Backend
- `express` - Framework web
- `bcryptjs` - Hashage des mots de passe
- `jsonwebtoken` - Gestion des JWT tokens
- `socket.io` - Communication en temps réel
- `cors` - Configuration CORS

### Frontend
- `react` - Framework UI
- `react-router-dom` - Routage

## 💾 Stockage des données

**⚠️ Important:** Les utilisateurs sont stockés en **mémoire RAM**. Les données seront perdues au redémarrage du serveur.

Pour la **production**, connectez une véritable base de données (MongoDB, PostgreSQL, MySQL, etc.)

## 🔐 Variables d'environnement

Modifier `server.js` pour ajouter des variables d'environnement:

```javascript
const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt_super_secure_2024";
```

## 📝 Flux d'utilisation

1. **L'utilisateur s'inscrit** (RegisterView)
   - Remplit le formulaire
   - Le mot de passe est validé
   - L'API crée le compte

2. **L'utilisateur se connecte** (LoginView)
   - Rentre ses identifiants
   - Le token JWT est retourné
   - Le token est stocké dans `localStorage`
   - L'utilisateur est redirigé vers `/dashboard`

3. **L'utilisateur est authentifié**
   - Le contexte `useAuth()` fournit l'état de l'utilisateur
   - Le token est automatiquement chargé au démarrage de l'app

## 🚀 Prochaines étapes

- [ ] Connecter une véritable base de données
- [ ] Ajouter la réinitialisation de mot de passe
- [ ] Ajouter la vérification d'email
- [ ] Implémenter OAuth (Google, GitHub)
- [ ] Ajouter la 2FA (authentification à deux facteurs)

---

**Développé avec ❤️ pour E_BOSS**
