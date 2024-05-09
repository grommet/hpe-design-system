import { useRef, useEffect, useState } from 'react';
import { Box, FormField, Select, Text, View } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { Option } from './Option';
import { SaveViewDialog } from './SaveViewDialog';
import { UpdateViewDialog } from './UpdateViewDialog';
import { DeleteViewDialog } from './DeleteViewDialog';

const SAVE_NEW_VIEW_LABEL = 'Save as';
const UPDATE_VIEW_LABEL = 'Update';
const DELETE_VIEW_LABEL = 'Delete';
const SET_AS_DEFAULT_LABEL = 'Set as default';
const REMOVE_DEFAULT_LABEL = 'Clear default';

const messages = {
  update: UPDATE_VIEW_LABEL,
  delete: DELETE_VIEW_LABEL
}

export const ManageDataView = (
  {
    view,
    setView,
    views,
    setViews
  }:
    {
      view: View,
      setView: (nextView: View) => void,
      views: View[],
      setViews: (nextViews: View[]) => void
    }
) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(view);
  const [saveViewDialog, setSaveViewDialog] = useState(false);
  const [updateViewDialog, setUpdateViewDialog] = useState(false);
  const [deleteViewDialog, setDeleteViewDialog] = useState(false);
  const [options, setOptions] = useState(views);
  const [lastView, setLastView] = useState<View>({});
  const [updateForm, setUpdateForm] = useState({ name: lastView.name });
  const selectViewRef = useRef<HTMLSelectElement>();

  // Construct available options based on views
  useEffect(() => {
    const nextOptions = [];
    const createView = { name: SAVE_NEW_VIEW_LABEL }
    const updateView = { name: UPDATE_VIEW_LABEL }
    const deleteView = { name: DELETE_VIEW_LABEL }
    const setAsDefault = { name: SET_AS_DEFAULT_LABEL }
    const removeDefault = { name: REMOVE_DEFAULT_LABEL }
    const customViews = views.filter((view) => view.custom);

    customViews.sort((a, b) => a.name.localeCompare(b.name));
    if (customViews.length > 0) {
      customViews.forEach((view) => delete view.label);
      customViews[0].label = 'Custom';
    }

    const predefinedViews = views.filter((view) => !view.custom);
    if (predefinedViews.length > 0) {
      predefinedViews[0].label = 'Predefined';
    }

    nextOptions.push(createView);

    if (customViews.length > 0 && lastView.name) {
      if (view.name) {
        const defaultAction = view.default ? removeDefault : setAsDefault;
        defaultAction.label = `${lastView.name} actions`;
        nextOptions.push(defaultAction);
      } else {
        updateView.label = `${lastView.name} actions`;
      }
      nextOptions.push(updateView);
    }
    if (customViews.length > 0 && view.custom && view.name) {
      nextOptions.push(deleteView);
    }
    if (predefinedViews.length > 0) {
      nextOptions.push(...predefinedViews);
    }
    if (customViews.length > 0) {
      nextOptions.push(...customViews);
    }

    setOptions(nextOptions);
  }, [views, lastView, view]);

  // Ensure selected value is in sync with view
  useEffect(() => {
    if (!view.name) {
      setSelected({});
    } else {
      setSelected(view);
    }
    if (view.custom) {
      setLastView(view);
      setUpdateForm(view);
    } else if (!view.custom && view.name) {
      setLastView({});
    }
  }, [view]);

  const handleClose = () => {
    setOpen(false);
    selectViewRef.current?.focus();
  }

  const onChange = ({ option }: { option: View }) => {
    if (option.name === SAVE_NEW_VIEW_LABEL) {
      setSelected({});
      setSaveViewDialog(true);
    } else if (option.name === UPDATE_VIEW_LABEL) {
      setUpdateForm({ ...view, name: lastView.name });
      setSelected({});
      setUpdateViewDialog(true);
    }
    else if (option.name === DELETE_VIEW_LABEL) {
      setDeleteViewDialog(true);
    } else if (option.name === SET_AS_DEFAULT_LABEL) {
      const nextViews = views.map((v) => {
        if (v.name === view.name) {
          v.default = true;
        } else {
          delete v.default;
        }
        return v;
      });
      setViews(nextViews);
    } else if (option.name === REMOVE_DEFAULT_LABEL) {
      const nextViews = views.map((v) => {
        if (v.name === view.name) {
          v.default = false;
        }
        return v;
      });
      setViews(nextViews);
    }
    else {
      setSelected(option);
      setView(option);
    }
    setOpen(false);
  }

  return (
    <>
      <FormField
        margin={{ vertical: '-6px' }}
        info={selected.default ?
          <Box direction='row' gap='xsmall' align='center'>
            <CircleInformation aria-hidden={true} size='small' />
            <Text size='xsmall' >Default</Text>
          </Box> :
          undefined}
      >
        <Select
          ref={selectViewRef}
          a11yTitle='Select or manage saved views'
          placeholder='Select or manage views'
          options={options}
          value={selected}
          labelKey={'name'}
          onChange={onChange}
          closeOnChange={false}
          open={open}
          onOpen={() => setOpen(true)}
        >
          {(option, index, options, state) => {
            return <Option option={option} state={state} lastView={lastView} messages={messages} />
          }}
        </Select>
      </FormField>
      {saveViewDialog &&
        <SaveViewDialog
          onClose={handleClose}
          setShow={setSaveViewDialog}
          setSelected={setSelected}
          view={view}
          setView={setView}
          views={views}
          setViews={setViews}
        />
      }
      {updateViewDialog &&
        <UpdateViewDialog
          value={updateForm}
          lastView={lastView}
          onClose={handleClose}
          setShow={setUpdateViewDialog}
          setSelected={setSelected}
          view={view}
          setView={setView}
          views={views}
          setViews={setViews}
        />
      }
      {deleteViewDialog && <DeleteViewDialog
        onClose={handleClose}
        setSelected={setSelected}
        setShow={setDeleteViewDialog}
        setLastView={setLastView}
        view={view}
        setView={setView}
        views={views}
        setViews={setViews}
      />}
    </>
  );
};