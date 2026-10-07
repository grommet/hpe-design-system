// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import Head from 'next/head';
import { Notification } from 'grommet';
import { Meta } from '../../components';
import { ErrorAndLoadingStates } from '../../examples/error-and-loading-states';

const title = 'Draft: error and loading state examples';
const description =
  'Draft interactive examples for review, not published API contract guidance.';

const ErrorAndLoadingStatesPage = () => (
  <>
    <Meta title={title} description={description} />
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <Notification
      status="info"
      title="Draft interactive examples for review"
      message={`${description} All requests and responses are simulated.`}
    />
    <ErrorAndLoadingStates />
  </>
);

export default ErrorAndLoadingStatesPage;