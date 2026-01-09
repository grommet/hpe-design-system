/* eslint-disable react/prop-types */
import { Paragraph, Grid } from 'grommet';
import { SectionCard } from './SectionCard';
import { sections } from '../data/sections';

export const HomeContent = ({ onNavigate }) => (
  <>
    <Paragraph>
      Use the navigation in the header or the cards below to explore different
      sections of this demo app. While on any nested page the{' '}
      <strong>Ascending navigation</strong> will bring you home.
    </Paragraph>
    <Grid columns="small" gap="small">
      {sections.map(section => (
        <SectionCard key={section.id} section={section} onClick={onNavigate} />
      ))}
    </Grid>
  </>
);
