import { NameValueList, NameValuePair } from "grommet";
import type { RecordModel } from "pocketbase";
import { formatDate } from "../../../utils";

export const MetaData = ({ component }: { component: RecordModel }) => {
  return (
    <NameValueList nameProps={{ width: 'max-content' }}>
      <NameValuePair name="Type">{component.type}</NameValuePair>
      <NameValuePair name="Status">{component.status}</NameValuePair>
      <NameValuePair name="State">{component.state}</NameValuePair>
      <NameValuePair name="Created">
        {formatDate({
          utc: component.created,
          options: {
            timeStyle: 'long'
          },
        })}
      </NameValuePair>
      <NameValuePair name="Last modified">
        {formatDate({
          utc: component.updated,
          options: {
            timeStyle: 'long'
          },
        })}
      </NameValuePair>
    </NameValueList>
  );
}