import { StarRating } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const StarRatings = () => {
  return (
    <ContentPane>
      <Compare>
        <StarRating name="rating" value={2} />
      </Compare>
    </ContentPane>
  );
};
