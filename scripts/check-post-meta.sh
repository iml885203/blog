#!/bin/bash
# Lint blog post frontmatter: check description length and formatting
# Used by lint-staged on *.md files

HAS_ERROR=0

for file in "$@"; do
  # Only check posts
  case "$file" in
    src/content/posts/*) ;;
    *) continue ;;
  esac

  # Extract description (handle multi-line YAML strings)
  desc=$(awk '/^description:/{gsub(/^description: */, ""); gsub(/^["'"'"']/, ""); gsub(/["'"'"']$/, ""); print; found=1; next} found && /^[a-z]/{print; next} found{found=0}' "$file" | tr -d '\n')

  if [ -z "$desc" ]; then
    continue
  fi

  len=${#desc}

  if [ "$len" -gt 150 ]; then
    echo "⚠️  $file: description too long (${len} chars, max 150)"
    HAS_ERROR=1
  fi
done

if [ "$HAS_ERROR" -eq 1 ]; then
  echo ""
  echo "💡 Tip: Keep description under 150 characters for better preview in cards and SEO."
  exit 1
fi
