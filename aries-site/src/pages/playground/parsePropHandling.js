/**
 * Given the full text of prop-handling.md and a component name,
 * returns an array of { prop, csvType, handling, rationale } rows
 * parsed from that component's markdown table.
 */
export function parsePropHandlingSection(mdText, componentName) {
  const lines = mdText.split('\n');

  // Find the ## ComponentName heading
  const headingIdx = lines.findIndex(
    l => l.trim() === `## ${componentName}`,
  );
  if (headingIdx === -1) return [];

  // Collect table rows until the next ## heading or end of file
  const tableLines = [];
  for (let i = headingIdx + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith('## ')) break;
    if (line.trimStart().startsWith('|')) tableLines.push(line);
  }

  // tableLines[0] = header row, tableLines[1] = separator, [2..] = data
  if (tableLines.length < 3) return [];

  return tableLines.slice(2).map(line => {
    const cells = line
      .split('|')
      .slice(1, -1)
      .map(c => c.trim());
    const [prop = '', csvType = '', handling = '', rationale = ''] =
      cells;
    return { prop, csvType, handling, rationale };
  });
}
