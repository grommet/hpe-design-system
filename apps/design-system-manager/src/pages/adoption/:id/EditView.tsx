import { useState } from 'react';
import { Grid, Text, List, CheckBox, Select, Form, FormField } from 'grommet';
import { TextEmphasis } from '../../../components';
import type { FeatureAdoption, FeatureAdoptions } from './index';

// type FeatureAdoptions = Record<string, FeatureAdoption>;
interface EditViewProps {
	onSubmit: (values: FeatureAdoptions) => void;
}

const defaultValues: FeatureAdoptions = {};

export const EditView = ({ onSubmit, ...rest }: EditViewProps) => {
	const [formValues, setFormValues] = useState<FeatureAdoptions>(
		defaultValues,
	);

	return (
		<Form
			id="scorecard-form"
			value={formValues}
			onChange={(nextValue) => setFormValues(nextValue)}
      onReset={() => setFormValues(defaultValues)}
			onSubmit={({ value }) => onSubmit(value)}
			{...rest}
		>
			<List>
				{(item: FeatureAdoption) => (
					<ListItem item={item} values={formValues[item.id]} />
				)}
			</List>
		</Form>
	);
};

const ListItem = ({
	item,
	values,
}: { item: FeatureAdoption; values: FeatureAdoption }) => {
	const designOptions: FeatureAdoption['design'][] = ['Figma'];
	const codeOptions: FeatureAdoption['code'][] = ['Grommet', 'Tokens + custom'];

	return (
		<Grid
			columns={[
				'xxsmall',
				'xsmall',
				'xxsmall',
				'flex',
				'flex',
				'flex',
				'flex',
				'flex',
			]}
			gap="medium"
			pad="small"
		>
			<TextEmphasis>{item.feature}</TextEmphasis>
			<Text>{item.level}</Text>
			<Text>{item.category}</Text>
			<FormField
				htmlFor={`${item.id}.design`}
				name={`${item.id}.design`}
				label="Design"
			>
				<Select
					id={`${item.id}.design`}
					name={`${item.id}.design`}
					placeholder="Select adoption"
					value={values?.design || item.design}
					options={designOptions}
				/>
			</FormField>
			<FormField
				htmlFor={`${item.id}.code`}
				name={`${item.id}.code`}
				label="Code"
			>
				<Select
					id={`${item.id}.code`}
					name={`${item.id}.code`}
					placeholder="Select adoption"
					value={values?.code || item.code}
					options={codeOptions}
				/>
			</FormField>
			<FormField
				htmlFor={`${item.id}.design_figma`}
				name={`${item.id}.design_figma`}
				label="Design - Figma"
			>
				<CheckBox
					id={`${item.id}.design_figma`}
					name={`${item.id}.design_figma`}
					checked={
						typeof values?.design_figma === 'boolean'
							? values.design_figma
							: item.design_figma
					}
					label="Design - Figma"
				/>
			</FormField>
			<FormField
				htmlFor={`${item.id}.code_grommet`}
				name={`${item.id}.code_grommet`}
				label="Code - Grommet"
			>
				<CheckBox
					id={`${item.id}.code_grommet`}
					name={`${item.id}.code_grommet`}
					checked={
						typeof values?.code_grommet === 'boolean'
							? values.code_grommet
							: item.code_grommet
					}
					label="Code - Grommet"
				/>
			</FormField>
			<FormField
				htmlFor={`${item.id}.code_design_tokens`}
				name={`${item.id}.code_design_tokens`}
				label="Code - Design Tokens"
			>
				<CheckBox
					id={`${item.id}.code_design_tokens`}
					name={`${item.id}.code_design_tokens`}
					checked={
						typeof values?.code_design_tokens === 'boolean'
							? values.code_design_tokens
							: item.code_design_tokens
					}
					label="Code - Design Tokens"
				/>
			</FormField>
		</Grid>
	);
};
