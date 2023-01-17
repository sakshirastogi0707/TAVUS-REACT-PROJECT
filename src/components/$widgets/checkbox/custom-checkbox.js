// import * as React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import './checkbox.scss';
// const CustomCheckbox = withStyles({
//   root: {
//     "& .MuiSvgIcon-root": {
//       fill: "#0062FF;",
//     },
//     "& .MuiIconButton-label:after": {
//       content: '""',
//       left: 5,
//       top: 5,
//       height: 26,
//       width:2,
//       position: "absolute",
//       backgroundColor: "#fff",
//       zIndex: 9,
//       borderColor: "#fff",
//       borderRadius: 2,
//     },
//     "&$checked": {
//       "& .MuiIconButton-label": {
//         position: "relative",
//         zIndex: 0,
//       },
//       "& .MuiIconButton-label:after": {
//         content: '""',
//         left: 5,
//         top: 5,
//         height: 25,
//         width:25,
//         position: "absolute",
//         backgroundColor: "#fff",
//         zIndex: -1,
//         borderColor: "transparent"
//       }
//     }
//   },
//   checked: {}
// })((props) => <Checkbox color="default" {...props} />);

// export default function CheckboxLabels(props) {
//   const [state, setState] = React.useState({
//     checkedA: false,
//   });

//   const handleChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.checked,
//     });
//   };

//   return (
//     <FormGroup row>
//       <FormControlLabel
//         control={
//           <CustomCheckbox
//             onChange={props.onChange}
//             name={props.name}
//             checked={props.checked}
//             labelStyle={{color: 'white'}}
//             iconStyle={{fill: 'white'}}
//           />
//         }
//         label={props.label}
//       />
//     </FormGroup>
//   );
// }
