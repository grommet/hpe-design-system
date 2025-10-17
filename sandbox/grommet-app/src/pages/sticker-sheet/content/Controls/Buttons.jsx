import { Box, Button } from 'grommet';
import { User } from '@hpe-design/icons-grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components/Compare';

const kinds = ['default', 'toolbar', 'secondary', 'primary'];
const states = ['enabled', 'active', 'disabled'];
const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

export const Buttons = () => {
  return (
    <ContentPane>
      <Box gap="small">
        {kinds.map(kind =>
          sizes.map(size =>
            states.map(state => (
              <Compare key={`${kind}${size}${state}`}>
                <Button
                  label={`${kind} ${size} ${state}`}
                  size={size}
                  kind={kind}
                  active={state === 'active'}
                  disabled={state === 'disabled'}
                />
              </Compare>
            )),
          ),
        )}
      </Box>
      <Box gap="small">
        <Compare>
          <Button secondary icon={<User />} size="small" />
        </Compare>
        <Compare>
          <Button secondary icon={<User />} />
        </Compare>
        <Compare>
          <Button secondary icon={<User />} size="large" />
        </Compare>
        <Compare>
          <Button secondary icon={<User />} size="xlarge" />
        </Compare>
      </Box>
    </ContentPane>
  );
};
