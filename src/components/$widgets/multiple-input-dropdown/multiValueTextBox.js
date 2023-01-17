import { Chip, FormControl, Input, makeStyles } from "@material-ui/core";
import { getThemeProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import { AppImage } from '../../$widgets/images/app-image';

export default function App(props) {
  const classes = useStyles();
  const [values, setValues] = useState(["test"]);
  const [currValue, setCurrValue] = useState("");
  const {seat_quantity, seats}=props

  const handleKeyUp = (e) => {
    if (e.keyCode == 32) {
      setValues((oldState) => [...oldState, e.target.value]);
    }
  };

  useEffect(() => {
  }, [values]);

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  return (
    <div className="App">
      <Stack spacing={3} className="input-drop">
        <FormControl classes={{ root: classes.formControlRoot }}>
          <div>
            {props.values.map((item, index) => (
              <Chip
                size="small"
                onDelete={()=>props.handleDelete(item, index)}
                label={item}
                deleteIcon={ <AppImage name={'cross-icon.svg'}   width={'20'} />}
              />
            ))}
          </div>
          <Input
            value={props.value}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            onChange={props.handleChange}
            onKeyDown={props.onKeyDown}
          />
        </FormControl>
        <div className='seats'>{seats}/{seat_quantity} Seats</div>
      </Stack>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    border: "1px solid #595F70",
    padding:"0px 112px 0px 20px;",
    borderRadius: "4px",
    minHeight:"68px",
    backgroundColor:"#1E1F25",
    maxHeight:"170px",
    overflow:"auto"
  }
}));