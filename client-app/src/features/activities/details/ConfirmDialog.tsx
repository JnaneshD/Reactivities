import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default styles

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  dialogVisible: boolean;
  closeDialog: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, dialogVisible, closeDialog }) => {
  useEffect(() => {
    if (dialogVisible) {
      confirmAlert({
        title: 'Confirm',
        message: message,
        buttons: [
          {
            label: 'Cancel',
            onClick: closeDialog, // Close the dialog on cancel
          },
          {
            label: 'Confirm',
            onClick: onConfirm,
          },
        ],
      });
    }
  }, [dialogVisible, closeDialog, onConfirm, message]);

  return null; // The component doesn't render anything directly
};

export default ConfirmDialog;
