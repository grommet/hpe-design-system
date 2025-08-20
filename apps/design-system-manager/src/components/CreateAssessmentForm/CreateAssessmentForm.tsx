import { useEffect, useState } from 'react';
import Pocketbase, { type RecordModel } from 'pocketbase';
import {
	Box,
	DateInput,
	Form,
	FormField,
	Notification,
	RadioButtonGroup,
	Select,
	type NotificationProps,
} from 'grommet';
import { getLocaleDateFormat } from '../../utils';

const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);

type AssessmentType = {
	assessmentDate: string;
	type: string;
	theme: { label: string; value: string } | undefined;
	theme_package: { label: string; value: string } | undefined;
	teamId: string;
};

interface CreateAssessmentFormProps {
	team: RecordModel;
	onClose: () => void;
}

const assessmentTypes = ['Initial', 'Self evaluation', 'Quarterly'];

const defaultValues = {
	assessmentDate: '',
	type: assessmentTypes[1],
	theme: undefined,
	theme_package: undefined,
};

/**
 * Maps theme package to corresponding theme based on package label
 * @param themePackageLabel - The label of the selected theme package
 * @param themes - Array of available themes
 * @returns The matching theme object or undefined
 */
const mapThemePackageToTheme = (
	themePackageLabel: string,
	themes: Array<{ label: string; value: string }>,
) => {
	const v0Packages = ['hpe-design-tokens, v0', 'grommet-theme-hpe, v5'];
	const v1Packages = [
		'hpe-design-tokens, v1',
		'grommet-theme-hpe, v6',
		'grommet-theme-hpe, v7',
	];
	const v2Packages = ['hpe-design-tokens, v2', 'grommet-theme-hpe, v8'];

	if (v0Packages.includes(themePackageLabel)) {
		return themes.find((theme) => theme.label === 'v0 - One');
	}

	if (v1Packages.includes(themePackageLabel)) {
		return themes.find((theme) => theme.label === 'v1 - Together');
	}

	if (v2Packages.includes(themePackageLabel)) {
		return themes.find((theme) => theme.label === 'v2 - Landmark');
	}

	return undefined;
};

export const CreateAssessmentForm = ({ team, onClose }: CreateAssessmentFormProps) => {
	const [value, setValue] = useState<AssessmentType>({
		...defaultValues,
		teamId: team.id,
	});
	const [error, setError] = useState<
		{ message: string; actions?: NotificationProps['actions'] } | undefined
	>(undefined);
  const [themes, setThemes] = useState<Array<{ label: string; value: string }>>([]);
  const [themePackages, setThemePackages] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    const fetchThemesAndPackages = async () => {
      const themesData = await pb.collection('themes').getFullList().then((items) =>
        items.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
      const themePackagesData = await pb.collection('packages').getFullList().then((items) =>
        items.map((item) => ({
          label: `${item.name}, ${item.version}`,
          value: item.id,
        }))
      );

      setThemes(themesData);
      setThemePackages(themePackagesData);
    };

    fetchThemesAndPackages();
  }, []);

	const onReset = () => {
		setValue({
			...defaultValues,
			teamId: team.id,
		});
	};

	const onChange = (value: AssessmentType) => {
		const nextValue = {
			...value,
		};

		if (value.theme_package) {
			nextValue.theme = mapThemePackageToTheme(
				value.theme_package.label,
				themes,
			);
		}

		setValue(nextValue);
	};

	const onSubmit = async ({ value }: { value: AssessmentType }) => {
		const data = {
			team_id: value.teamId,
			assessment_date: value.assessmentDate,
			type: value.type,
			theme: value.theme?.value,
			theme_package: value.theme_package?.value,
		};
		try {
			await pb.collection('assessments').create(data);
      onReset();
      onClose();
		} catch (err) {
			let errorMessage = 'Failed to create assessment. Please try again.';
			let errorActions = undefined;
			console.error('Error creating assessment:', err);
			if ((err as { status?: number }).status === 403) {
				errorMessage =
					'Failed to create assessment. You do not have permission to perform this action.';
				errorActions = [{ label: 'Request access', href: '/request-access', target: '_blank' }];
			}
			setError({ message: errorMessage, actions: errorActions });
		}
	};

	return (
		<Form
			id="create-assessment-form"
			value={value}
			onChange={onChange}
			onReset={onReset}
			onSubmit={onSubmit}
			validate="blur"
			messages={{
				required: 'This is a required field.',
			}}
		>
			<Box gap="small">
				<Box>
					<FormField
						name="type"
						htmlFor="type"
						label="Type"
						required={{ indicator: false }}
					>
						<RadioButtonGroup name="type" id="type" options={assessmentTypes} />
					</FormField>
					<FormField
						name="theme_package"
						htmlFor="theme_package"
						label="Theme source"
						required={{ indicator: false }}
					>
						<Select
							name="theme_package"
							id="theme_package"
							options={themePackages}
							valueKey="value"
							labelKey="label"
						/>
					</FormField>
					<FormField
						name="assessmentDate"
						htmlFor="assessmentDate"
						label="Assessment date"
						required={{ indicator: false }}
					>
						<DateInput
							name="assessmentDate"
							id="assessmentDate"
							format={getLocaleDateFormat({ locale: navigator.language })}
						/>
					</FormField>
				</Box>
				{error && (
					<Notification
						message={error.message}
						status="critical"
						actions={error.actions}
					/>
				)}
			</Box>
		</Form>
	);
};
