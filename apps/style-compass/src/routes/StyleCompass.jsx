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

/**
 * Orchestrates the Style Compass wizard. Owns all state and flow logic —
 * child components (StepQuestion, ResultCard) are stateless renderers.
 *
 * State shape:
 *   history     — stack of prior question nodes, used to power Back
 *   currentNode — the active node object from the decision tree
 *   result      — the active result object when a leaf option is selected,
 *                 or null when a question node is active
 */
export const StyleCompass = () => {
  const refMap = useMemo(() => buildRefMap(styleCompassTree), []);

  const [history, setHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(styleCompassTree);
  const [result, setResult] = useState(null);

  // -------------------------------------------------------------------------
  // Event handlers
  // -------------------------------------------------------------------------

  const handleSelection = (option) => {
    if (isLeafOption(option)) {
      // Leaf: show the result card
      setHistory((prev) => [...prev, currentNode]);
      setResult(option.result);
      setCurrentNode(null);
    } else {
      // Navigation: resolve any string reference and move to the next node
      const nextNode = resolveNext(refMap, option.next);
      setHistory((prev) => [...prev, currentNode]);
      setCurrentNode(nextNode);
      setResult(null);
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev);
    setResult(null);
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentNode(styleCompassTree);
    setResult(null);
  };

  /**
   * seeAlso navigation: find the target node anywhere in the tree by ID,
   * then navigate to it (pushing the current result state onto history as
   * the "previous" question so Back works correctly).
   */
  const handleNavigate = (nodeId) => {
    const target = findNodeById(styleCompassTree, nodeId);
    if (!target) return;
    // Push the current displayed node so Back can return here
    setHistory((prev) => [...prev, currentNode ?? result]);
    setCurrentNode(target);
    setResult(null);
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  const isAtRoot = history.length === 0;

  return (
    <Page>
      <PageContent>
        <Box direction="row" justify="between" align="start">
          <Box>
            <Heading level={1} margin="none">
              Style compass
            </Heading>
            <Paragraph>
              Use this token compass to find the right tokens for your
              use-case.
            </Paragraph>
          </Box>
          <Box direction="row" gap="small" align="center" flex={false}>
            {!isAtRoot && (
              <Button
                icon={<FormPrevious aria-hidden="true" />}
                label="Back"
                onClick={handleBack}
              />
            )}
            <Button
              label="Restart"
              onClick={handleReset}
              disabled={isAtRoot}
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
          {result && (
            <ResultCard result={result} onNavigate={handleNavigate} />
          )}
        </Box>
      </PageContent>
    </Page>
  );
};
