#!/bin/bash

# Create a temporary directory
mkdir -p temp_extension

# Copy all necessary files
cp manifest.json temp_extension/
cp content.js temp_extension/
cp popup.html temp_extension/
cp popup.js temp_extension/
cp background.js temp_extension/
cp README.md temp_extension/

# Create icons directory and copy icons
mkdir -p temp_extension/icons
cp icons/icon*.png temp_extension/icons/

# Create the zip file (ensuring manifest.json is at root)
cd temp_extension
zip -r ../form-input-extension.zip ./*
cd ..

# Clean up
rm -rf temp_extension

echo "Extension packaged as form-input-extension.zip"

# Verify the zip structure
echo "Verifying zip structure..."
unzip -l form-input-extension.zip | grep manifest.json 