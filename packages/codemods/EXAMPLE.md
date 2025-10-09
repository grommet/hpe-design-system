// Example file demonstrating the grommet-icons to @hpe-design/icons-grommet migration
// This file shows BEFORE and AFTER examples

/* ============================================
   BEFORE: Using grommet-icons
   ============================================ */

// Example 1: Simple icon imports with remapping
// import { StatusCriticalSmall, StatusGoodSmall, Next, Previous } from 'grommet-icons';

// Example 2: Mix of remapped and unchanged icons
// import { Alert, BarChart, LineChart, Calendar, Search } from 'grommet-icons';

// Example 3: Form icons that get remapped
// import { FormAdd, FormEdit, FormClose, FormSearch } from 'grommet-icons';

// Example 4: Star icons remapping
// import { Star, StarOutline } from 'grommet-icons';

// Example 5: Caret and navigation icons
// import { CaretNext, CaretPrevious, Next, Previous } from 'grommet-icons';

/* ============================================
   AFTER: Using @hpe-design/icons-grommet
   ============================================ */

// Example 1: Simple icon imports with remapping
import { StatusCritical, StatusGood, Right, Left } from '@hpe-design/icons-grommet';

const StatusComponent = ({ status }) => {
  const Icon = status === 'error' ? StatusCritical : StatusGood;
  return (
    <Box direction="row" gap="small">
      <Icon />
      <Button icon={<Left />} />
      <Button icon={<Right />} />
    </Box>
  );
};

// Example 2: Mix of remapped and unchanged icons
// import { Alert, ChartBar, ChartLine, Calendar, Search } from '@hpe-design/icons-grommet';

// Example 3: Form icons that get remapped
// import { Add, Edit, Close, Search } from '@hpe-design/icons-grommet';

// Example 4: Star icons remapping
// import { StarFill, Star } from '@hpe-design/icons-grommet';

// Example 5: Caret and navigation icons
// import { CaretRight, CaretLeft, Right, Left } from '@hpe-design/icons-grommet';

/* ============================================
   Key Remappings
   ============================================

   Status Icons:
   - StatusCriticalSmall → StatusCritical
   - StatusGoodSmall → StatusGood
   - StatusWarningSmall → StatusWarning
   - StatusInfoSmall → StatusInfo
   - StatusDisabledSmall → StatusDisabled
   - StatusUnknownSmall → StatusUnknown

   Chart Icons:
   - BarChart → ChartBar
   - LineChart → ChartLine
   - PieChart → ChartPie

   Navigation Icons:
   - Next → Right
   - Previous → Left
   - CaretNext → CaretRight
   - CaretPrevious → CaretLeft

   Form Icons:
   - FormAdd → Add
   - FormEdit → Edit
   - FormClose → Close
   - FormSearch → Search
   - FormCalendar → Calendar
   - FormTrash → Trash
   - (and many more...)

   Circle Icons:
   - CircleAlert → Alert
   - CircleInformation → Info
   - CirclePlay → Play
   - CircleQuestion → Help
   - EmptyCircle → CircleEmpty

   Star Icons:
   - Star → StarFill
   - StarOutline → Star

   And many more! See the codemod for the complete list.
   ============================================ */
