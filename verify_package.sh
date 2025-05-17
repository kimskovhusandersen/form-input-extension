#!/bin/bash

# Function to check if a file exists
check_file() {
    if [ ! -f "$1" ]; then
        echo "Error: $1 is missing"
        exit 1
    fi
}

# Check all required files
echo "Checking required files..."
check_file "manifest.json"
check_file "content.js"
check_file "popup.html"
check_file "popup.js"

# Check icons
echo "Checking icons..."
for size in 16 32 48 128; do
    check_file "icons/icon${size}.png"
done

# Verify manifest.json structure
echo "Verifying manifest.json..."
if ! jq . manifest.json > /dev/null 2>&1; then
    echo "Error: manifest.json is not valid JSON"
    exit 1
fi

# Check required manifest fields
required_fields=("manifest_version" "name" "version" "description" "permissions" "action" "icons")
for field in "${required_fields[@]}"; do
    if ! jq -e ".$field" manifest.json > /dev/null 2>&1; then
        echo "Error: $field is missing from manifest.json"
        exit 1
    fi
done

echo "All checks passed!" 