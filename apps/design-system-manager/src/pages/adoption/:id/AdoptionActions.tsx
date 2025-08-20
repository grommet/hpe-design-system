import { Box, Button } from 'grommet';
import { Edit, Save, Close } from 'grommet-icons';

interface AdoptionActionsProps {
	edit: boolean;
	setEdit: (edit: boolean) => void;
}

export const AdoptionActions = ({ edit, setEdit }: AdoptionActionsProps) => {
	return (
		<Box direction="row" gap="small">
			{!edit ? (
				<Button
					a11yTitle="Edit scorecard"
					icon={<Edit />}
					secondary
					tip="Edit scorecard"
					onClick={() => {
						setEdit(!edit);
					}}
				/>
			) : (
				<Box direction="row" gap="small">
					<Button
						icon={<Save />}
						primary
						type="submit"
						tip="Save scorecard"
						form="scorecard-form"
					/>
					<Button
						icon={<Close />}
						secondary
						tip="Cancel edit"
						type="reset"
						form="scorecard-form"
						onClick={() => {
							setEdit(!edit);
						}}
					/>
				</Box>
			)}
		</Box>
	);
};
