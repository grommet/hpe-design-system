/**
 * Codemod for migrating from grommet-icons to @hpe-design/icons-grommet
 * Usage: npx hpe-design-system-codemods migrate-grommet-icons-to-hpe <path>
 */

/* eslint-disable no-param-reassign */

// Icon name mapping from grommet-icons to @hpe-design/icons-grommet
const ICON_MAPPING = {
  // Remapped icons
  Action: 'Connect',
  AddCircle: 'Add',
  AidOption: 'Aid',
  AppsRounded: 'Apps',
  BarChart: 'ChartBar',
  Basket: 'Cart',
  CaretDownFill: 'CaretDown',
  CaretLeftFill: 'CaretLeft',
  CaretNext: 'CaretRight',
  CaretPrevious: 'CaretLeft',
  CaretRightFill: 'CaretRight',
  CaretUpFill: 'CaretUp',
  CatalogOption: 'Catalog',
  ChatOption: 'ChatConversation',
  CircleAlert: 'Alert',
  CircleInformation: 'Info',
  CirclePlay: 'Play',
  CircleQuestion: 'Help',
  ClearOption: 'Erase',
  Cli: 'Console',
  ContactInfo: 'Contact',
  ContextualHelp: 'Help',
  DisabledOutline: 'StatusDisabled',
  DownloadOption: 'Download',
  Drawer: 'Inbox',
  EmptyCircle: 'CircleEmpty',
  FanOption: 'Fan',
  FlagFill: 'Flag',
  FormAdd: 'Add',
  FormAttachment: 'Attachment',
  FormCalendar: 'Calendar',
  FormCheckmark: 'Checkmark',
  FormClock: 'Clock',
  FormClose: 'Close',
  FormCut: 'Cut',
  FormDown: 'Down',
  FormEdit: 'Edit',
  FormFilter: 'Filter',
  FormFolder: 'Folder',
  FormLocation: 'Location',
  FormLock: 'Lock',
  FormNext: 'Right',
  FormNextLink: 'LinkNext',
  FormPin: 'Pin',
  FormPrevious: 'Left',
  FormPreviousLink: 'LinkPrev',
  FormRefresh: 'Refresh',
  FormSchedule: 'Calendar',
  FormSearch: 'Search',
  FormSubtract: 'Subtract',
  FormTrash: 'Trash',
  FormUp: 'Up',
  FormUpload: 'Upload',
  FormView: 'View',
  FormViewHide: 'Hide',
  GenAI: 'AIGen',
  GenAIFill: 'AIGenFill',
  HelpOption: 'Help',
  HomeOption: 'Home',
  HomeRounded: 'Home',
  Indicator: 'Location',
  InstallOption: 'Install',
  Launch: 'Deploy',
  License: 'Certificate',
  LineChart: 'ChartLine',
  LinkDown: 'LinkBottom',
  LinkPrevious: 'LinkPrev',
  LinkUp: 'LinkTop',
  MailOption: 'Mail',
  MapLocation: 'Map',
  Next: 'Right',
  OrderedList: 'ListOrdered',
  PieChart: 'ChartPie',
  Plan: 'Calendar',
  Plug: 'Connect',
  PowerShutdown: 'Power',
  Previous: 'Left',
  Radial: 'CircleEmpty',
  RadialSelected: 'CircleFill',
  Schedule: 'Calendar',
  SettingsOption: 'Settings',
  ShareOption: 'Share',
  ShareRounded: 'Share',
  Star: 'StarFill',
  StarOutline: 'Star',
  StatusCriticalSmall: 'StatusCritical',
  StatusDisabledSmall: 'StatusDisabled',
  StatusGoodSmall: 'StatusGood',
  StatusInfoSmall: 'StatusInfo',
  StatusUnknownSmall: 'StatusUnknown',
  StatusWarningSmall: 'StatusWarning',
  StepsOption: 'Steps',
  SubtractCircle: 'Subtract',
  TapeOption: 'Tape',
  Tasks: 'Progress',
  Terminal: 'Console',
  Tip: 'ToolTip',
  Tree: 'TreeNode',
  TreeOption: 'Tree',
  Troubleshoot: 'Tools',
  UnorderedList: 'ListUnordered',
  UploadOption: 'Upload',
  VolumeControl: 'Dial',
};

