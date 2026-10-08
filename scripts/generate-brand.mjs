import sharp from 'sharp';
for (const size of [192, 512]) {
  await sharp('public/brand/edunest-symbol.svg').resize(size, size).png().toFile(`public/brand/icon-${size}.png`);
}
console.log('Generated EduNest PWA icons.');
