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

export const StyleCompass = () => {
  const refMap = useMemo(() => buildRefMap(styleCompassTree), []);

  const [history, setHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(styleCompassTree);

  const handleSelection = (option) => {
    if (isLeafOption(option)) {
      setHistory((prev) => [...prev, currentNode]);
      setCurrentNode(option);
    } else {
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
    <Box>
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
