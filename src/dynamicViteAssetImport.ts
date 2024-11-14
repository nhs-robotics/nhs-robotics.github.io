import path from "path";
export function dynamicViteAssetImport(imageFileName: string) {
  const filename = path.parse(imageFileName);
  const name = filename.name;
  const ext = filename.ext;
  switch (ext) {
    case ".webp":
      return import(`../assets/${name}.webp`);
    case ".jpg":
      return import(`../assets/${name}.jpg`);
    case ".png":
      return import(`../assets/${name}.png`);
    case ".svg":
      return import(`../assets/${name}.svg`);
    case ".gif":
      return import(`../assets/${name}.gif`);
    case ".avif":
      return import(`../assets/${name}.avif`);
    case ".jpeg":
      return import(`../assets/${name}.jpeg`);
    default:
      return import(`../assets/${name}.jpg`);
  }
}
