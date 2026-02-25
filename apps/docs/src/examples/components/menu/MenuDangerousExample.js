import PropTypes from 'prop-types';
import { Notification } from 'grommet';

import { useState } from 'react';
import { DestructiveConfirmation } from '../../templates';
import { MenuMock } from './MenuMock';

export const MenuDangerousExample = ({ bestPractice = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  const items = [
    { label: 'Edit' },
    { label: 'View servers' },
    {
      label: 'Delete',
      onClick: () => {
        if (bestPractice) setShowModal(true);
        else setToast(true);
      },
    },
  ];

  return (
    <>
      <MenuMock
        label="Actions"
        items={
          bestPractice
            ? [items.slice(0, items.length - 1), items.slice(-1)]
            : items
        }
      />
      {showModal && (
        <DestructiveConfirmation
          title="Delete server"
          message={`This will permanently delete this server, 
          including all history, located at:`}
          path="/servers/KCHDvfcByKvvjymNheg"
          setShowModal={setShowModal}
          setToast={setToast}
        />
      )}
      {toast && (
        <Notification
          toast
          status="normal"
          message="Server deleted."
          onClose={() => setToast(false)}
        />
      )}
    </>
  );
};

MenuDangerousExample.propTypes = {
  bestPractice: PropTypes.bool,
};
