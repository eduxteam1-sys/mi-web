#!/bin/bash

echo "=============================="
echo "Actualizando repositorio..."
echo "=============================="
echo ""

cd "$(dirname "$0")"

git add .
git commit -m "auto update $(date '+%Y-%m-%d %H:%M:%S')"
git push

echo ""
echo "✔ Proceso terminado"
echo ""
read -p "Presiona ENTER para cerrar..."

exit
