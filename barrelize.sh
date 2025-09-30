#!/usr/bin/env bash
set -euo pipefail

for target in esm cjs; do
  find "dist/$target" -maxdepth 1 -type f -name "*.js" | while read file; do
    base=$(basename "$file" .js)
    subdir="dist/$target/$base"
    mkdir -p "$subdir"
    echo "export * from '../$base.js';" > "$subdir/index.js"
  done
done
