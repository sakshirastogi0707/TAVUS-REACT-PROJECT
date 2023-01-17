import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './checkbox.scss';
const GreenCheckbox = withStyles({
  root: {
    color: '#B5B5BE',
    '&$checked': {
      color: '#EE5555',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels(props) {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <GreenCheckbox
            onChange={props.onChange}
            name={props.name}
            checked={props.checked}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
}
