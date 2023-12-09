import { NameValueList, NameValuePair } from "grommet";
import { ComponentType } from "@/utilities/types";
import { getComponent } from "../actions";

export const PropertyList = async ({ id } : { id: string }) => {
  const component: ComponentType = await getComponent(id);

  return (
    <NameValueList>
      {component ? Object.entries(component).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {`${typeof value} ${typeof value === 'object' ? JSON.stringify(value) : value}`}
        </NameValuePair>
      ))
      : null}
    </NameValueList>
  );
}