// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { ARCHITECTURES, SURFACE_VARIANTS } from '../surfaces';
import { buildVariantTheme } from '../theme';
import { stepName } from '../layouts/steps';
import { PAGES } from './pages';

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };
const PR = 'https://github.com/grommet/hpe-design-system/pull';

const T = name => `background-surface-${name}`;
const short = token => token.replace('background-surface-', '');

const ROLE_LABELS = {
  root: 'Grommet root',
  chrome: 'Shell chrome',
  sheet: 'Content sheet',
  panel: 'Contextual panel',
  card: 'Cards',
  inner: 'Panels inside a card',
  overlayNav: 'Local nav in a Layer',
};

// What each architecture is, what it costs, and what the previews show.
// `formerly` is its letter in the earlier exploration of eight
// architectures.
const DETAILS = {
  roles: {
    formerly: 'A′',
    brief:
      'Two unordered tones for containers, plus two architectural roots: base (the page) and floating (over the page). The token set decided in #5969, read with the workspace kept base even when shell chrome wraps it, which would amend decisions 13 and 23.',
    tokens: [T('base'), T('tone-1'), T('tone-2'), T('floating')],
    summary:
      'Four tokens. A container takes whichever tone its parent is not; roots start a chain. The shell chrome is a tone-1 container on the root, and the workspace sheet inside it is base whether or not chrome surrounds it: the alternation rule applies to containers, and the page is not a container. Cards and inner panels alternate from base exactly as on a page beside the shell; the contextual panel is a second sheet (base).',
    tradeoff:
      'No token change from #5969, base stays on the page, and dark reaches all three steps. Costs: this is a proposed reading of decisions 13 and 23 for chrome that wraps the workspace, not their literal text; base becomes legal inside a tone-1 container, and one misuse (base on a white card inside a shell panel) is invisible in light mode; the frame shares tone-1 with the cards, so a theme cannot colour one without the other.',
    notes: [
      [
        'Framed shell',
        'Chrome tone-1, content sheet and AI panel base, cards tone-1, panels inside cards tone-2.',
      ],
      [
        'Grey page',
        'Peer surface theme, light values only: base and tone-2 take grey.50, tone-1 takes white; dark unchanged. Grey page, white cards, and a white frame, because the chrome is tone-1 too.',
      ],
      [
        'Beside shell',
        'Page base. The rail, local nav and contextual panel are tone-1 containers on it, as the cards are; cards inside the contextual panel take tone-2. Nothing else changes when there is no frame.',
      ],
    ],
  },
  scale: {
    formerly: 'C',
    brief:
      'Tones only: every surface, including the page, is a step on one scale. Two steps today (tone-1 and tone-2), which alternate; a further need would become tone-3. There is no base.',
    tokens: [T('tone-1'), T('tone-2'), T('floating')],
    summary:
      'Three tokens. The Grommet root, chrome, sheet, panel, cards and inner panels alternate tone-1 / tone-2, with no page root. tone-2’s dark value is re-valued to grey.1300 so the page reaches the deepest step. floating remains for UI over the page. With two steps the rule is still “take the tone your parent is not”; choosing a third step would need an order or a judgement.',
    tradeoff:
      'Smallest vocabulary, and nothing to decide about roots. Costs: dark has two values, so a panel inside a card repeats the page colour; floating (grey.1200) no longer shares tone-2’s value in dark; and when migrating from the legacy tokens the page maps to tone-2, not base.',
    notes: [
      [
        'Framed shell',
        'Chrome tone-1, sheet and AI panel tone-2 (grey.1300 in dark), cards tone-1, panels inside cards tone-2.',
      ],
      [
        'Grey page',
        'Light values swapped (tone-2 takes grey.50, tone-1 takes white); dark unchanged. Grey page, white frame, white cards.',
      ],
      [
        'Beside shell',
        'Page tone-2; rail, local nav, contextual panel and cards tone-1; cards inside the contextual panel tone-2, which repeats the page’s value in dark.',
      ],
    ],
  },
  frame: {
    formerly: 'D',
    brief:
      'Tonal with roles plus one more root, frame, for chrome that surrounds the page. Three roots named by their relationship to the page: base (in), frame (around), floating (over).',
    tokens: [T('base'), T('frame'), T('floating'), T('tone-1'), T('tone-2')],
    summary:
      'Five tokens. frame is a surface root for chrome that wraps the workspace; the page inside it is base and tones restart from there. In this prototype frame takes tone-1’s values (grey.50 / grey.1000), so it needs no new reference value and paints exactly as Tonal with roles; the difference is that it is its own token.',
    tradeoff:
      'The same picture as Tonal with roles, with a name for the frame and a separate handle on it: a theme can re-value the frame without touching the cards. Costs: a fifth consumer token; decision 13 (“shell is a container, not a ground”) changes for chrome that wraps the workspace; and the first tone on a frame (tone-2) has to be stated as policy, because it cannot be derived from values.',
    notes: [
      [
        'Framed shell',
        'Chrome frame, content sheet and AI panel base, cards tone-1, panels inside cards tone-2.',
      ],
      [
        'Grey page',
        'Light values swapped; frame follows tone-1 to white here, and a theme could re-value it on its own (grey.200, or grey.50 to merge with the page).',
      ],
      [
        'Beside shell',
        'No frame to paint: the panels are tone-1 containers on base, so it renders exactly as Tonal with roles and the frame token is unused.',
      ],
    ],
  },
};

