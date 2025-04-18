import { Meter } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const Meters = () => {
  return (
    <ContentPane>
      <Compare>
        <Meter
          type="circle"
          values={[
            {
              value: 40,
            },
            {
              value: 30,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
            {
              value: 10,
            },
          ]}
          max={100}
          size="small"
          thickness="medium"
        />
      </Compare>
    </ContentPane>
  );
};
