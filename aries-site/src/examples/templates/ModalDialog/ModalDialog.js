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

export function ModalDialog({
  children,
  title,
  subtitle,
  onClose,
  ...layerProps
}) {
  return <Layer position="center" {...layerProps}>
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
  </Layer>;
}

ModalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClose: PropTypes.func,
};

export function ModalBody({ children, ...boxProps }) {
  return <Box {...boxProps}>{children}</Box>;
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};

export function ModalFooter({ children, ...boxProps }) {
  return <Footer {...boxProps}>{children}</Footer>;
}

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};
