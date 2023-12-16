'use client';

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Form, 
  FormField, 
  Header, 
  Heading, 
  Select, 
  Text, 
  TextArea, 
  TextInput 
} from 'grommet';
import { BackgroundType, BorderType } from 'grommet/utils';
import { Up, Down } from 'grommet-icons';
import { Add, Close, Edit } from 'grommet-icons';
import { ButtonGroup, FormChildObjects, Panel, Test } from 'aries-core';
import { LevelType, ResourceType } from '@/utilities/types';

const RESOURCE_TYPES = [
  { label: 'Code', value: 'code' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Design kit', value: 'design' }
];

const INPUT_MAP = {
  name: ({ key, index, ...rest }) => (
    <FormField 
      htmlFor={`resources[${index}].name`} 
      name={`resources[${index}].name`} 
      label="Name"
      contentProps={{ width: 'medium' }}
    >
      <TextInput id={`resources[${index}].name`} name={`resources[${index}].name`} />
    </FormField>
  ),
  type: ({ key, index, ...rest }) => (
    <FormField 
      htmlFor={`resources[${index}].type`} 
      name={`resources[${index}].type`} 
      label="Type" 
      contentProps={{ width: 'medium' }}
    >
      <Select 
        id={`resources[${index}].type`} 
        name={`resources[${index}].type`} 
        options={RESOURCE_TYPES}
      />
    </FormField>
  ),
  url: ({ key, index, ...rest }) => (
    <FormField 
      htmlFor={`resources[${index}].url`} 
      name={`resources[${index}].url`} 
      label="URL"
      contentProps={{ width: 'medium' }}
    >
      <TextArea id={`resources[${index}].url`} name={`resources[${index}].url`} />
    </FormField>
  ),
}

export const Editable = (
  { children, level, resources: resourcesProp } :
  { children: any, level: LevelType, resources: ResourceType[] }
) => {
    const resources: { [key: string]: ResourceType } = {};
    resourcesProp.forEach((resource, index) => {
      resources[index] = resource;
    });

    const [formValue, setFormValue] = useState({resources: resourcesProp});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const toggleCreate = () => setCreate(!create);
    const toggleEdit = () => setEdit(!edit);

    const handleAdd = () => {
      console.log('handleadd');
      // const nextHosts = [...formValues.hosts, { ...hostTemplate }];
      // setFormValues({ ...formValues, hosts: nextHosts });
    };

    const handleRemove = (id) => {
      console.log(id);
    };


    const handleRemoveAll = () => {
      setFormValue({});
    };

    const onChange = (value: ResourceType) => {
      console.log(value);
      setFormValue(value);
    };
  
    const onSubmit = (event) => {
      console.log(event.value);
    };
  
    console.log(formValue);
    
    const content = !edit ? 
      children
     : (
      <Form
        value={formValue}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <FormChildObjects 
          collection={{
            name: 'Resources',
            itemName: 'resource',
            parentName: 'component',
          }}
          fields={INPUT_MAP}
          headingLevel={level + 1}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          primaryKey="id"
          required={false}
          values={formValue.resources}
        />
      </Form>
    );

    return (
      <Panel>
        <Header pad={{bottom: 'medium'}}>
          <Heading level={level} margin="none">Resources</Heading>
          <ButtonGroup gap="xxsmall">
            <Button 
              tip={!edit ? `Edit resources` : `Cancel editing`} 
              icon={!edit ? 
                <Edit aria-hidden="true" /> : 
                <Close aria-hidden="true" />
              } 
              onClick={toggleEdit}
            />
            <Button 
              tip="Add resource" 
              icon={<Add aria-hidden="true" />}
              onClick={toggleCreate}
            />
          </ButtonGroup>
        </Header>
        {content}
      </Panel>
    );
}


// {Object.entries(resources).map(([id, resource]) => {
//   return (
//     <Box key={id}>
//       <Header
//         background={background || undefined}
//         border={borderStyle}
//         height={{ min: 'xxsmall' }}
//         onMouseEnter={() => setBackground('background-contrast')}
//         onMouseLeave={() => setBackground(null)}
//         pad="small"
//       >
//         <Box>
//           <Heading level={level + 1} margin="none">
//             {formValue[id].name}
//           </Heading>
//           <Text truncate>Type: {formValue[id].type}</Text>
//         </Box>
//           {open ? (
//             <Up a11yTitle="Hide detail" />
//           ) : (
//             <Down a11yTitle="Show detail and edit" />
//           )}
//       </Header>
//       <FormField 
//         htmlFor={`${id}.name`} 
//         name={`${id}.name`} 
//         label="Name"
//         contentProps={{ width: 'medium' }}
//       >
//         <TextInput id={`${id}.name`} name={`${id}.name`} />
//       </FormField>
//       <FormField 
//         htmlFor={`${id}.type`} 
//         name={`${id}.type`} 
//         label="Type" 
//         contentProps={{ width: 'medium' }}
//       >
//         <Select 
//           id={`${id}.type`} 
//           name={`${id}.type`} 
//           options={RESOURCE_TYPES}
//         />
//       </FormField>
//       <FormField 
//         htmlFor={`${id}.url`} 
//         name={`${id}.url`} 
//         label="URL"
//         contentProps={{ width: 'medium' }}
//       >
//         <TextArea id={`${id}.url`} name={`${id}.url`} />
//       </FormField>
//     </Box>
//   );
// })}