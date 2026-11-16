// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Area, LayoutFrame, Lines } from './Area';

// Simplified page designs, each declared once by role and painted with the
// architecture selected in the preview bar. Every layout records what it
// stresses and what, if anything, the theme would need beyond the surface
// tokens (see catalog.js). The framed shell itself is the full prototype.

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };

const frame = { kind: 'frame' };
const framedRoot = { kind: 'framedRoot' };
const floating = { kind: 'floating' };
const none = { kind: 'none' };
const c = depth => ({ kind: 'container', depth });
const fixed = token => ({ kind: 'fixed', token });

const Small = ({ children, ...rest }) => (
  <Text size="xsmall" {...rest}>
    {children}
  </Text>
);

Small.propTypes = { children: PropTypes.node };

// 1 · Email client: three sibling panes of different tones on one page,
// selected rows, a floating compose window that restarts the chain.
export const EmailClient = () => (
  <LayoutFrame height="380px">
    <Box direction="row" fill>
      <Area
        role={c(1)}
        label="folder list"
        width="150px"
        flex={false}
        pad="small"
        gap="xsmall"
      >
        <Area
          role={fixed('background-selected-primary')}
          label="selected"
          pad="xxsmall"
          round="xsmall"
        >
          <Small>Inbox</Small>
        </Area>
        <Small>Starred</Small>
        <Small>Sent</Small>
        <Small>Drafts</Small>
        <Area
          role={c(2)}
          label="storage"
          pad="xsmall"
          round="xsmall"
          margin={{ top: 'auto' }}
        >
          <Lines n={1} />
        </Area>
      </Area>
      <Area
        role={c(1)}
        label="message list"
        width="230px"
        flex={false}
        pad="small"
        gap="xsmall"
        border={{ side: 'vertical', color: 'border-weak' }}
      >
        <Box pad="xxsmall" border={{ side: 'bottom', color: 'border-weak' }}>
          <Lines />
        </Box>
        <Area
          role={fixed('background-selected-primary')}
          label="selected row"
          pad="xxsmall"
          round="xsmall"
        >
          <Lines />
        </Area>
        <Box pad="xxsmall" border={{ side: 'bottom', color: 'border-weak' }}>
          <Lines />
        </Box>
        <Box pad="xxsmall">
          <Lines />
        </Box>
      </Area>
      <Area role={none} label="reading pane" flex pad="medium" gap="small">
        <Text weight={500}>Re: Q3 capacity plan</Text>
        <Lines n={3} />
        <Area
          role={c(1)}
          label="quoted message"
          pad="small"
          round="xsmall"
          gap="xsmall"
          border={{ side: 'left', color: 'border-strong', size: 'small' }}
        >
          <Lines />
          <Area role={c(2)} label="nested quote" pad="xsmall" round="xsmall">
            <Lines n={1} />
          </Area>
        </Area>
        <Box direction="row" gap="xsmall">
          <Area role={c(1)} label="attachment" pad="xsmall" round="xsmall">
            <Small>plan.xlsx</Small>
          </Area>
          <Area role={c(1)} label="" pad="xsmall" round="xsmall">
            <Small>sites.pdf</Small>
          </Area>
        </Box>
      </Area>
    </Box>
    <Area
      role={floating}
      label="compose (floating)"
      width="250px"
      round="small"
      pad="small"
      gap="xsmall"
      elevation="medium"
      style={{ position: 'absolute', right: 16, bottom: 12 }}
    >
      <Area
        role={fixed('background-contrast')}
        label="toolbar band"
        pad="xxsmall"
        round="xsmall"
        direction="row"
      >
        <Small>B I U · Attach</Small>
      </Area>
      <Lines n={3} />
      <Area
        role={c(1)}
        label="attachment (chain restarts)"
        pad="xsmall"
        round="xsmall"
        alignSelf="start"
      >
        <Small>notes.md</Small>
      </Area>
    </Area>
  </LayoutFrame>
);

// 2 · Task manager: swimlane → column → card → subtasks is four deep.
const KanbanColumn = ({ title, deep }) => (
  <Area
    role={c(2)}
    label="column"
    flex
    pad="xsmall"
    round="xsmall"
    gap="xsmall"
  >
    <Area
      role={fixed('background-contrast')}
      label="header band"
      pad="xxsmall"
      round="xsmall"
    >
      <Small weight={500}>{title}</Small>
    </Area>
    <Area role={c(3)} label="card" pad="xsmall" round="xsmall" gap="xxsmall">
      <Small>Upgrade firmware</Small>
      <Box direction="row" gap="xxsmall">
        <Area
          role={fixed('background-warning')}
          label=""
          pad={{ horizontal: 'xxsmall' }}
          round="xsmall"
        >
          <Small>blocked</Small>
        </Area>
      </Box>
      {deep && (
        <Area role={c(4)} label="subtasks" pad="xxsmall" round="xsmall">
          <Lines n={2} />
        </Area>
      )}
    </Area>
  </Area>
);

KanbanColumn.propTypes = {
  title: PropTypes.string.isRequired,
  deep: PropTypes.bool,
};

