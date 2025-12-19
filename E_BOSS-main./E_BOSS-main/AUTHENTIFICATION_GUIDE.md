# 📱 Guide d'utilisation du contexte d'authentification

## Utilisation dans les composants

### 1. Vérifier si l'utilisateur est authentifié

```jsx
import { useAuth } from '../context/auth-context';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Bienvenue {user.firstName}!</h1>
    </div>
  );
}
```

### 2. Accéder aux informations utilisateur

```jsx
const { user } = useAuth();

console.log(user.id);
console.log(user.email);
console.log(user.firstName);
console.log(user.lastName);
```

### 3. Effectuer une déconnexion

```jsx
import { useAuth } from '../context/auth-context';

function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Déconnexion
    </button>
  );
}
```

### 4. Accéder au token JWT

```jsx
const { token } = useAuth();

// Utiliser le token pour les requêtes API
const response = await fetch('http://localhost:3000/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 5. Créer un composant protégé

```jsx
import { useAuth } from '../context/auth-context';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Utilisation dans routes.jsx
<Route 
  path="/dashboard" 
  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
/>
```

## État du contexte

```javascript
{
  user: {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com"
  },
  token: "eyJhbGciOiJIUzI1NiIs...",
  isLoading: false,
  isAuthenticated: true,
  login: (token, user) => {},
  logout: () => {}
}
```

## Configuration du Provider

Assurez-vous que `AuthProvider` enveloppe votre application:

```jsx
// main.jsx
import { AuthProvider } from './context/auth-context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
```

## Appels API authentifiés

```jsx
import { useAuth } from '../context/auth-context';

function UserProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:3000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, [token]);

  return <div>{profile?.name}</div>;
}
```

## Gestion des erreurs d'authentification

```jsx
useEffect(() => {
  if (token) {
    // Vérifier la validité du token
    fetch('http://localhost:3000/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .catch(() => {
      // Token expiré ou invalide
      logout();
      navigate('/login');
    });
  }
}, [token]);
```

---

**Pour plus d'informations, consultez `AUTH_SETUP.md`**
