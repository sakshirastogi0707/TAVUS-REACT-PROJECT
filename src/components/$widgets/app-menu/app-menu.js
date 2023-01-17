import React from 'react';
import './app-menu.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

export default function AppMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event,option) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className="dotteds">&#8226;&#8226;&#8226;</span>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '90px',
          },
        }}
      >
        {props.actionOptions.map((option) => (
          <MenuItem  key={option} id={option} onClick={props.onClick}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
