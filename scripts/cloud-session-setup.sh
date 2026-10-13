#!/bin/bash
# Prepare a Claude Code cloud session: pinned Node.js/npm, submodules,
# locked dependencies and the cached build. Idempotent and non-interactive.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git -C "$(dirname "$0")" rev-parse --show-toplevel)}"

node_version="$(tr -d '[:space:]' < .nvmrc)"
node_prefix="/usr/local/node-v${node_version}"
if [ "$(node -v 2>/dev/null || true)" != "v${node_version}" ]; then
  if [ ! -x "${node_prefix}/bin/node" ]; then
    case "$(uname -m)" in
      x86_64) node_arch=x64 ;;
      aarch64 | arm64) node_arch=arm64 ;;
      *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
    esac
    tmp="$(mktemp -d)"
    curl -fsSL "https://nodejs.org/dist/v${node_version}/node-v${node_version}-linux-${node_arch}.tar.xz" \
      -o "${tmp}/node.tar.xz"
    mkdir -p "${node_prefix}"
    tar -xJf "${tmp}/node.tar.xz" -C "${node_prefix}" --strip-components=1
    rm -rf "${tmp}"
  fi
  export PATH="${node_prefix}/bin:${PATH}"
  if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
    echo "export PATH=\"${node_prefix}/bin:\$PATH\"" >> "${CLAUDE_ENV_FILE}"
  fi
fi

npm_version="$(node -p 'require("./package.json").packageManager.split("@")[1]')"
if [ "$(npm -v)" != "${npm_version}" ]; then
  npm install --global "npm@${npm_version}" --no-audit --no-fund
fi

git submodule update --init --recursive

if ! node scripts/check-dependency-install.mjs > /dev/null 2>&1; then
  npm ci --no-audit --no-fund
fi

npm run build:cached
