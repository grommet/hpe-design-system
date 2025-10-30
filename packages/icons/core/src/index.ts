const allIcons = import.meta.glob('./icons/*.svg', { eager: true });

/**
 * A utility function to format the icon name (e.g., 'home.svg' -> 'Home')
 * @param {string} path - The full path to the file (e.g., '../icons/home.svg')
 * @returns {string} The formatted icon name
 */
interface IconPath {
  path: string;
}

function getIconFileName(path: IconPath['path']): string {
  // 1. Get the filename (e.g., 'home.svg')
  const filename = path.split('/').pop()!;
  return filename;
}

function getIconName(filename: string): string {
  // 1. Remove the extension (e.g., 'home')
  const nameWithoutExt = filename.replace(/\.svg$/, '');
  // 2. Capitalize the first letter for a clean export name (e.g., 'Home')
  return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
}

const iconFiles = Object.keys(allIcons).map(getIconFileName);
const iconNames = Object.keys(iconFiles).map(getIconName);

export const IconFiles = iconFiles;
export const IconNames = iconNames;
export default iconFiles;