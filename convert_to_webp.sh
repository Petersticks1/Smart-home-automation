#!/bin/bash
cd /Users/psticks/Documents/Github/Altair-attic-smart-home/src/assets

echo "Converting files in assets root..."
for img in *.png *.jpg *.jpeg; do
  if [ -f "$img" ]; then
    echo "Converting $img to webp..."
    magick "$img" -quality 80 "${img%.*}.webp"
    rm "$img"
  fi
done

for d in */; do
  if [ -d "$d" ]; then
    echo "Converting files in $d..."
    cd "$d"
    for img in *.png *.jpg *.jpeg; do
      if [ -f "$img" ]; then
        magick "$img" -quality 80 "${img%.*}.webp"
        rm "$img"
      fi
    done
    cd ..
  fi
done

echo "Conversion complete!"
