import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedInputBase(props) {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={props.handdleOnchange}
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "Search user" }}
        id={props.id}
        value={props.value}
        autoComplete={props.autoComplete}
        type={props.type}
      />
      {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"> */}
      <span className="SearchIcon"><SearchIcon/></span>
      

      {/* </IconButton> */}
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
      </IconButton> */}
    </Paper>
  );
}
