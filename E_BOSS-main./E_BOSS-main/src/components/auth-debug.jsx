import React from 'react';
import { useAuth } from './context/auth-context';

/**
 * Composant de test pour l'authentification
 * À utiliser uniquement en développement
 */
export function AuthDebug() {
  const { user, token, isAuthenticated, isLoading } = useAuth();

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#fff',
      border: '2px solid #0066cc',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        🔐 Auth Debug
      </div>
      
      <div>
        <strong>isLoading:</strong> {String(isLoading)}
      </div>
      
      <div>
        <strong>isAuthenticated:</strong> {String(isAuthenticated)}
      </div>
      
      <div>
        <strong>User:</strong>
        {user ? (
          <pre style={{ margin: '4px 0', background: '#f0f0f0', padding: '4px' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        ) : (
          ' null'
        )}
      </div>
      
      <div>
        <strong>Token:</strong>
        {token ? (
          <pre style={{ margin: '4px 0', background: '#f0f0f0', padding: '4px' }}>
            {token.substring(0, 50)}...
          </pre>
        ) : (
          ' null'
        )}
      </div>
      
      <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
        localStorage:
        <div>token: {localStorage.getItem('token')?.substring(0, 20)}...</div>
        <div>user: {localStorage.getItem('user')?.substring(0, 30)}...</div>
      </div>
    </div>
  );
}

export default AuthDebug;
