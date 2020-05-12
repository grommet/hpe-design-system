import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownDocs } from '../../layouts';
import { prepareMarkdown } from '../../utils';

const Layer = ({ data, docs }) => {
  return <MarkdownDocs data={data} docs={docs} />;
};

export default Layer;

export async function getStaticProps() {
  const content = await import('../../docs/components/layer.md');
  const { data, docs } = prepareMarkdown(content);
  return {
    props: {
      data,
      docs,
    },
  };
}

Layer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    grommetDocs: PropTypes.string,
  }).isRequired,
  docs: PropTypes.array.isRequired,
};