export const TaskManager = () => (
  <LayoutFrame height="560px">
    <Box direction="row" fill>
      <Box flex pad="small" gap="small">
        <Text weight={500}>Release 26.2</Text>
        <Area
          role={c(1)}
          label="swimlane · Platform"
          pad="small"
          round="small"
          gap="xsmall"
          flex
        >
          <Box direction="row" gap="small" flex>
            <KanbanColumn title="To do" deep />
            <KanbanColumn title="In progress" />
            <KanbanColumn title="Done" />
            <Area
              role={none}
              label="add column (ghost)"
              width="90px"
              flex={false}
              round="xsmall"
              border={{ color: 'border-strong', style: 'dashed' }}
              align="center"
              justify="center"
            >
              <Small>+ Column</Small>
            </Area>
          </Box>
        </Area>
        <Area
          role={c(1)}
          label="swimlane · Networking (collapsed)"
          pad="xsmall"
          round="small"
        >
          <Lines n={1} />
        </Area>
      </Box>
      <Area
        role={c(1)}
        label="task detail"
        width="190px"
        flex={false}
        pad="small"
        gap="small"
      >
        <Small weight={500}>Upgrade firmware</Small>
        <Area
          role={c(2)}
          label="fields"
          pad="xsmall"
          round="xsmall"
          gap="xxsmall"
        >
          <Lines n={3} />
        </Area>
        <Area
          role={c(2)}
          label="activity"
          pad="xsmall"
          round="xsmall"
          gap="xxsmall"
        >
          <Area role={c(3)} label="comment" pad="xxsmall" round="xsmall">
            <Lines n={1} />
          </Area>
        </Area>
      </Area>
    </Box>
  </LayoutFrame>
);

// 3 · Word processor: a paper on a desk. The desk is not shell chrome,
// but it frames the workspace in exactly the same way.
export const WordProcessor = () => (
  <LayoutFrame height="560px">
    <Box fill>
      <Area
        role={c(1)}
        label="toolbar"
        pad="xsmall"
        direction="row"
        gap="small"
        align="center"
        flex={false}
      >
        <Small>File · Edit · View · Insert</Small>
        <Area
          role={fixed('background-contrast')}
          label=""
          pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
          round="xsmall"
        >
          <Small>Normal text</Small>
        </Area>
      </Area>
      <Box direction="row" flex>
        <Area
          role={frame}
          label="desk (around the paper)"
          flex
          align="center"
          pad={{ horizontal: 'medium', top: 'small' }}
          overflow="hidden"
        >
          <Area
            role={framedRoot}
            label="paper"
            width="68%"
            flex
            pad="medium"
            gap="small"
            elevation="small"
            round={{ corner: 'top', size: 'xsmall' }}
          >
            <Text weight={500}>Quarterly capacity report</Text>
            <Lines n={2} width="100%" />
            <Area
              role={c(1)}
              label="table"
              pad="xxsmall"
              round="xsmall"
              gap="xxsmall"
            >
              <Area
                role={fixed('background-contrast')}
                label="header band"
                pad="xxsmall"
                round="xsmall"
              >
                <Small weight={500}>Site · Servers · Utilisation</Small>
              </Area>
              <Lines n={1} width="100%" />
            </Area>
            <Area
              role={c(1)}
              label="figure"
              pad="xsmall"
              round="xsmall"
              gap="xxsmall"
            >
              <Area role={c(2)} label="caption" pad="xxsmall" round="xsmall">
                <Lines n={1} />
              </Area>
            </Area>
          </Area>
        </Area>
        <Area
          role={c(1)}
          label="comments"
          width="170px"
          flex={false}
          pad="small"
          gap="small"
        >
          <Area
            role={c(2)}
            label="comment"
            pad="xsmall"
            round="xsmall"
            gap="xxsmall"
          >
            <Lines />
            <Area role={c(3)} label="reply" pad="xxsmall" round="xsmall">
              <Lines n={1} />
            </Area>
          </Area>
        </Area>
      </Box>
      <Area
        role={c(1)}
        label="status bar"
        pad={{ horizontal: 'small', vertical: 'xxsmall' }}
        direction="row"
        gap="small"
        flex={false}
      >
        <Small>Page 1 of 4 · 1,204 words</Small>
      </Area>
    </Box>
  </LayoutFrame>
);

// 4 · Node editor: floating UI over the canvas, groups as tints or as
// containers, nodes as reusable components.
const NodeCard = ({ title, depth, style, label }) => (
  <Area
    role={c(depth)}
    label={label}
    width="120px"
    round="xsmall"
    overflow="hidden"
    style={style}
    flex={false}
  >
    <Area role={fixed('background-contrast')} label="" pad="xxsmall">
      <Small weight={500}>{title}</Small>
    </Area>
    <Box pad="xsmall" gap="xxsmall">
      <Lines n={2} />
      <Area role={c(depth + 1)} label="" pad="xxsmall" round="xsmall">
        <Lines n={1} />
      </Area>
    </Box>
  </Area>
);

NodeCard.propTypes = {
  title: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  style: PropTypes.object,
  label: PropTypes.string,
};