// Deprecated icons with no direct replacement
const DEPRECATED_ICONS = new Set([
  // Glyphs
  'BlockQuote',
  'Bold',
  'BottomCorner',
  'Capacity',
  'Centos',
  'Checkbox',
  'CheckboxSelected',
  'Css3',
  'Emoji',
  'Fireball',
  'Gremlin',
  'Html5',
  'Italic',
  'Java',
  'Js',
  'Monospace',
  'Sort',
  'ScheduleNew',
  'SchedulePlay',
  'Schedules',
  'StatusPlaceholder',
  'StatusPlaceholderSmall',
  'StrikeThrough',
  'Stripe',
  'Subscript',
  'Superscript',
  'TextAlignCenter',
  'TextAlignFull',
  'TextAlignLeft',
  'TextAlignRight',
  'Toast',
  'TopCorner',
  'Underline',
  // Logos
  'AdobeCreativeCloud',
  'Amazon',
  'Amex',
  'Android',
  'Apple',
  'AppleAppStore',
  'AppleMusic',
  'ApplePodcasts',
  'Archlinux',
  'Aruba',
  'Bitcoin',
  'Chrome',
  'Cloudlinux',
  'Codepen',
  'CodeSandbox',
  'CreativeCommons',
  'Debian',
  'Docker',
  'Dos',
  'Dribbble',
  'Dropbox',
  'Dxc',
  'Ebay',
  'Edge',
  'Ezmeral',
  'Facebook',
  'FacebookOption',
  'Fedora',
  'Figma',
  'Firefox',
  'Freebsd',
  'Gatsbyjs',
  'Github',
  'Golang',
  'Google',
  'GooglePay',
  'GooglePlay',
  'GooglePlus',
  'GoogleWallet',
  'GraphQl',
  'Grommet',
  'Hadoop',
  'Heroku',
  'Horton',
  'Hp',
  'Hpe',
  'HpeLabs',
  'Hpi',
  'Instagram',
  'InternetExplorer',
  'Kubernetes',
  'Lastfm',
  'Linkedin',
  'LinkedinOption',
  'Mandriva',
  'Mastercard',
  'Medium',
  'Meta',
  'Microfocus',
  'Mysql',
  'Node',
  'Norton',
  'Npm',
  'Onedrive',
  'Opera',
  'Oracle',
  'Paypal',
  'Skype',
  'Slack',
  'Snapchat',
  'Solaris',
  'Soundcloud',
  'Spectrum',
  'Spotify',
  'Square',
  'StackOverflow',
  'PiedPiper',
  'Pinterest',
  'Pocket',
  'ProductHunt',
  'Raspberry',
  'Reactjs',
  'Reddit',
  'Redhat',
  'SafariOption',
  'SamsungPay',
  'Sco',
  'Suse',
  'Swift',
  'Threads',
  'Tiktok',
  'Tumblr',
  'Turbolinux',
  'Twitch',
  'Twitter',
  'Ubuntu',
  'Venmo',
  'Vimeo',
  'Visa',
  'Vmware',
  'WeChat',
  'WhatsApp',
  'Windows',
  'WindowsLegacy',
  'Wordpress',
  'X',
  'Xing',
  'Youtube',
  'Zoom',
]);

const OLD_PACKAGE = 'grommet-icons';
const NEW_PACKAGE = '@hpe-design/icons-grommet';

