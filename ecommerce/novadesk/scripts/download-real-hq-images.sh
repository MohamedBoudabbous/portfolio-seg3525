#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/public/images/products"
mkdir -p "$OUT_DIR"

download() {
  local file="$1"
  local url="$2"
  echo "Downloading $file"
  curl -L --fail --retry 3 --retry-delay 2 "$url" -o "$OUT_DIR/$file"
}

download "alto-laptop-stand.jpg" "https://images.unsplash.com/photo-1623177578400-52c7f7113539?auto=format&fit=crop&w=1400&q=88"
download "luma-desk-lamp.jpg" "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=88"
download "cablenest-organizer.jpg" "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=88"
download "campus-notes-bundle.jpg" "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=88"
download "quietcore-headphones.jpg" "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=88"
download "metropack-student-backpack.jpg" "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=88"
download "desknest-wooden-tray.jpg" "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=88"
download "flowwrite-pen-kit.jpg" "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=88"
download "minifocus-timer.jpg" "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=1400&q=88"
download "cloudpad-desk-mat.jpg" "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88"
download "brightdock-charging-hub.jpg" "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=88"
download "softglow-clip-lamp.jpg" "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=88"
download "papertrail-weekly-planner.jpg" "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=88"
download "urbancommute-laptop-sleeve.jpg" "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1400&q=88"
download "clearsound-earbuds.jpg" "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1400&q=88"
download "oakline-monitor-riser.jpg" "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=88"
download "dormdock-wall-organizer.jpg" "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=88"
download "ecocarry-campus-tote.jpg" "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=88"
download "focusboard-whiteboard.jpg" "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=88"
download "airdesk-laptop-cushion.jpg" "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1400&q=88"

echo "Done. Images saved in $OUT_DIR"
ls -lh "$OUT_DIR"
