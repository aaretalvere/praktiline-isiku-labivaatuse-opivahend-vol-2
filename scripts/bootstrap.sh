#!/usr/bin/env bash
set -euo pipefail

echo "Käivita infra:"
echo "docker compose -f infra/docker-compose.yml up -d"
echo
echo "Käivita API:"
echo "cd apps/api && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
echo
echo "Käivita Web:"
echo "cd apps/web && npm install && npm run dev"
