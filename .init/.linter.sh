#!/bin/bash
cd /home/kavia/workspace/code-generation/bookexchange-hub-118396-118406/bookswap_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

