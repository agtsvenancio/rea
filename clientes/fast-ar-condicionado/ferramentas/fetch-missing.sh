#!/bin/bash
# usage: fetch-missing.sh <list-of-localhost-urls> <espelho-dir> <cafile>
D=fastarcondicionado.seuprojeto.online
grep -oE "http://localhost:8080/wp-[^ )]+" "$1" | sed 's|http://localhost:8080/||' | grep -v '^wp-json' | sort -u | while read p; do
  clean="${p%%\?*}"
  mkdir -p "$2/$D/$(dirname "$clean")"
  curl -sS --cacert "$3" -o "$2/$D/$clean" "https://$D/$p" -w "%{http_code} $clean\n"
done
