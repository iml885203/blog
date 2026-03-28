#!/bin/bash
# Check that staged image files don't exceed size limit
# GIF allowed up to 5MB (animated), others up to 500KB
FAILED=0

for file in "$@"; do
  if [ ! -f "$file" ]; then
    continue
  fi
  size=$(wc -c < "$file" | tr -d ' ')
  size_kb=$((size / 1024))

  if echo "$file" | grep -qi '\.gif$'; then
    max_kb=5120
  else
    max_kb=500
  fi

  if [ "$size_kb" -gt "$max_kb" ]; then
    echo "❌ $file is ${size_kb}KB (max ${max_kb}KB)"
    FAILED=1
  fi
done

if [ "$FAILED" -eq 1 ]; then
  echo ""
  echo "Compress images before committing (e.g. convert to WebP q85)"
  exit 1
fi
