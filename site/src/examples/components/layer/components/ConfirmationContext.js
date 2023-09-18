import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnnounceContext } from 'grommet';

const ConfirmationContext = createContext({});

const ConfirmationProvider = ({ children }) => {
  const [touched, setTouched] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLayer, setShowLayer] = useState(false);

  const value = useMemo(
    () => ({
      showConfirmation,
      setShowConfirmation,
      showLayer,
      setShowLayer,
      touched,
      setTouched,
    }),
    [
      showConfirmation,
      setShowConfirmation,
      showLayer,
      setShowLayer,
      touched,
      setTouched,
    ],
  );

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
    </ConfirmationContext.Provider>
  );
};

ConfirmationProvider.propTypes = {
  children: PropTypes.node,
};

const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  const {
    showConfirmation,
    setShowConfirmation,
    showLayer,
    setShowLayer,
    touched,
    setTouched,
  } = context;

  if (context === undefined) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider',
    );
  }

  useEffect(() => {
    if (!showConfirmation && !showLayer) setTouched(false);
  }, [setTouched, showConfirmation, showLayer]);

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const acceptConfirmation = () => {
    setShowConfirmation(false);
    setShowLayer(false);
  };

  const announce = useContext(AnnounceContext);

  const onClose = () => {
    if (touched) {
      setShowConfirmation(true);
      announce('Discard changes confirmation modal opened.', 'assertive');
    } else {
      setShowLayer(false);
      announce('Modal closed.', 'assertive');
    }
  };

  return {
    ...context,
    acceptConfirmation,
    cancelConfirmation,
    onClose,
  };
};

export { ConfirmationContext, ConfirmationProvider, useConfirmation };
