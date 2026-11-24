// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=42581-1877&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Stepper/Stepper.js
// component=Stepper

import figma from 'figma';

const direction = figma.selectedInstance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});

type Layer = ReturnType<typeof figma.selectedInstance.findLayers>[number];
type ComponentInstance = Extract<Layer, { type: 'INSTANCE' }>;
type StepStatus = 'pending' | 'completed' | 'error' | 'disabled';

type StepModel = {
  id: string;
  status: StepStatus;
  selected: boolean;
  parentId?: string;
  value: ReturnType<typeof figma.helpers.react.object>;
  children: StepModel[];
};

const findInstances = (
  instance: ComponentInstance,
  layerName: string,
): ComponentInstance[] =>
  instance
    .findLayers(
      layer => layer.type === 'INSTANCE' && layer.name === layerName,
      { traverseInstances: true },
    )
    .filter((layer): layer is ComponentInstance => layer.type === 'INSTANCE');

const createStep = (
  instance: ComponentInstance,
  id: string,
  isStep: boolean,
  parentId?: string,
): StepModel => {
  const status = instance.getEnum('Status', {
    Pending: 'pending',
    Completed: 'completed',
    Error: 'error',
    Disabled: 'disabled',
  } as const);
  if (status === undefined) {
    throw new Error(`Stepper item "${instance.name}" has an unsupported status.`);
  }

  const disabledByState = instance.getEnum('State', {
    Enabled: false,
    Hovered: false,
    Static: false,
    Disabled: true,
    Focused: false,
  });
  const normalizedStatus: StepStatus = disabledByState ? 'disabled' : status;
  const description = instance.getBoolean('Show Description')
    ? instance.getString('Description')
    : undefined;
  const errorMessage = instance.getBoolean('Show errorMessage')
    ? instance.getString('Error message')
    : undefined;
  const disabledReason = instance.getBoolean('Show disabledReason')
    ? instance.getString('Disabled reason')
    : undefined;
  const children =
    isStep && instance.getBoolean('Show SubSteps')
      ? findInstances(instance, '⌽ SubStep').map((subStep, index) =>
          createStep(subStep, `${id}-substep-${index + 1}`, false, id),
        )
      : [];

  const value = figma.helpers.react.object({
    id,
    title: instance.getString('Label'),
    status: normalizedStatus,
    ...(description !== undefined ? { description } : {}),
    ...(errorMessage !== undefined ? { errorMessage } : {}),
    ...(disabledReason !== undefined ? { disabledReason } : {}),
    ...(children.length > 0
      ? { children: figma.helpers.react.array(children.map(child => child.value)) }
      : {}),
  });

  return {
    id,
    status: normalizedStatus,
    selected:
      instance.getEnum('is Selected', {
        False: false,
        True: true,
      }) === true,
    parentId,
    value,
    children,
  };
};

const stepInstances = findInstances(figma.selectedInstance, '⌽ Step');
if (stepInstances.length === 0) {
  throw new Error('Stepper must contain at least one Step instance.');
}

const stepModels = stepInstances.map((step, index) =>
  createStep(step, `step-${index + 1}`, true),
);
const subSteps = stepModels.flatMap(step => step.children);
const selectedSubSteps = subSteps.filter(
  step => step.selected && step.status !== 'disabled',
);
const selectedSteps = stepModels.filter(
  step => step.selected && step.status !== 'disabled',
);
const selectedSubStep = selectedSubSteps[0];
const unrelatedSelectedSteps = selectedSubStep
  ? selectedSteps.filter(step => step.id !== selectedSubStep.parentId)
  : selectedSteps;
if (
  selectedSubSteps.length > 1 ||
  unrelatedSelectedSteps.length > (selectedSubStep ? 0 : 1)
) {
  throw new Error('Stepper must not have multiple selected steps.');
}

const steps = figma.helpers.react.array(stepModels.map(step => step.value));
const orderedSteps = stepModels.flatMap(step => [step, ...step.children]);
const currentStep =
  selectedSubStep?.id ??
  selectedSteps[0]?.id ??
  // Match Grommet's default when Figma has no selected step.
  orderedSteps.find(step => step.status !== 'disabled')?.id;
if (!currentStep) {
  throw new Error('Stepper must contain at least one non-disabled step.');
}

export default {
  id: 'Stepper',
  imports: ["import { Stepper } from 'grommet';"],
  example: figma.code`<Stepper${figma.helpers.react.renderProp(
    'steps',
    steps,
  )}${figma.helpers.react.renderProp(
    'currentStep',
    currentStep,
  )}${figma.helpers.react.renderProp('direction', direction)}/>`,
  metadata: { nestable: true },
};
