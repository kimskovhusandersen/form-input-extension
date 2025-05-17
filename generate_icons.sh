#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Please install ImageMagick first:"
    echo "macOS: brew install imagemagick"
    echo "Ubuntu/Debian: sudo apt-get install imagemagick"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p icons

# Generate icons in different sizes
for size in 16 32 48 128; do
    convert -size ${size}x${size} xc:white \
        -fill '#007bff' \
        -draw "roundrectangle 2,2,$((size-2)),$((size-2)),4,4" \
        -fill white \
        -gravity center \
        -pointsize $((size/2)) \
        -annotate 0 "F" \
        "icons/icon${size}.png"
done

echo "Icons generated successfully!" 