const allIcons = import.meta.glob('./icons/*.svg', { eager: true });

/**
 * A utility function to format the icon name (e.g., 'home.svg' -> 'Home')
 * @param {string} path - The full path to the file (e.g., '../icons/home.svg')
 * @returns {string} The formatted icon name
 */
interface IconPath {
  path: string;
}

function getIconName(path: IconPath['path']): string {
  // 1. Get the filename (e.g., 'home.svg')
  const filename = path.split('/').pop()!;
  // 2. Remove the extension (e.g., 'home')
  const nameWithoutExt = filename.replace(/\.svg$/, '');
  // 3. Capitalize the first letter for a clean export name (e.g., 'Home')
  return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
}

const iconNames = Object.keys(allIcons).map(getIconName);

const iconPaths = Object.keys(allIcons).reduce(
  (acc: Record<string, string>, path) => {
    const name = getIconName(path);
    // The path starts with '../icons/', but in the published package,
    // the 'dist' directory is the root of the install, so the icons
    // are accessed via the 'icons/' folder itself.
    const relativePath = path.replace('../', '');
    acc[name] = relativePath;
    return acc;
  },
  {},
);

export const Icons = iconPaths;
export const IconNames = iconNames;
