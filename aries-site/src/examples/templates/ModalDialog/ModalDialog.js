import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Footer,
  Heading,
  Header,
  Layer,
  Paragraph,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const ModalDialog = ({
  children,
  title,
  subtitle,
  onClose,
  ...layerProps
}) => (
  <Layer position="center" {...layerProps}>
    <Box gap="medium" pad="medium" width={{ min: 'medium' }} flex="grow">
      <Header align="start">
        <Box>
          <Heading level={2} size="small" margin="none">
            {title}
          </Heading>
          <Paragraph margin="none">{subtitle}</Paragraph>
        </Box>
        {onClose && (
          <Button
            a11yTitle="Close modal"
            icon={<FormClose />}
            onClick={onClose}
          />
        )}
      </Header>
      {children}
    </Box>
  </Layer>
);

ModalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClose: PropTypes.func,
};

export const ModalBody = ({ children, ...boxProps }) => (
  <Box {...boxProps}>{children}</Box>
);

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};

export const ModalFooter = ({ children, ...boxProps }) => (
  <Footer {...boxProps}>{children}</Footer>
);

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};
