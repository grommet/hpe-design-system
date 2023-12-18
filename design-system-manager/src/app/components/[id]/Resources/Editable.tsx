'use client';

import { useState } from 'react';
import { 
  Button,  
  Header, 
  Heading, 
} from 'grommet';
import { Close, Edit as EditIcon } from 'grommet-icons';
import { Panel } from 'aries-core';
import { LevelType, ResourceType } from '@/utilities/types';
import { Edit } from './Edit';

export const Editable = (
  { children, level, componentId, resources } :
  { children: any, level: LevelType, componentId: string, resources: ResourceType[] }
) => {
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit); 
    
    const content = !edit ? 
      children
     : (
      <Edit 
        level={level} 
        componentId={componentId} 
        resources={resources} 
        onClose={() => setEdit(false)} 
      />
    );

    return (
      <Panel>
        <Header pad={{bottom: 'medium'}}>
          <Heading level={level} margin="none">Resources</Heading>
            <Button 
              tip={!edit ? `Edit resources` : `Cancel editing`} 
              icon={!edit ? 
                <EditIcon aria-hidden="true" /> : 
                <Close aria-hidden="true" />
              } 
              onClick={toggleEdit}
            />
        </Header>
        {content}
      </Panel>
    );
}

