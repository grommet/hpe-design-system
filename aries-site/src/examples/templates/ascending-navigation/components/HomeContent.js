/* eslint-disable react/prop-types */
import { Paragraph, Grid } from 'grommet';
import { SectionCard } from './SectionCard';
import { sectionConfig } from '../data/sections';

export const HomeContent = ({ onNavigate }) => (
  <>
    {/* <Paragraph>
      Use the navigation in the header or the cards below to explore different
      sections of this demo app. While on any nested page the{' '}
      <strong>ascending navigation</strong> will bring you home.
    </Paragraph> */}
    <Grid columns="small" gap="small">
      {Object.entries(sectionConfig)
        .filter(([key]) => key !== 'home')
        .map(([key, config]) => (
          <SectionCard
            key={key}
            section={{ id: key, ...config }}
            onClick={onNavigate}
          />
        ))}
    </Grid>
  </>
);
