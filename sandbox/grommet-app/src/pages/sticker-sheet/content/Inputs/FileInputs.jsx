// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { FileInput } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const FileInputs = () => {
  return (
    <ContentPane>
      <Compare>
        <FileInput />
      </Compare>
    </ContentPane>
  );
};
