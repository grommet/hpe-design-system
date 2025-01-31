import { Accordion, AccordionPanel } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Accordions = () => {
  return (
    <ContentPane>
      <Compare guidingChild="last">
        <Accordion>
          <AccordionPanel label="Panel 1">hi</AccordionPanel>
          <AccordionPanel label="Panel 2">hi</AccordionPanel>
        </Accordion>
      </Compare>
    </ContentPane>
  );
};
