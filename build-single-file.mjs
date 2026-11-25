import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
let js = fs.readFileSync(path.join(root, "script.js"), "utf8");

const assets = [
  "profile.png",
  "kiyolive-mark.png",
  "greymusicstudio-logo.png",
  "chzzk-logo.svg",
  "youtube-logo.svg",
  "toonation-logo.png",
  "artmug-logo.png",
];

for (const asset of assets) {
  const file = path.join(root, asset);
  const mime = asset.endsWith(".svg") ? "image/svg+xml" : `image/${path.extname(asset).slice(1).replace("jpg", "jpeg")}`;
  const data = fs.readFileSync(file).toString("base64");
  html = html.replaceAll(`./${asset}`, `data:${mime};base64,${data}`);
}

for (const asset of assets) {
  const file = path.join(root, asset);
  const mime = asset.endsWith(".svg") ? "image/svg+xml" : `image/${path.extname(asset).slice(1).replace("jpg", "jpeg")}`;
  const data = fs.readFileSync(file).toString("base64");
  js = js.replaceAll(`./${asset}`, `data:${mime};base64,${data}`);
}

html = html.replace(/<link rel="stylesheet" href="\.\/style\.css"\s*\/>/, `<style>\n${css}\n</style>`);
html = html.replace(/<script src="\.\/script\.js\?v=\d+"><\/script>/, `<script>\n${js}\n</script>`);
html = html.replace(/<title>[^<]*<\/title>/, "<title>HanasakiSion — studio notes</title>");

fs.writeFileSync(path.join(root, "HanasakiSion_single.html"), `<!doctype html>\n${html.trim()}\n`, "utf8");
