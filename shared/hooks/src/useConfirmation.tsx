import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { AnnounceContext } from 'grommet';

// Define the shape of the context
interface ConfirmationContextValue {
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  showLayer: boolean;
  setShowLayer: (show: boolean) => void;
  touched: boolean;
  setTouched: (touched: boolean) => void;
}

const ConfirmationContext = createContext<ConfirmationContextValue | undefined>(
  undefined,
);

export const ConfirmationProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
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
    [showConfirmation, showLayer, touched],
  );

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  const announce = useContext(AnnounceContext);

  if (context === undefined) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider',
    );
  }

  const {
    showConfirmation,
    setShowConfirmation,
    showLayer,
    setShowLayer,
    touched,
    setTouched,
  } = context;

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

  const onClose = () => {
    if (touched) {
      setShowConfirmation(true);
      // added time=0 since it is required argument for the component
      // and typescript requires it to transpile into .js
      announce('Discard changes confirmation modal opened.', 'assertive', 0);
    } else {
      setShowLayer(false);
      // same as above
      announce('Modal closed.', 'assertive', 0);
    }
  };

  return {
    ...context,
    acceptConfirmation,
    cancelConfirmation,
    onClose,
  };
};

export { ConfirmationContext };
