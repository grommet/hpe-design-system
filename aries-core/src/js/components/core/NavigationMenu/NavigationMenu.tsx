interface NavigationMenuProps {
  items: Array<{
    id: string;
    label: string;
  }>;
}

export const NavigationMenu = ({items}: NavigationMenuProps) => {
  return (
    <nav>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </nav>
  );
};