const COMPARE = [
  {
    label: 'Tokens',
    values: ['4', '3 (no base)', '5 (adds frame)'],
  },
  {
    label: 'Framed shell: page is base?',
    values: ['Yes', 'No: base is unused', 'Yes'],
  },
  {
    label: 'Framed shell, dark: chrome → sheet → card → inner',
    values: [
      '1000 → 1300 → 1000 → 1200',
      '1000 → 1300 → 1000 → 1300',
      '1000 → 1300 → 1000 → 1200',
    ],
  },
  {
    label: 'Grey page via peer theme',
    values: [
      'Works; chrome turns white with the cards',
      'Works; chrome turns white with the cards',
      'Works; frame takes tone-1’s white here, so it looks the same',
    ],
  },
  {
    label: 'Frame themed independently of cards',
    values: [
      'No: the frame is tone-1',
      'No: the frame is tone-1',
      'Yes by design; not shown in these previews',
    ],
  },
  {
    label: 'floating in dark',
    values: [
      'Shares tone-2’s value',
      'Differs from tone-2 (1200 vs 1300)',
      'Shares tone-2’s value',
    ],
  },
  {
    label: 'Beside shell (#6635, #6660)',
    values: [
      'Page base, panels tone-1',
      'Page tone-2, panels tone-1',
      'Same as Tonal with roles; frame is unused',
    ],
  },
  {
    label: 'Beside shell, dark: page → panel → card in panel',
    values: ['1300 → 1000 → 1200', '1300 → 1000 → 1300', '1300 → 1000 → 1200'],
  },
  {
    label: 'Change to #5969 if adopted',
    values: [
      'None in tokens; amend decisions 13 and 23',
      'Drop base; re-value tone-2',
      'Add a frame root; amend decisions 13 and 23',
    ],
  },
];

// A token with its light and dark values under one variant's theme.
const Swatch = ({ token, theme }) => {
  const value = theme.global.colors[token];
  return (
    <Box direction="row" gap="small" align="center">
      <Box direction="row" gap="xsmall" flex={false}>
        {['light', 'dark'].map(mode => (
          <Box
            key={mode}
            width="24px"
            height="24px"
            round="xsmall"
            border={{ color: 'border-strong' }}
            background={value[mode]}
            title={`${mode}: ${value[mode]}`}
          />
        ))}
      </Box>
      <Box>
        <Text size="small" weight={500} style={MONO}>
          {short(token)}
        </Text>
        <Text size="xsmall" color="text-weak" style={MONO}>
          {stepName(value.light)} · {stepName(value.dark)}
        </Text>
      </Box>
    </Box>
  );
};