export const NodeEditor = () => (
  <LayoutFrame height="600px">
    <Box direction="row" fill>
      <Area
        role={none}
        label="canvas"
        flex
        pad="small"
        gap="medium"
        style={{
          backgroundImage:
            'radial-gradient(rgba(127, 127, 127, 0.35) 0.7px, transparent 0.8px)',
          backgroundSize: '14px 14px',
        }}
      >
        <Area
          role={floating}
          label="toolbar (floating)"
          direction="row"
          gap="small"
          pad={{ horizontal: 'small', vertical: 'xxsmall' }}
          round="small"
          elevation="small"
          alignSelf="start"
        >
          <Small>Select · Pan · Zoom · Fit</Small>
        </Area>
        <Box direction="row" gap="medium" align="start">
          <NodeCard title="Input" depth={1} label="node" />
          <Area
            role={fixed('background-contrast')}
            label="group as a tint"
            round="small"
            pad="small"
            gap="xsmall"
          >
            <Box direction="row" gap="small">
              <NodeCard title="Transform" depth={1} label="node in tint" />
              <NodeCard title="Filter" depth={1} />
            </Box>
          </Area>
        </Box>
        <Box direction="row" gap="medium" align="end">
          <Area
            role={c(1)}
            label="group as a container"
            round="small"
            pad="small"
            gap="xsmall"
          >
            <Box direction="row" gap="small">
              <NodeCard title="Join" depth={2} label="node in container" />
              <NodeCard title="Output" depth={2} />
            </Box>
          </Area>
          <Area
            role={floating}
            label="minimap (floating)"
            width="120px"
            height="70px"
            round="xsmall"
            elevation="small"
            pad="xxsmall"
            margin={{ left: 'auto' }}
          />
        </Box>
      </Area>
      <Area
        role={c(1)}
        label="inspector"
        width="170px"
        flex={false}
        pad="small"
        gap="small"
      >
        <Small weight={500}>Transform</Small>
        <Area
          role={c(2)}
          label="property group"
          pad="xsmall"
          round="xsmall"
          gap="xxsmall"
        >
          <Lines n={3} />
          <Area role={c(3)} label="advanced" pad="xxsmall" round="xsmall">
            <Lines n={1} />
          </Area>
        </Area>
      </Area>
    </Box>
  </LayoutFrame>
);

// 5 · Knowledge base: an accent hero band with a container on it, status
// admonitions, code blocks, a transparent table of contents.
export const KnowledgeBase = () => (
  <LayoutFrame height="580px">
    <Box fill>
      <Area
        role={fixed('background-accent-blue-strong')}
        label="hero band (accent)"
        pad="small"
        gap="xsmall"
        align="center"
        flex={false}
      >
        <Text weight={500}>How can we help?</Text>
        <Area
          role={floating}
          label="search on an accent band"
          pinMode
          width="260px"
          pad="xsmall"
          round="small"
        >
          <Small color="text-weak">Search articles</Small>
        </Area>
      </Area>
      <Box direction="row" flex>
        <Area
          role={c(1)}
          label="nav tree"
          width="150px"
          flex={false}
          pad="small"
          gap="xxsmall"
        >
          <Small>Getting started</Small>
          <Area
            role={fixed('background-selected-primary')}
            label="selected"
            pad="xxsmall"
            round="xsmall"
          >
            <Small>Configure SSO</Small>
          </Area>
          <Small>Users and roles</Small>
          <Small>Billing</Small>
        </Area>
        <Area
          role={none}
          label="article"
          flex
          pad="medium"
          gap="small"
          overflow={{ vertical: 'auto' }}
        >
          <Text weight={500}>Configure SSO</Text>
          <Lines n={2} width="100%" />
          <Area
            role={fixed('background-info')}
            label="admonition (status)"
            pad="xsmall"
            round="xsmall"
            border={{ side: 'left', color: 'border-strong', size: 'small' }}
          >
            <Small>Note: SAML 2.0 and OIDC are supported.</Small>
          </Area>
          <Area role={c(1)} label="code block" pad="xsmall" round="xsmall">
            <Text size="xsmall" style={MONO}>
              $ glcli auth sso enable --idp okta
            </Text>
          </Area>
          <Area
            role={c(1)}
            label="tabbed example"
            pad="xsmall"
            round="xsmall"
            gap="xxsmall"
          >
            <Small>cURL · Python · Go</Small>
            <Area role={c(2)} label="code in tab" pad="xxsmall" round="xsmall">
              <Text size="xsmall" style={MONO}>
                curl -X POST /v1/sso
              </Text>
            </Area>
          </Area>
          <Area
            role={c(1)}
            label="feedback card"
            pad="xsmall"
            round="xsmall"
            direction="row"
            gap="small"
            align="center"
          >
            <Small>Was this helpful?</Small>
          </Area>
        </Area>
        <Area
          role={none}
          label="table of contents"
          width="140px"
          flex={false}
          pad="small"
          gap="xsmall"
        >
          <Lines n={4} />
        </Area>
      </Box>
    </Box>
  </LayoutFrame>
);
