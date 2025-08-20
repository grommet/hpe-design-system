import { Box, type BoxProps, type HeadingProps } from 'grommet';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { Identifier } from '../Identifier';

export interface ContentPaneProps extends BoxProps {
	actions?: React.ReactNode;
	children?: React.ReactNode;
	contained?: boolean;
	heading?: string;
	level?: HeadingProps['level'];
	description?: string;
	fontSize?: 'small' | 'medium' | 'large';
	onClose?: () => void;
	srOnly?: boolean;
}

export const ContentPane: React.FC<
	React.PropsWithChildren<ContentPaneProps>
> = ({
	actions,
	children,
	contained = true,
	heading: headingProp,
	level = 2,
	fontSize,
	description,
	srOnly,
	...rest
}) => {
	const containerStyle = contained
		? {
				background: 'background-front',
				gap: 'medium',
				pad: 'medium',
				round: 'medium',
			}
		: {
				gap: 'medium',
			};

	const heading = headingProp ? (
		<Identifier
			heading={headingProp}
			level={level}
			description={description}
			size={fontSize}
		/>
	) : undefined;

	return (
		<Box as="section" {...containerStyle} {...rest}>
			{((headingProp && !srOnly) || actions) && (
				<Box direction="row" justify="between" align="center" >
					{heading}
					{actions}
				</Box>
			)}
			<Box>
				{srOnly && <ScreenReaderOnly>{heading}</ScreenReaderOnly>}
				{children}
			</Box>
		</Box>
	);
};
