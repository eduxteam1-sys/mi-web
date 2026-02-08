#!/bin/bash

echo "=============================="
echo "Actualizando repositorio..."
echo "=============================="

cd "$(dirname "$0")"

git add .
git commit -m "auto update $(date '+%Y-%m-%d %H:%M:%S')"
git push

echo ""
echo "Listo ✔ GitHub actualizado"
read -p "Presiona ENTER para cerrar..."

