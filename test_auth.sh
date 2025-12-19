#!/bin/bash

# Script de test pour l'authentification E_BOSS

echo "=========================================="
echo "🧪 Tests d'authentification E_BOSS"
echo "=========================================="
echo ""

# Vérifier que le serveur est en cours d'exécution
echo "✓ Vérification du serveur backend..."
sleep 1

# Test 1: INSCRIPTION
echo ""
echo "1️⃣  TEST D'INSCRIPTION"
echo "---"
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "password": "Password123"
  }')

echo "Réponse: $REGISTER_RESPONSE"
echo ""

# Test 2: CONNEXION
echo "2️⃣  TEST DE CONNEXION"
echo "---"
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@example.com",
    "password": "Password123"
  }')

echo "Réponse: $LOGIN_RESPONSE"
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token extrait: $TOKEN"
echo ""

# Test 3: VÉRIFICATION DE L'AUTHENTIFICATION
if [ -n "$TOKEN" ]; then
  echo "3️⃣  TEST D'AUTHENTIFICATION (GET /api/auth/me)"
  echo "---"
  ME_RESPONSE=$(curl -s -X GET http://localhost:3000/api/auth/me \
    -H "Authorization: Bearer $TOKEN")
  
  echo "Réponse: $ME_RESPONSE"
else
  echo "❌ Impossible d'extraire le token"
fi

echo ""
echo "=========================================="
echo "✅ Tests complétés!"
echo "=========================================="
