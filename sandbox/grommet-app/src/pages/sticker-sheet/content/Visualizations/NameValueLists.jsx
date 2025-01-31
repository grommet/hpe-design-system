import { NameValueList, NameValuePair } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const NameValueLists = () => {
  return (
    <ContentPane>
      <Compare>
        <NameValueList>
          <NameValuePair name="City">San Francisco</NameValuePair>
          <NameValuePair name="State">California</NameValuePair>
        </NameValueList>
      </Compare>
    </ContentPane>
  );
};
