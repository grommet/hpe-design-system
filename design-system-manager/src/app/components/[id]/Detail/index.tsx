import { PropertyList } from "./PropertyList";
import { Properties } from './Properties';

export const Detail = ({id}:{id: string}) => {
  return (
    <Properties id={id} view={<PropertyList id={id} />} />
  );
}