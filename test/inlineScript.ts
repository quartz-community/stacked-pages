import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

/**
 * Bundles an `*.inline.ts` script the way tsup.config.ts's inline-script loader does (exports
 * stripped, esbuild, browser, es2020), so tests run the script a page actually gets.
 */
export async function bundleInline(file: string): Promise<string> {
  const text = (await readFile(file, "utf8"))
    .replace(/^export default /gm, "")
    .replace(/^export /gm, "");
  const result = await build({
    stdin: { contents: text, loader: "ts", resolveDir: path.dirname(file), sourcefile: file },
    write: false,
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2020",
    external: ["http://*", "https://*"],
  });
  return result.outputFiles[0]!.text;
}

/** Runs a bundled inline script against the current (stubbed) globals. */
export function runInline(js: string): void {
  new Function(js)();
}
