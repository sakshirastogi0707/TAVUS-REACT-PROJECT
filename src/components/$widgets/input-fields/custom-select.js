import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import './custom-select.scss';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    
  },
}));

export default function CustomSelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div className={'custom-select-main'}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={props?.value}
          onChange={props?.onChange}
          name={props?.name}
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
          disabled={props?.disabled}
         
        >
          <option value="">Select</option>
          {props.options && props.options.map((val, key) => {
            if (val?.id && val?.campaign_name) {
              return <option key={key} value={val?.id}>{val?.campaign_name}</option>
            } else {
              return <option key={key} value={val?.value}>{val?.label}</option>
            }

          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
