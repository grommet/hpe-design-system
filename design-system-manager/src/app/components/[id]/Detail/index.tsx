import { Properties } from "./Properties";
import { Editable } from './Editable';

export const Detail = ({id}:{id: string}) => {
  return (
    <Editable id={id}>
      <Properties id={id} />
    </Editable>
  );
}