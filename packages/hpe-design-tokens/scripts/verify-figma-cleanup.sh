#!/bin/bash

# Verification script for Figma cleanup
# Run this after completing the 8-step Figma UI cleanup procedure
# This script verifies that duplicate remote library bindings have been removed

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "FIGMA CLEANUP VERIFICATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if environment variables are set
echo -e "${BLUE}Step 1: Checking environment variables...${NC}"
echo ""

if [ -z "$FILE_KEY_COMPONENT" ]; then
  echo -e "${RED}✗ FILE_KEY_COMPONENT is not set${NC}"
  echo "  Please set: export FILE_KEY_COMPONENT=<component_file_key>"
  exit 1
else
  echo -e "${GREEN}✓ FILE_KEY_COMPONENT is set${NC}"
fi

if [ -z "$FIGMA_COMPONENT_COLLECTION_KEY" ]; then
  echo -e "${RED}✗ FIGMA_COMPONENT_COLLECTION_KEY is not set${NC}"
  echo "  This should be the remote collection key (e.g., the key for the component collection library)"
  exit 1
else
  echo -e "${GREEN}✓ FIGMA_COMPONENT_COLLECTION_KEY is set${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Querying all collections in component file...${NC}"
echo ""

# Query all collections in component file
echo "Running: pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collections --source=local --file-key=$FILE_KEY_COMPONENT --format=json"
echo ""

COLLECTIONS_OUTPUT=$(pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collections --source=local --file-key="$FILE_KEY_COMPONENT" --format=json 2>/dev/null)

# Check for color and dimension collections
COLOR_COLLECTIONS=$(echo "$COLLECTIONS_OUTPUT" | jq '[.collections[] | select(.name == "color")] | length' 2>/dev/null || echo "0")
DIMENSION_COLLECTIONS=$(echo "$COLLECTIONS_OUTPUT" | jq '[.collections[] | select(.name == "dimension")] | length' 2>/dev/null || echo "0")

echo "Found collections in component file:"
echo "  - color: $COLOR_COLLECTIONS collection(s)"
echo "  - dimension: $DIMENSION_COLLECTIONS collection(s)"
echo ""

# Display all remote collections
echo -e "${BLUE}Remote collections in component file:${NC}"
echo "$COLLECTIONS_OUTPUT" | jq '.collections[] | select(.remote == true) | {name, key, remote}' 2>/dev/null || echo "Could not parse output"

echo ""
echo -e "${BLUE}Step 3: Detailed color collection info...${NC}"
echo ""

# Query color collection details
COLOR_ID=$(echo "$COLLECTIONS_OUTPUT" | jq -r '.collections[] | select(.name == "color") | .id' | head -1)

if [ -n "$COLOR_ID" ] && [ "$COLOR_ID" != "null" ]; then
  echo "Running: pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collection-by-id --source=local --file-key=$FILE_KEY_COMPONENT --collection-id=$COLOR_ID --format=json"
  echo ""
  
  COLOR_DETAIL=$(pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collection-by-id --source=local --file-key="$FILE_KEY_COMPONENT" --collection-id="$COLOR_ID" --format=json 2>/dev/null)
  
  echo "$COLOR_DETAIL" | jq '.collections[] | {name, key, remote, fileKey, sourceType}' 2>/dev/null || echo "Could not parse color details"
  
  # Count remote sources
  REMOTE_COUNT=$(echo "$COLOR_DETAIL" | jq '[.collections[] | select(.remote == true)] | length' 2>/dev/null || echo "0")
  
  echo ""
  if [ "$REMOTE_COUNT" -eq 1 ]; then
    echo -e "${GREEN}✓ Color collection: Only 1 remote source (cleanup successful)${NC}"
  else
    echo -e "${RED}✗ Color collection: Found $REMOTE_COUNT remote sources (duplicate still exists)${NC}"
  fi
else
  echo -e "${YELLOW}⚠ Could not find color collection ID${NC}"
fi

echo ""
echo -e "${BLUE}Step 4: Detailed dimension collection info...${NC}"
echo ""

# Query dimension collection details
DIMENSION_ID=$(echo "$COLLECTIONS_OUTPUT" | jq -r '.collections[] | select(.name == "dimension") | .id' | head -1)

if [ -n "$DIMENSION_ID" ] && [ "$DIMENSION_ID" != "null" ]; then
  echo "Running: pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collection-by-id --source=local --file-key=$FILE_KEY_COMPONENT --collection-id=$DIMENSION_ID --format=json"
  echo ""
  
  DIMENSION_DETAIL=$(pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collection-by-id --source=local --file-key="$FILE_KEY_COMPONENT" --collection-id="$DIMENSION_ID" --format=json 2>/dev/null)
  
  echo "$DIMENSION_DETAIL" | jq '.collections[] | {name, key, remote, fileKey, sourceType}' 2>/dev/null || echo "Could not parse dimension details"
  
  # Count remote sources
  REMOTE_COUNT=$(echo "$DIMENSION_DETAIL" | jq '[.collections[] | select(.remote == true)] | length' 2>/dev/null || echo "0")
  
  echo ""
  if [ "$REMOTE_COUNT" -eq 1 ]; then
    echo -e "${GREEN}✓ Dimension collection: Only 1 remote source (cleanup successful)${NC}"
  else
    echo -e "${RED}✗ Dimension collection: Found $REMOTE_COUNT remote sources (duplicate still exists)${NC}"
  fi
else
  echo -e "${YELLOW}⚠ Could not find dimension collection ID${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "If all checks show ✓, you can proceed with:"
echo "  pnpm sync-tokens-to-figma"
echo ""
