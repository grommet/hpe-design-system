import { Properties } from "./Properties.tsx";
import { Editable } from './Editable.tsx';

export const Detail = ({id}:{id: string}) => {
  return (
    <Editable id={id}>
      <Properties id={id} />
    </Editable>
  );
}