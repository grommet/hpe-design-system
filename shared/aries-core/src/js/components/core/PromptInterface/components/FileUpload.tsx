import { Button, FileInput } from 'grommet';
import { ModalDialog, ModalFooter } from '../../../layouts';

interface FileUploadProps {
  onClose: () => void;
  [key: string]: unknown;
}

export const FileUpload = ({ onClose, ...rest }: FileUploadProps) => {
  return (
    <ModalDialog title="Add files" subtitle="" onClose={onClose} {...rest}>
      <FileInput />
      <ModalFooter>
        <Button label="Cancel" onClick={onClose} />
        <Button label="Upload" onClick={onClose} primary />
      </ModalFooter>
    </ModalDialog>
  );
};