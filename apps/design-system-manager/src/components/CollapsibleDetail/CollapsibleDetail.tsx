import { type ReactNode, useState } from "react";
import { Box, Collapsible } from "grommet";
import { Down, Up } from "grommet-icons";
import { TextEmphasis } from "../TextEmphasis";

export const CollapsibleDetail = (
  { children }:
    { children: ReactNode }
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        background="background-contrast"
        direction="row"
        gap="small"
        onClick={() => {
          setOpen(!open);
        }}
        border={!open ? undefined : { side: 'bottom', color: 'border-weak' }}
        pad="small"
        round={!open ? 'small' : { corner: 'top', size: 'small' }}
      >
        {!open ? <Down height="medium" /> : <Up height="medium" />}
        <TextEmphasis>{open ? 'Hide' : "Show full response"}</TextEmphasis>
      </Box>
      <Collapsible open={open}>
        <Box background="background-contrast" pad="small" round={{ corner: 'bottom', size: "small" }}>
          {children}
        </Box>
      </Collapsible>
    </>
  );
}