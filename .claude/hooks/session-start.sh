#!/bin/bash
# Prepare Claude Code cloud sessions only; local checkouts keep their own toolchain.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Keep build output out of the session context.
exec "${CLAUDE_PROJECT_DIR}/scripts/cloud-session-setup.sh" >&2
