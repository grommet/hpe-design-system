'use client';

import { useState } from 'react';
import { Button } from 'grommet';
import { Close, Edit as EditIcon } from 'grommet-icons';
import type { LevelType, ResourceType } from '@/utilities/types';
import { Pane } from '../../../../components/Pane.tsx';
import { Edit } from './Edit.tsx';

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
      <Pane 
        heading="Resources" 
        level={level} 
        actions={<Button 
          tip={!edit ? `Edit resources` : `Cancel editing`} 
          icon={!edit ? 
            <EditIcon aria-hidden="true" /> : 
            <Close aria-hidden="true" />
          } 
          onClick={toggleEdit}
        />}
      >
        {content}
      </Pane>
    );
}

