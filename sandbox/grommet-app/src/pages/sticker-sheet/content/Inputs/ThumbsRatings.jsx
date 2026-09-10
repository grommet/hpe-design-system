// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { ThumbsRating } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const ThumbsRatings = () => {
  return (
    <ContentPane>
      <Compare>
        <ThumbsRating name="like-dislike" value="like" />
      </Compare>
    </ContentPane>
  );
};
