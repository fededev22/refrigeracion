import fs from "node:fs";
import zlib from "node:zlib";

const w = 256;
const h = 256;
const raw = Buffer.alloc((w * 4 + 1) * h);

for (let y = 0; y < h; y += 1) {
  const row = y * (w * 4 + 1);
  raw[row] = 0;
  for (let x = 0; x < w; x += 1) {
    const i = row + 1 + x * 4;
    const dx = x - 128;
    const dy = y - 128;
    const d = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const sector = Math.abs(((angle % (Math.PI / 3)) + Math.PI / 3) % (Math.PI / 3) - Math.PI / 6);
    const arm = d > 18 && d < 96 && sector < 0.09;
    const branch = d > 42 && d < 58 && sector < 0.38;
    const hub = d < 16;
    const disk = d < 112;
    if (!disk) {
      raw[i] = 0;
      raw[i + 1] = 0;
      raw[i + 2] = 0;
      raw[i + 3] = 0;
    } else if (arm || branch || hub) {
      raw[i] = 255;
      raw[i + 1] = 255;
      raw[i + 2] = 255;
      raw[i + 3] = 255;
    } else {
      raw[i] = 14;
      raw[i + 1] = 150 + Math.round((1 - d / 112) * 40);
      raw[i + 2] = 196;
      raw[i + 3] = 255;
    }
  }
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(Buffer.concat([name, data])) >>> 0);
  return Buffer.concat([length, name, data, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(w, 0);
ihdr.writeUInt32BE(h, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/marca.png", png);
console.log("public/marca.png");
