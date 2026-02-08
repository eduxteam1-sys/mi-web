#!/bin/bash

clear

echo "Iniciando servidor local..."

cd /home/eduardo/Escritorio/WEB/jrex

npm run dev > dev.log 2>&1 &
DEV_PID=$!

# esperar a que Vite arranque
sleep 6

echo "Iniciando túnel..."

cloudflared tunnel --url http://localhost:3000 > tunnel.log 2>&1 &
TUNNEL_PID=$!

# esperar URL
while true; do
    URL=$(grep -o 'https://[-0-9a-z]*\.trycloudflare\.com' tunnel.log)
    if [ ! -z "$URL" ]; then
        break
    fi
    sleep 1
done

clear
echo "Iniciando servidor local..."
echo "Iniciando túnel..."
echo ""
echo "Tu link:"
echo "$URL"
echo ""
read -p "Presione ENTER para cerrar..."

kill $TUNNEL_PID 2>/dev/null
kill $DEV_PID 2>/dev/null
rm -f tunnel.log dev.log

exit 0

