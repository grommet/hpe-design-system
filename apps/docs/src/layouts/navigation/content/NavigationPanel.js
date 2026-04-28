import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer, ResponsiveContext } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { NavigationMenu } from '@shared/aries-core';
import { LayerHeader } from '.';

export const NavigationPanel = ({
    activeItem,
    setActiveItem,
    items,
    expanded = true,
    header,
    onSelect: onSelectProp,
}) => {
    const [openLayer, setOpenLayer] = useState(false);
    const breakpoint = useContext(ResponsiveContext);

    const mobile = breakpoint === 'xsmall';
    const onSelect = onSelectProp || (({
        item,
        event,
    }) => {
        event.preventDefault();
        setActiveItem(item.label);
    });

    const navigationMenuProps = {
        header,
        activeItem,
        items,
        onSelect,
        open: expanded,
    };

    // const messages = {
    //   layerOpen: `${navTitle} navigation opened.`,
    //   layerClose: `${navTitle} navigation closed.`,
    // };

    // Remove layer when breakpoint changes to non-mobile
    useEffect(() => {
        if (!mobile && openLayer) {
            setOpenLayer(false);
        }
    }, [mobile, openLayer]);

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     if (openLayer) {
    //       announce(messages.layerOpen, 'assertive', 1000);
    //     } else {
    //       announce(messages.layerClose, 'assertive', 1000);
    //     }
    //   }, 500);

    //   return () => clearTimeout(timer);
    // }, [openLayer, announce, messages]);

    return mobile ? (
        <>
            <Box justify="center" fill pad={{ horizontal: 'xxsmall' }}>
                <Button
                    a11yTitle="Open navigation menu"
                    icon={<Sidebar />}
                    onClick={() => setOpenLayer(true)}
                />
            </Box>
            {openLayer && (
                <Layer
                    onEsc={() => setOpenLayer(false)}
                    onClickOutside={() => setOpenLayer(false)}
                    position="left"
                >
                    <Box overflow="auto">
                        <NavigationMenu
                            {...navigationMenuProps}
                            gap="medium"
                            width={undefined} // full width when in mobile
                            header={
                                <LayerHeader
                                    onClose={() => setOpenLayer(false)}
                                    setActiveItem={setActiveItem}
                                />
                            }
                            onSelect={({ item, event }) => {
                                onSelect({ item, event });
                                // Close the layer when an item 
                                // is selected, unless it has children
                                if (!item.children) {
                                    // announce(messages.layerClose, 
                                    // 'assertive', 2000);
                                    setOpenLayer(false);
                                }
                            }}
                        />
                    </Box>
                </Layer>
            )}
        </>
    ) : (
        <NavigationMenu {...navigationMenuProps} />
    );
};


NavigationPanel.propTypes = {
    activeItem: PropTypes.string,
    setActiveItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string,
            children: PropTypes.array, // for nested items
        }),
    ).isRequired,
    expanded: PropTypes.bool,
    title: PropTypes.string,
    header: PropTypes.node,
    onSelect: PropTypes.func,
};

