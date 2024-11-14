import path from "path";
export function dynamicViteAssetImport(imageFileName: string) {
  const filename = path.parse(`../public/${imageFileName}`);
  const name = imageFileName.replace(/\.[^/.]+$/, "");
  const ext = filename.ext;
  switch (ext) {
    case ".webp":
      return Object.values(import.meta.glob(`../public/${name}.webp`))[0];
    case ".jpg":
      return Object.values(import.meta.glob(`../public/${name}.jpg`))[0];
    case ".png":
      return Object.values(import.meta.glob(`../public/${name}.png`))[0];
    case ".svg":
      return Object.values(import.meta.glob(`../public/${name}.svg`))[0];
    case ".gif":
      return Object.values(import.meta.glob(`../public/${name}.gif`))[0];
    case ".avif":
      return Object.values(import.meta.glob(`../public/${name}.avif`))[0];
    case ".jpeg":
      return Object.values(import.meta.glob(`../public/${name}.jpeg`))[0];
    default:
      return Object.values(import.meta.glob(`../public/${name}.jpg`))[0];
  }
}
