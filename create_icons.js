const fs = require("fs");
const { createCanvas } = require("canvas");

// Create icons directory if it doesn't exist
if (!fs.existsSync("icons")) {
  fs.mkdirSync("icons");
}

// Function to create an icon
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = "#007bff";
  ctx.beginPath();
  ctx.roundRect(
    size * 0.125,
    size * 0.125,
    size * 0.75,
    size * 0.75,
    size * 0.0625
  );
  ctx.fill();

  // Draw text
  ctx.fillStyle = "white";
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("F", size / 2, size / 2);

  // Save to file
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`icons/icon${size}.png`, buffer);
}

// Generate icons in all required sizes
[16, 32, 48, 128].forEach((size) => {
  createIcon(size);
  console.log(`Created icon${size}.png`);
});
