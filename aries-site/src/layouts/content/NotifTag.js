import { Tag } from "grommet";

export const NotifTag = ({ size, color, allyDes, textVal }) => {
    return(
      <Tag
      size={size}
      border={{
        color: 'border-weak',
        size: 'xsmall',
        style: 'solid',
        side: 'all',
      }}
      background={{ dark: true, color: color }}
      value={textVal}
      a11yTitle={allyDes}
    />
    )
}