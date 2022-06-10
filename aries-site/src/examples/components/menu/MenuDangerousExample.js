import PropTypes from 'prop-types';
import { Menu, Notification } from 'grommet';

import { useState } from 'react';
import { DestructiveConfirmation } from '../../templates';

export const MenuDangerousExample = ({ bestPractice = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  const items = [
    { label: 'View details', onClick: () => {} },
    { label: 'Edit profile', onClick: () => {} },
    { label: 'Apply blueprint', onClick: () => {} },
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
      <Menu
        label="Actions"
        open
        items={
          bestPractice
            ? [items.slice(0, items.length - 1), items.slice(-1)]
            : items
        }
      />
      {showModal && (
        <DestructiveConfirmation
          title="Delete profile"
          message={`This will permanently delete this profile, 
          including all history, located at:`}
          path="/servers/profiles/KCHDvfcByKvvjymNheg"
          setShowModal={setShowModal}
          setToast={setToast}
        />
      )}
      {toast && (
        <Notification
          toast
          status="normal"
          message="Profile deleted."
          onClose={() => setToast(false)}
        />
      )}
    </>
  );
};

MenuDangerousExample.propTypes = {
  bestPractice: PropTypes.bool,
};
