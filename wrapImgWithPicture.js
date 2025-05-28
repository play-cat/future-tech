import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

export async function wrapImgWithPicture() {
  const htmlDir = path.resolve(__dirname, 'docs');
  const files = fs.readdirSync(htmlDir);

  for (const file of files) {
    if (file.endsWith('.html')) {
      const filePath = path.join(htmlDir, file);
      let html = fs.readFileSync(filePath, 'utf-8');
      const $ = cheerio.load(html);

      // Оборачиваем все <img> в <picture>
      $('img').each((i, elem) => {
        const img = $(elem);
        const src = img.attr('src');
        const avifSrc = `${src.replace(/\.(jpeg|jpg|png)$/i, '.avif')}`;
        const webpSrc = `${src.replace(/\.(jpeg|jpg|png)$/i, '.webp')}`;
        // якщо потрібно додати @2x
        //const avifSrc2x = `${src.replace(/\.(jpeg|jpg|png)$/i, '@2x.avif')}`;
        //const webpSrc2x = `${src.replace(/\.(jpeg|jpg|png)$/i, '@2x.webp')}`;
        // а source має бути таким
        // <source srcset="${avifSrc} 1x, ${avifSrc2x} 2x" type="image/avif">

        const pictureTag = `<picture>
        <source srcset="${avifSrc}" type="image/avif">
        <source srcset="${webpSrc}" type="image/webp">
        ${img.prop('outerHTML')}
</picture>`;

        img.replaceWith(pictureTag);
      });

      // Сохраняем измененный HTML
      fs.writeFileSync(filePath, $.html());
    }
  }
}
