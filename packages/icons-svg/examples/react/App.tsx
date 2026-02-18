import { useState } from 'react';

// ---------------------------------------------------------------------------
// Approach 1: Import as URL
// The bundler (Vite/webpack) resolves the SVG to a URL string.
// Renders with <img>, so fill="currentColor" does NOT apply — the icon colour
// cannot be controlled via the CSS `color` property.
// ---------------------------------------------------------------------------
import addIconUrl from '@hpe-design/icons-svg/add.svg';
import closeIconUrl from '@hpe-design/icons-svg/close.svg';

// ---------------------------------------------------------------------------
// Approach 2: Import as raw string  (Vite: append `?raw`)
// Inject the SVG markup directly into the DOM so that fill="currentColor"
// inherits the CSS `color` of the wrapper element.
// ---------------------------------------------------------------------------
import searchIconRaw from '@hpe-design/icons-svg/search.svg?raw';
import homeIconRaw from '@hpe-design/icons-svg/home.svg?raw';

// ---------------------------------------------------------------------------
// Approach 3: Look up icon filenames from the metadata object, then load
// on-demand (useful when the icon name is only known at runtime).
// ---------------------------------------------------------------------------
import allIcons from '@hpe-design/icons-svg';

// ─── Reusable inline-SVG component ──────────────────────────────────────────

interface InlineSVGProps {
  /** Raw SVG markup string */
  svgContent: string;
  /** CSS color value — controls the icon fill via currentColor */
  color?: string;
  /** Icon dimensions in pixels (default 24) */
  size?: number;
  /** Accessible label */
  'aria-label'?: string;
}

function InlineSVG({ svgContent, color, size = 24, 'aria-label': ariaLabel }: InlineSVGProps) {
  return (
    <span
      style={{ color, display: 'inline-flex', width: size, height: size }}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

// ─── Dynamic icon loader ────────────────────────────────────────────────────

async function fetchIconRaw(iconName: string): Promise<string> {
  // `allIcons` maps PascalCase name → kebab-case filename, e.g. 'Add' → 'add.svg'
  const filename = allIcons[iconName];
  if (!filename) throw new Error(`Icon "${iconName}" not found`);

  // In a real app, replace the base URL with wherever @hpe-design/icons-svg is served.
  const res = await fetch(`/node_modules/@hpe-design/icons-svg/dist/${filename}`);
  if (!res.ok) throw new Error(`Failed to fetch icon: ${filename}`);
  return res.text();
}

// ─── Demo app ───────────────────────────────────────────────────────────────

export default function App() {
  const [dynamicSvg, setDynamicSvg] = useState<string | null>(null);
  const [dynamicName, setDynamicName] = useState('Settings');

  const handleLoad = async () => {
    const svg = await fetchIconRaw(dynamicName);
    setDynamicSvg(svg);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 640 }}>
      <h1>@hpe-design/icons-svg — React Examples</h1>

      {/* ------------------------------------------------------------------ */}
      <h2>Approach 1 — &lt;img&gt; tag (URL import, no colour control)</h2>
      <p>Use this when colour control is not needed.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <img src={addIconUrl} alt="Add" width={24} height={24} />
        <img src={closeIconUrl} alt="Close" width={24} height={24} />
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2>Approach 2 — Inline SVG (raw import, full colour control)</h2>
      <p>
        Import with <code>?raw</code> and inject via{' '}
        <code>dangerouslySetInnerHTML</code>. The icon's{' '}
        <code>fill="currentColor"</code> inherits the wrapper's CSS{' '}
        <code>color</code>.
      </p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <InlineSVG svgContent={searchIconRaw} color="#0073e7" size={24} aria-label="Search" />
        <InlineSVG svgContent={homeIconRaw}   color="#00c781" size={32} aria-label="Home" />
        <InlineSVG svgContent={searchIconRaw} color="#ff5757" size={48} aria-label="Search large" />
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2>Approach 3 — Dynamic fetch by icon name</h2>
      <p>
        Use the exported icon metadata object to resolve a name to a filename,
        then fetch the SVG on demand. Handy when the icon is unknown at build
        time.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <select
          value={dynamicName}
          onChange={e => { setDynamicName(e.target.value); setDynamicSvg(null); }}
        >
          {Object.keys(allIcons).slice(0, 20).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button onClick={handleLoad}>Load icon</button>
        {dynamicSvg && (
          <InlineSVG svgContent={dynamicSvg} color="#6633cc" size={32} aria-label={dynamicName} />
        )}
      </div>
    </div>
  );
}
