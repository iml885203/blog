#!/bin/bash
# Check that staged image files don't exceed size limit
MAX_KB=500
FAILED=0

for file in "$@"; do
  if [ ! -f "$file" ]; then
    continue
  fi
  size=$(wc -c < "$file" | tr -d ' ')
  size_kb=$((size / 1024))
  if [ "$size_kb" -gt "$MAX_KB" ]; then
    echo "❌ $file is ${size_kb}KB (max ${MAX_KB}KB)"
    FAILED=1
  fi
done

if [ "$FAILED" -eq 1 ]; then
  echo ""
  echo "Compress images before committing (e.g. convert to WebP q85)"
  exit 1
fi
