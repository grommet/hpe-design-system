import { useNavigate } from 'react-router-dom';

const AppNavigation = ({ items, activeItem, setActiveItem }) => {
  const navigate = useNavigate();

  return (
    <NavigationMenu
      items={items}
      open={true}
      title="App Navigation"
      activeItem={activeItem}
      onSelect={({ item, event }) => {
        event.preventDefault(); // prevent browser navigation
        setActiveItem(item.label);
        if (item.url) {
          navigate(item.url);
        }
      }}
    />
  );
};