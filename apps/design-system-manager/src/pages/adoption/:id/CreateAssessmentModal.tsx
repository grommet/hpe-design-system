import type { RecordModel } from 'pocketbase';
import { Box, Button } from 'grommet';
import {
	CreateAssessmentForm,
	ModalBody,
	ModalDialog,
	ModalFooter,
} from '../../../components';

interface CreateAssessmentModalProps {
	team: RecordModel; // Adjust type as needed for your team object
	onClose: () => void;
}

export const CreateAssessmentModal = ({
	team,
	onClose,
}: CreateAssessmentModalProps) => {
	return (
		<ModalDialog title="Create assessment" onClose={onClose}>
			<Box width="medium" gap="medium">
				<ModalBody>
					<CreateAssessmentForm team={team} onClose={onClose} />
				</ModalBody>
				<ModalFooter>
					<Button
						label="Cancel"
						onClick={onClose}
						secondary
						type="reset"
						form="create-assessment-form"
					/>
					<Button
						label="Create"
						primary
						type="submit"
						form="create-assessment-form"
					/>
				</ModalFooter>
			</Box>
		</ModalDialog>
	);
};
