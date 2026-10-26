#!/bin/sh
# Manual install for dsh-img-block into the default DSH profile.
set -e
PROFILE="${1:-$HOME/.dsh/profiles/desktop}"
HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="$PROFILE/node_modules/dsh-img-block"
mkdir -p "$DEST"
cp "$HERE/package.json" "$HERE/index.js" "$HERE/client.js" "$HERE/cordis.patch.yml" "$DEST/"
node -e '
  const fs = require("fs");
  const pj = process.argv[1] + "/package.json";
  const raw = fs.readFileSync(pj, "utf8");
  const p = JSON.parse(raw);
  fs.writeFileSync(pj + ".bak-img-block", raw);
  p.dependencies = p.dependencies || {};
  p.dependencies["dsh-img-block"] = "file:./node_modules/dsh-img-block";
  p.dsh = p.dsh || {};
  p.dsh.profile = p.dsh.profile || {};
  const b = (p.dsh.profile.bundles = p.dsh.profile.bundles || []);
  if (!b.includes("dsh-img-block")) b.push("dsh-img-block");
  fs.writeFileSync(pj, JSON.stringify(p, null, 2) + "\n");
' "$PROFILE"
echo "installed to $DEST"
echo "now restart DSH"
