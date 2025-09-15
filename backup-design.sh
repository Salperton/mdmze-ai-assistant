#!/bin/bash

# Design Backup Script
# Usage: ./backup-design.sh [backup-name]

BACKUP_NAME=${1:-"backup-$(date +%Y%m%d-%H%M%S)"}
BACKUP_DIR="design-backups"

echo "🎨 Creating design backup: $BACKUP_NAME"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
cp -r src/app/page.tsx "$BACKUP_DIR/page-$BACKUP_NAME.tsx"
cp -r src/components/Header.tsx "$BACKUP_DIR/Header-$BACKUP_NAME.tsx"
cp -r src/app/globals.css "$BACKUP_DIR/globals-$BACKUP_NAME.css"

echo "✅ Backup created in $BACKUP_DIR/"
echo "📁 Files backed up:"
echo "   - page-$BACKUP_NAME.tsx"
echo "   - Header-$BACKUP_NAME.tsx" 
echo "   - globals-$BACKUP_NAME.css"

echo ""
echo "🔄 To restore a backup:"
echo "   cp $BACKUP_DIR/page-$BACKUP_NAME.tsx src/app/page.tsx"
echo "   cp $BACKUP_DIR/Header-$BACKUP_NAME.tsx src/components/Header.tsx"
echo "   cp $BACKUP_DIR/globals-$BACKUP_NAME.css src/app/globals.css"
