import path from "path";
export function dynamicViteAssetImport(imageFileName: string) {
  const filename = path.parse(`../public/${imageFileName}`);
  const name = imageFileName.replace(/\.[^/.]+$/, "");
  const ext = filename.ext;
  switch (ext) {
    case ".webp":
      return import(`../public/${name}.webp`);
    case ".jpg":
      return import(`../public/${name}.jpg`);
    case ".png":
      return import(`../public/${name}.png`);
    case ".svg":
      return import(`../public/${name}.svg`);
    case ".gif":
      return import(`../public/${name}.gif`);
    case ".avif":
      return import(`../public/${name}.avif`);
    case ".jpeg":
      return import(`../public/${name}.jpeg`);
    default:
      return import(`../public/${name}.jpg`);
  }
}
