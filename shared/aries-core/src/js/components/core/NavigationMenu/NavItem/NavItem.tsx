import { Button } from 'grommet';
import { ItemContainer } from './ItemContainer';
import { ItemLabel } from './ItemLabel';

export type NavItemType = {
  id?: string; // Added optional id for better key management
  label: string;
  url?: string;
  icon?: React.ReactNode;
  children?: NavItemType[];
  type?: 'group' | 'item';
};

interface NavItemProps {
  active?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  level?: number;
  onEsc?: (event: React.KeyboardEvent) => void;
  onSelect?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  url?: string;
  [key: string]: unknown; // For additional props like 'id', 'aria-label', etc.
}

const gapByLevel = ['small', 'medium', 'large', 'xlarge', 'xxlarge'] as const;

const getGapForLevel = (level?: number) => {
  if (!level || level <= 0) return undefined;

  const index = Math.min(level - 1, gapByLevel.length - 1);
  return gapByLevel[index];
};

export const NavItem = ({
  active,
  actions,
  children,
  icon,
  label,
  level,
  onEsc,
  onSelect,
  url,
  ref,
  ...rest
}: NavItemProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    return (
      <>
        <Button
          plain
          href={url}
          onKeyDown={event => {
            if (event.key === 'Escape' && typeof onEsc === 'function') {
              onEsc(event);
            }
          }}
          onClick={e => {
            if (typeof onSelect === 'function') {
              onSelect(e);
            }
          }}
          role="menuitem"
          ref={ref as any}
          {...(rest as any)}
        >
          {({ hover, focus }) => {
            return (
              <ItemContainer
                active={active as boolean | undefined}
                gap={getGapForLevel(level)}
                hover={hover}
              >
                <ItemLabel
                  icon={icon as React.ReactNode}
                  label={label as string}
                  color={hover || focus || active ? 'text-strong' : 'text'}
                />
                {actions as React.ReactNode}
              </ItemContainer>
            );
          }}
        </Button>
        {children}
      </>
    );
  };
