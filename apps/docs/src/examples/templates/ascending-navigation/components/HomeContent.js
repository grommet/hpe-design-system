/* eslint-disable react/prop-types */
import { Grid } from 'grommet';
import { SectionCard } from './SectionCard';
import { sectionConfig } from '../data/sections';

export const HomeContent = ({ onNavigate }) => (
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
);
