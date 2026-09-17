// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
