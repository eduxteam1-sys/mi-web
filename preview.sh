#!/bin/bash

echo "=============================="
echo " Iniciando servidor local"
echo "=============================="

# entrar a la carpeta del proyecto
cd "$(dirname "$0")"

# matar procesos anteriores (evita puertos ocupados)
pkill -f vite 2>/dev/null
pkill -f cloudflared 2>/dev/null

# levantar vite en segundo plano
npm run dev &

# esperar a que arranque
sleep 6

echo "=============================="
echo " Creando tunel publico"
echo "=============================="

cloudflared tunnel --url http://localhost:3000
