import { useState, useMemo } from 'react';
import { Box, Button } from 'grommet';
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
import { Breadcrumb } from '../components/Breadcrumb';

export const StyleCompass = () => {
  const refMap = useMemo(() => buildRefMap(styleCompassTree), []);

  // history: array of { node, choiceLabel }. One entry per choice made.
  // choiceLabel is the option.label the user selected at that step.
  const [history, setHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(styleCompassTree);

  const handleSelection = (option) => {
    const entry = { node: currentNode, choiceLabel: option.label };
    if (isLeafOption(option)) {
      setHistory((prev) => [...prev, entry]);
      setCurrentNode(option);
    } else {
      const nextNode = resolveNext(refMap, option.next);
      setHistory((prev) => [...prev, entry]);
      setCurrentNode(nextNode);
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentNode(prev.node);
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentNode(styleCompassTree);
  };

  // Jump back to the question node at history[index], trimming forward history.
  const handleCrumbClick = (index) => {
    setCurrentNode(history[index].node);
    setHistory(history.slice(0, index));
  };

  const handleNavigate = (nodeId) => {
    const target = findNodeById(styleCompassTree, nodeId);
    if (!target) return;
    // Use the nodeId as the crumb label for cross-tree navigations.
    setHistory((prev) => [...prev, { node: currentNode, choiceLabel: nodeId }]);
    setCurrentNode(target);
  };

  return (
    <Box>
      <Breadcrumb history={history} onCrumbClick={handleCrumbClick} />

      <Box direction="row" gap="small" margin={{ bottom: 'medium' }}>
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
    </Box>
  );
};
