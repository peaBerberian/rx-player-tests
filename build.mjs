import esbuild from "esbuild";

async function build() {
  try {
    await Promise.all([
      esbuild.build({
        entryPoints: ["./src/index.js"], // Adjust path as needed
        bundle: true,
        outfile: "dist/bundle.js",
        format: "iife", // or 'esm', 'cjs' depending on your needs
        minify: true,
        sourcemap: true,
        target: ["es2020"],
        platform: "browser",
      }),

      esbuild.build({
        entryPoints: ["./src/worker-entry.js"], // Adjust path as needed
        bundle: true,
        outfile: "dist/worker.js",
        format: "iife",
        minify: true,
        sourcemap: true,
        target: ["es2020"],
        platform: "browser",
      }),
    ]);

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Run the build
build();
