#!/bin/bash

# Script de démarrage pour E_BOSS (Backend + Frontend)

echo "=========================================="
echo "🚀 Démarrage E_BOSS (Backend + Frontend)"
echo "=========================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Tuer les processus précédents si existe
echo "🛑 Arrêt des processus précédents..."
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true
sleep 1

# Démarrer le backend
echo ""
echo -e "${YELLOW}📦 Démarrage du backend (Express.js)...${NC}"
cd /home/khevin/Bureau/hackkk/E_BOSS-main./back
npm start &
BACKEND_PID=$!
sleep 3

echo -e "${GREEN}✓ Backend lancé (PID: $BACKEND_PID)${NC}"
echo "📍 Backend: http://localhost:3000"
echo ""

# Démarrer le frontend
echo -e "${YELLOW}⚛️  Démarrage du frontend (React/Vite)...${NC}"
cd /home/khevin/Bureau/hackkk/E_BOSS-main./E_BOSS-main
npm run dev &
FRONTEND_PID=$!
sleep 3

echo -e "${GREEN}✓ Frontend lancé (PID: $FRONTEND_PID)${NC}"
echo "📍 Frontend: http://localhost:5173"
echo ""

echo "=========================================="
echo -e "${GREEN}✅ E_BOSS est maintenant actif!${NC}"
echo "=========================================="
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Pour arrêter: Press Ctrl+C"
echo ""

# Garder le script actif
wait