Swatch.propTypes = {
  token: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

const HeaderCell = ({ children }) => (
  <TableCell scope="col">
    <Text size="small" weight={500}>
      {children}
    </Text>
  </TableCell>
);

HeaderCell.propTypes = { children: PropTypes.node };

// Role -> token for one architecture, white page beside grey page. A peer
// theme keeps the token and changes the light value.
const RoleTable = ({ architecture }) => {
  const columns = ['white', 'grey'].map(key => {
    const variantId = architecture.variants[key];
    return {
      key,
      tokens: SURFACE_VARIANTS[variantId].tokens,
      theme: buildVariantTheme(variantId),
    };
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <HeaderCell>Area</HeaderCell>
          <HeaderCell>White page (light · dark)</HeaderCell>
          <HeaderCell>Grey page, peer theme (light · dark)</HeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(ROLE_LABELS).map(([role, label]) => (
          <TableRow key={role}>
            <TableCell scope="row">
              <Text size="small">{label}</Text>
            </TableCell>
            {columns.map(column => (
              <TableCell key={column.key}>
                <Swatch token={column.tokens[role]} theme={column.theme} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

RoleTable.propTypes = {
  architecture: PropTypes.shape({
    variants: PropTypes.shape({
      white: PropTypes.string.isRequired,
      grey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Aside = ({ label, children }) => (
  <Box
    border={{ side: 'left', color: 'border-strong', size: 'small' }}
    pad={{ left: 'small' }}
  >
    <Paragraph margin="none" fill>
      <Text weight={500}>{label}: </Text>
      {children}
    </Paragraph>
  </Box>
);

Aside.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const ArchitectureSection = ({ architecture, hrefFor }) => {
  const { id, label, variants } = architecture;
  const details = DETAILS[id];
  const theme = buildVariantTheme(variants.white);
  const links = PAGES.filter(page => page.id !== 'overview').flatMap(page => {
    const link = (grey, text) => ({
      key: `${page.id}${grey ? '-grey' : ''}`,
      href: hrefFor({ arch: id, page: page.id, grey }),
      text,
    });
    return page.shell
      ? [link(false, page.label), link(true, `${page.label}, grey page`)]
      : [link(false, page.label)];
  });
  return (
    <Box
      as="section"
      gap="small"
      background={T('tone-1')}
      round="medium"
      pad="medium"
    >
      <Box gap="3xsmall">
        <Heading level={2} margin="none">
          {label}
        </Heading>
        <Text size="small" color="text-weak">
          {details.formerly} in the earlier exploration
        </Text>
      </Box>
      <Paragraph margin="none" fill>
        {details.brief}
      </Paragraph>
      <Box as="ul" gap="3xsmall" pad={{ left: 'medium' }} margin="none">
        {links.map(link => (
          <Box as="li" key={link.key}>
            <Anchor href={link.href} label={link.text} />
          </Box>
        ))}
      </Box>
      <Accordion>
        <AccordionPanel label="More details">
          <Box gap="medium" pad={{ vertical: 'small' }}>
            <Box direction="row" gap="medium" wrap>
              {details.tokens.map(token => (
                <Swatch key={token} token={token} theme={theme} />
              ))}
            </Box>
            <Paragraph margin="none" fill>
              {details.summary}
            </Paragraph>
            <Aside label="Trade-off">{details.tradeoff}</Aside>
            <Box background={T('tone-2')} round="small" pad="small">
              <RoleTable architecture={architecture} />
            </Box>
            <Box gap="xsmall">
              {details.notes.map(([title, text]) => (
                <Paragraph key={title} margin="none" fill>
                  <Text weight={500}>{title}: </Text>
                  {text}
                </Paragraph>
              ))}
            </Box>
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
};

ArchitectureSection.propTypes = {
  architecture: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    variants: PropTypes.object.isRequired,
  }).isRequired,
  hrefFor: PropTypes.func.isRequired,
};

const Compare = () => (
  <Box as="section" background={T('tone-1')} round="medium">
    <Accordion>
      <AccordionPanel
        label={
          <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
            <Heading level={2} margin="none">
              Compare at a glance
            </Heading>
          </Box>
        }
      >
        <Box
          pad={{ horizontal: 'medium', bottom: 'medium' }}
          overflow={{ horizontal: 'auto' }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" />
                {ARCHITECTURES.map(architecture => (
                  <HeaderCell key={architecture.id}>
                    {architecture.label}
                  </HeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARE.map(row => (
                <TableRow key={row.label}>
                  <TableCell scope="row">
                    <Text size="small" weight={500}>
                      {row.label}
                    </Text>
                  </TableCell>
                  {row.values.map((value, index) => (
                    <TableCell key={ARCHITECTURES[index].id}>
                      <Text size="small">{value}</Text>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </AccordionPanel>
    </Accordion>
  </Box>
);

// The landing page: the three architectures under comparison, each with
// links into its previews. It is painted with the architecture and page
// theme selected in the bar, like every other page.
export const Overview = ({ hrefFor }) => (
  <Box fill overflow={{ vertical: 'auto' }}>
    <Page kind="narrow" pad={{ bottom: '3xlarge' }} flex={false}>
      <PageContent gap="large">
        <PageHeader
          title="Surface token previews"
          subtitle="Three candidate architectures for the Landmark surface tokens (#5969). Choose an architecture in the bar above, then a page: the framed shell (#6708), where chrome wraps the page; the beside shell (#6635, #6660), where the same panels sit on the page; or one of five stress-test layouts. Annotations name the token painted on each area; Grey page applies a peer surface theme that swaps the light values and leaves dark unchanged (the toned mode built in #6714 also changes dark, and is not shown here). Light mode has two values everywhere (white and grey.50), so the architectures differ mainly in which token names an area and in dark mode, which has three steps: grey.1300, grey.1000 and grey.1200."
        />
        {ARCHITECTURES.map(architecture => (
          <ArchitectureSection
            key={architecture.id}
            architecture={architecture}
            hrefFor={hrefFor}
          />
        ))}
        <Compare />
        <Paragraph margin="none" fill>
          The beside shell arranges this prototype the way two example pages are
          built, with the navigation as a rounded panel on the page:{' '}
          <Anchor href={`${PR}/6635`} label="Overview dashboard (#6635)" /> and{' '}
          <Anchor href={`${PR}/6660`} label="Devices collection (#6660)" />.
        </Paragraph>
      </PageContent>
    </Page>
  </Box>
);

Overview.propTypes = {
  hrefFor: PropTypes.func.isRequired,
};