module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const { quote } = options;

  let hasModifications = false;
  const deprecatedUsages = [];

  // Detect the predominant quote style in the file
  let singleQuoteCount = 0;
  let doubleQuoteCount = 0;

  // Find all import declarations from grommet-icons (including subpaths)
  root
    .find(j.ImportDeclaration)
    .filter(path => {
      const source = path.value.source.value;
      return typeof source === 'string' && source.startsWith(OLD_PACKAGE);
    })
    .forEach(path => {
      hasModifications = true;
      const originalSource = path.value.source.value;
      const importSpecifiers = path.value.specifiers;
      const newSpecifiers = [];

      // Extract the subpath if it exists
      // e.g., "grommet-icons/icons/StatusGoodSmall" -> "/icons/StatusGoodSmall"
      const subPath = originalSource.substring(OLD_PACKAGE.length);

      // For subpath imports like "grommet-icons/icons/StatusGoodSmall",
      // we need to extract the icon name and handle both default and named
      // imports
      if (subPath) {
        // Extract icon name from subpath (last segment)
        const pathSegments = subPath.split('/').filter(Boolean);
        const iconNameFromPath = pathSegments[pathSegments.length - 1];

        // Process each imported icon from subpath
        importSpecifiers.forEach(specifier => {
          let iconName;
          let localName;

          if (specifier.type === 'ImportDefaultSpecifier') {
            // Default import: import StatusGoodSmall from
            // 'grommet-icons/icons/StatusGoodSmall'
            iconName = iconNameFromPath;
            localName = specifier.local.name;
          } else if (specifier.type === 'ImportSpecifier') {
            // Named import: import { StatusGoodSmall } from
            // 'grommet-icons/icons/StatusGoodSmall'
            iconName = specifier.imported.name;
            localName = specifier.local.name;
          } else {
            // Namespace imports, etc.
            newSpecifiers.push(specifier);
            return;
          }

          // Check if icon is deprecated
          if (DEPRECATED_ICONS.has(iconName)) {
            deprecatedUsages.push({
              icon: iconName,
              localName,
            });
            console.warn(
              `⚠️  Warning: Icon "${iconName}" is deprecated with ` +
                'no direct replacement. Please review usage and find a ' +
                `suitable alternative. (${file.path})`,
            );
          }

          // Check if icon needs to be remapped
          const newName = ICON_MAPPING[iconName] || iconName;

          // Update local references if the local name matches the icon name
          if (localName === iconName && newName !== iconName) {
            // Update all JSXOpeningElement references
            root.find(j.JSXIdentifier, { name: iconName }).forEach(jsxPath => {
              jsxPath.value.name = newName;
            });

            // Update all Identifier references
            root
              .find(j.Identifier, { name: iconName })
              .filter(identPath => {
                return (
                  identPath.parent.value.type !== 'ImportDefaultSpecifier' &&
                  identPath.parent.value.type !== 'ImportSpecifier'
                );
              })
              .forEach(identPath => {
                identPath.value.name = newName;
              });
          }

          // Convert to named import for new package
          // All imports become named imports in the new package
          if (iconName === localName || newName !== iconName) {
            // Simple case: import { NewIcon } from '@hpe-design/icons-grommet'
            newSpecifiers.push(
              j.importSpecifier(
                j.identifier(newName),
                j.identifier(newName !== iconName ? newName : localName),
              ),
            );
          } else {
            // Aliased case: import { NewIcon as LocalName } from
            // '@hpe-design/icons-grommet'
            newSpecifiers.push(
              j.importSpecifier(j.identifier(newName), j.identifier(localName)),
            );
          }
        });
      } else {
        // Handle regular named imports from main package
        // Process each imported icon
        importSpecifiers.forEach(specifier => {
          if (specifier.type === 'ImportSpecifier') {
            const importedName = specifier.imported.name;
            const localName = specifier.local.name;

            // Check if icon is deprecated
            if (DEPRECATED_ICONS.has(importedName)) {
              deprecatedUsages.push({
                icon: importedName,
                localName,
              });
              console.warn(
                `⚠️  Warning: Icon "${importedName}" is deprecated with ` +
                  'no direct replacement. Please review usage and find a ' +
                  `suitable alternative. (${file.path})`,
              );
              // Still keep the import to avoid breaking the code
              newSpecifiers.push(specifier);
            } else {
              // Check if icon needs to be remapped
              const newName = ICON_MAPPING[importedName] || importedName;

              if (newName !== importedName) {
                // Icon is remapped
                if (importedName === localName) {
                  // Simple import: import { OldIcon } from 'grommet-icons'
                  // Becomes: import { NewIcon } from
                  // '@hpe-design/icons-grommet'
                  newSpecifiers.push(
                    j.importSpecifier(
                      j.identifier(newName),
                      j.identifier(newName),
                    ),
                  );
                } else {
                  // Aliased import:
                  // import { OldIcon as MyIcon } from 'grommet-icons'
                  // Becomes: import { NewIcon as MyIcon } from
                  // '@hpe-design/icons-grommet'
                  newSpecifiers.push(
                    j.importSpecifier(
                      j.identifier(newName),
                      j.identifier(localName),
                    ),
                  );
                }

                // Only need to update JSX references if the local name
                // was the same as imported
                if (importedName === localName) {
                  // Update all JSXOpeningElement references
                  root
                    .find(j.JSXIdentifier, { name: importedName })
                    .forEach(jsxPath => {
                      jsxPath.value.name = newName;
                    });

                  // Update all Identifier references
                  // (e.g., variable assignments, function calls)
                  root
                    .find(j.Identifier, { name: importedName })
                    .filter(identPath => {
                      // Don't replace import specifiers
                      // (we already handled those)
                      return identPath.parent.value.type !== 'ImportSpecifier';
                    })
                    .forEach(identPath => {
                      identPath.value.name = newName;
                    });
                }
              } else {
                // Icon name unchanged
                newSpecifiers.push(specifier);
              }
            }
          } else {
            // Handle default imports or namespace imports
            // (though unlikely for icon libraries)
            newSpecifiers.push(specifier);
          }
        });
      }

      // Update the import declaration
      if (newSpecifiers.length > 0) {
        path.value.specifiers = newSpecifiers;

        // For subpath imports, preserve subpath structure in new package
        // e.g., 'grommet-icons/icons/Grow' -> '@hpe-design/icons-grommet/...'
        let newSource;
        if (subPath) {
          newSource = NEW_PACKAGE + subPath;
        } else {
          newSource = NEW_PACKAGE;
        }

        path.value.source.value = newSource;

        // Preserve the original quote style from the source
        const originalRaw = path.value.source.raw;
        const usesDoubleQuotes = originalRaw && originalRaw.startsWith('"');

        // Count quote usage for overall file quote preference
        if (usesDoubleQuotes) {
          doubleQuoteCount += 1;
          path.value.source.raw = `"${newSource}"`;
        } else {
          singleQuoteCount += 1;
          path.value.source.raw = `'${newSource}'`;
        }
      } else {
        // If no specifiers remain, remove the import
        j(path).remove();
      }
    });

  if (deprecatedUsages.length > 0 && !hasModifications) {
    // If we only found deprecated icons, still mark as modified
    hasModifications = true;
  }

  // Use the predominant quote style for the toSource options
  const predominantQuote =
    doubleQuoteCount > singleQuoteCount ? 'double' : 'single';

  return hasModifications
    ? root.toSource({ quote: quote || predominantQuote })
    : null;
};
