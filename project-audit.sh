#!/bin/bash

REPORT="PROJECT-AUDIT.txt"

exec > >(tee "$REPORT") 2>&1

echo "=================================================="
echo "        CHINAPLANET PROJECT AUDIT"
echo "        $(date)"
echo "=================================================="
echo ""

echo "===== 1. ENVIRONMENT ====="
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"
echo "Next: $(node -e "try{console.log(require('next/package.json').version)}catch(e){console.log('N/A')}")"
echo "TypeScript: $(node -e "try{console.log(require('typescript/package.json').version)}catch(e){console.log('N/A')}")"
echo ""

echo "===== 2. GIT STATUS ====="
git status --short 2>/dev/null || true
echo ""

echo "===== 3. ACTIVE SOURCE FILES ====="
find app lib \
  -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.css' \) \
  ! -name '*.backup.*' \
  ! -name '*.bak' \
  ! -name '*.old' \
  ! -name '*.current.*' \
  ! -name '*.before-*' \
  ! -name '*.disabled' \
  | sort
echo ""

echo "===== 4. ROUTES ====="
find app \
  -type f \
  \( -name 'page.tsx' -o -name 'page.ts' -o -name 'route.ts' -o -name 'route.js' -o -name 'layout.tsx' -o -name 'layout.ts' \) \
  | sort
echo ""

echo "===== 5. TYPESCRIPT CHECK ====="
npx tsc --noEmit
TS_STATUS=$?
echo "TypeScript exit code: $TS_STATUS"
echo ""

echo "===== 6. ESLINT — ACTIVE CODE ONLY ====="
npx eslint app lib proxy.ts \
  --ignore-pattern '*.backup.*' \
  --ignore-pattern '*.bak' \
  --ignore-pattern '*.old' \
  --ignore-pattern '*.current.*' \
  --ignore-pattern '*.before-*' \
  --ignore-pattern '*.disabled'
LINT_STATUS=$?
echo "ESLint exit code: $LINT_STATUS"
echo ""

echo "===== 7. NEXT BUILD ====="
npm run build
BUILD_STATUS=$?
echo "Build exit code: $BUILD_STATUS"
echo ""

echo "===== 8. SECURITY — ENV FILE NAMES ONLY ====="
find . -maxdepth 2 -type f \
  \( -name '.env' -o -name '.env.*' \) \
  ! -name 'node_modules' \
  -print | sort
echo ""

echo "===== 9. POSSIBLE SECRETS IN SOURCE ====="
grep -RniE \
  'sk-[A-Za-z0-9_-]+|OPENAI_API_KEY|GEMINI_API_KEY|SUPABASE_SERVICE_ROLE|SERVICE_ROLE_KEY|DATABASE_URL|RESEND_API_KEY|WHATSAPP.*TOKEN' \
  app lib proxy.ts \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude='*.backup.*' \
  --exclude='*.bak' \
  --exclude='*.before-*' \
  --exclude='*.disabled' \
  2>/dev/null \
  | sed -E 's/(sk-[A-Za-z0-9_-]{4})[A-Za-z0-9_-]+/\1...[REDACTED]/g'
echo ""

echo "===== 10. DEBUG LOGS — ACTIVE CODE ====="
grep -RniE 'console\.(log|error|warn)' \
  app lib proxy.ts \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude='*.backup.*' \
  --exclude='*.bak' \
  --exclude='*.before-*' \
  --exclude='*.disabled' \
  2>/dev/null | head -150
echo ""

echo "===== 11. TODO / FIXME / HACK ====="
grep -RniE 'TODO|FIXME|XXX|HACK' \
  app lib proxy.ts \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude='*.backup.*' \
  --exclude='*.bak' \
  --exclude='*.before-*' \
  --exclude='*.disabled' \
  2>/dev/null | head -150
echo ""

echo "===== 12. BACKUP / OLD FILES ====="
find app lib .backups \
  -type f \
  \( \
    -name '*.backup.*' -o \
    -name '*.bak' -o \
    -name '*.old' -o \
    -name '*.current.*' -o \
    -name '*.before-*' -o \
    -name '*.disabled' \
  \) 2>/dev/null | sort
echo ""

echo "===== 13. DEPENDENCY AUDIT ====="
npm audit --omit=dev
AUDIT_STATUS=$?
echo "npm audit exit code: $AUDIT_STATUS"
echo ""

echo "===== 14. OUTDATED PACKAGES ====="
npm outdated 2>/dev/null || true
echo ""

echo "===== 15. PACKAGE SCRIPTS ====="
node - <<'NODE'
const p = require('./package.json');

console.log(JSON.stringify({
  name: p.name,
  version: p.version,
  scripts: p.scripts,
  dependencies: p.dependencies,
  devDependencies: p.devDependencies
}, null, 2));
NODE

echo ""
echo "===== 16. PROJECT SIZE ====="
du -sh . 2>/dev/null
du -sh app lib public .next node_modules .git .backups 2>/dev/null
echo ""

echo "===== 17. LARGE ACTIVE SOURCE FILES ====="
find app lib \
  -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \) \
  ! -name '*.backup.*' \
  ! -name '*.bak' \
  ! -name '*.before-*' \
  ! -name '*.disabled' \
  -exec wc -l {} \; 2>/dev/null \
  | sort -nr | head -30
echo ""

echo "===== 18. DUPLICATE BASENAME CHECK ====="
find app lib \
  -type f \
  ! -name '*.backup.*' \
  ! -name '*.bak' \
  ! -name '*.before-*' \
  ! -name '*.disabled' \
  -exec basename {} \; 2>/dev/null \
  | sort | uniq -d
echo ""

echo "===== 19. NPM INSTALL SCRIPTS ====="
npm approve-scripts --allow-scripts-pending 2>/dev/null || true
echo ""

echo "=================================================="
echo "AUDIT FINISHED"
echo "=================================================="
echo "TypeScript: $TS_STATUS"
echo "ESLint:     $LINT_STATUS"
echo "Build:      $BUILD_STATUS"
echo "Audit:      $AUDIT_STATUS"
echo ""
echo "REPORT: $REPORT"
echo "=================================================="
