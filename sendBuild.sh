#!/bin/bash

ng build --prod

cd dist

rm Front.zip

zip -r Front.zip Front

scp Front.zip root@157.230.82.246:/opt/ben2paris/ben2Paris/dist

cd ..

echo "-------------------------------------------------------"

echo "Build Sent with success"

echo "-------------------------------------------------------"
