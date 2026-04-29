import { useState, useMemo } from 'react';
import { Box, Button, Heading, Page, PageContent, Paragraph } from 'grommet';
import { FormPrevious } from 'grommet-icons';
import { styleCompassTree } from '../data/styleCompassTree';
import {
  buildRefMap,
  resolveNext,
  isLeafOption,
  isQuestionNode,
  findNodeById,
} from '../lib/treeUtils';
import { StepQuestion } from '../components/StepQuestion';
import { ResultCard } from '../components/ResultCard';

export const StyleCompass = () => {
  const refMap = useMemo(() => buildRefMap(styleCompassTree), []);

  // State model per PRD Section 5: { history, currentNode }
  // currentNode holds either a question node or a selected leaf option.
  const [history, setHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(styleCompassTree);

  const handleSelection = (option) => {
    if (isLeafOption(option)) {
      // Leaf: store the whole option as currentNode so isLeafOption works at render
      setHistory((prev) => [...prev, currentNode]);
      setCurrentNode(option);
    } else {
      // Navigation: resolve any string reference and move to the next question node
      const nextNode = resolveNext(refMap, option.next);
      setHistory((prev) => [...prev, currentNode]);
      setCurrentNode(nextNode);
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev);
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentNode(styleCompassTree);
  };

  const handleNavigate = (nodeId) => {
    const target = findNodeById(styleCompassTree, nodeId);
    if (!target) return;
    setHistory((prev) => [...prev, currentNode]);
    setCurrentNode(target);
  };

  return (
    <Page>
      <PageContent>
        <Box direction="row" justify="between" align="start">
          <Box>
            <Heading level={1} margin="none">Style compass</Heading>
            <Paragraph>
              Use this tokens compass to find the right tokens for your use-case.
            </Paragraph>
          </Box>
          <Box direction="row" gap="small" align="center" flex={false}>
            {history.length > 0 && (
              <Button
                icon={<FormPrevious aria-hidden="true" />}
                label="Back"
                onClick={handleBack}
              />
            )}
            <Button
              label="Restart"
              onClick={handleReset}
              disabled={history.length === 0}
            />
          </Box>
        </Box>

        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          {isQuestionNode(currentNode) && (
            <StepQuestion
              currentNode={currentNode}
              onSelect={handleSelection}
            />
          )}
          {isLeafOption(currentNode) && (
            <ResultCard result={currentNode.result} onNavigate={handleNavigate} />
          )}
        </Box>
      </PageContent>
    </Page>
  );
};
