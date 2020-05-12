import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownDocs } from '../../layouts';
import { prepareMarkdown } from '../../utils';

const Button = ({ data, docs }) => {
  return <MarkdownDocs data={data} docs={docs} />;
};

export default Button;

export async function getStaticProps() {
  const content = await import('../../docs/components/button.md');
  const { data, docs } = prepareMarkdown(content);
  return {
    props: {
      data,
      docs,
    },
  };
}

Button.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    grommetDocs: PropTypes.string,
  }).isRequired,
  docs: PropTypes.array.isRequired,
};
