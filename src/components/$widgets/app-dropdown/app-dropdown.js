import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './app-dropdown.scss';
import {AppImage} from "../images/app-image";
import {Menu, MenuItem} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


AppDropdown.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    dropdownItems: PropTypes.array,
    hideRightIcon: PropTypes.bool,
    fullWidthDropdown: PropTypes.bool,
    onDrawerIconClick: PropTypes.func,
    onChange: PropTypes.func,
};

function AppDropdown(props) {
    const {title, subtitle, icon, dropdownItems, hideRightIcon, fullWidthDropdown, onDrawerIconClick, onChange} = props;

    const [value, setValue] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleItemSelect = (item) => {
        setAnchorEl(null);
        if (item.value === value) {
            setValue('');
        } else {
            setValue(item.value);
        }
        if (onChange) {
            if (item.value === value) {
                onChange('');
            } else {
                onChange(item.value);
            }
        }
        if (item.link) {
            props.history.push(item.link)
        }
        if (item.value === 'Admin Tools') {
            setIsDrawerOpen(true)
        }
    };

    const getSelectedText = () => {
        if (!Array.isArray(dropdownItems)) {
            return title
        }
        const x = dropdownItems.find(dd => dd.value === value);
        return x ? <span className="item-name">
            {x.icon && <AppImage name={x.icon}/>} {x.textAfterSelection}
        </span> : title
    }

    return (
        <div className={'userMenu'}>
            {dropdownItems && dropdownItems.length > 0
                ? <div className={'d-flex align-items-center'}>
                    <p className={` ${fullWidthDropdown && 'justify-content-between '} mr-4`}
                       onClick={handleClick}>
                       <span className="card_header">{getSelectedText()}</span>
                       {/* <span className="card_subtile">North Italian</span> */}
                       <AppImage className={'ml-2 icon-drop'} name={props.image ? props.image : ''} height={20} width={18}/>
                    </p>
                    
                    <MenuWithStyles
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            style: {
                                width: '10ch',
                            },
                            }}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >

                        {Array.isArray(dropdownItems) && dropdownItems.map((item, index) => {
                            return <MenuItemWithStyles key={'item' + index}
                                                       active={value === item.value}
                                                       onClick={() => handleItemSelect(item)}>
                                <span>{item.icon &&
                                
                                <AppImage name={item.icon}/>} {item.textInMenu && item.textInMenu}</span>
                                {value === item.value && <AppImage name={'Check.png'}/>}
                            </MenuItemWithStyles>
                        })}
                    </MenuWithStyles>
                </div>
                : <h4 className="card_header">{title} <span className="sub_header">{subtitle}</span></h4>}
            {!hideRightIcon && <AppImage name={'sidepanel.svg'}
                                         onClick={() => onDrawerIconClick ? onDrawerIconClick(true) : null}
                                         height={16} width={16}/>}

            
        </div>
    );
}

export default AppDropdown;

const MenuWithStyles = withStyles({
    list: {
        padding: 4
    },
    paper: {
        marginTop: 10,
    }
})(Menu);

const MenuItemWithStyles = withStyles({
    root: (props) => {
        return {
            color: props.active ? "#EF4C37" : "black",
            fontSize: 13,
            display: 'flex',
            justifyContent: 'space-between',
            '& span': {
                whiteSpace: 'break-spaces',
                width: 132
            }
        }
    },
    gutters: {
        padding: 12
    }
})(MenuItem)
