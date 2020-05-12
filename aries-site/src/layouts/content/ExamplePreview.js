import React from 'react';
import PropTypes from 'prop-types';
import { Example } from '.';

export const ExamplePreview = ({ docs, example, title }) => {
  const Component = require(`../../examples/${example.example}.js`).default;
  const githubRawCode = `https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/${example.example}.js`;
  const designer = `https://designer.grommet.io/${title.toLowerCase()}?id=HPE-design-system-hpedesignsystem-hpe-com`;

  return (
    <Example
      template={example.template}
      code={githubRawCode}
      designer={example.designer && designer}
      docs={docs}
      figma={example.figma}
      height={
        !example.template && !example.intro ? { min: 'small' } : undefined
      }
    >
      <Component />
    </Example>
  );
};

ExamplePreview.propTypes = {
  docs: PropTypes.string,
  example: PropTypes.shape({
    designer: PropTypes.bool,
    example: PropTypes.string.isRequired,
    figma: PropTypes.string,
    intro: PropTypes.bool,
    template: PropTypes.bool,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
