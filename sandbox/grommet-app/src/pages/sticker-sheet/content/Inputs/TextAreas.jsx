// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { TextArea } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const TextAreas = () => {
  return (
    <ContentPane>
      <Compare>
        <TextArea placeholder="Type something" />
      </Compare>
    </ContentPane>
  );
};
