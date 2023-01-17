import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './app-progress.scss';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  determinate: {
    backgroundColor: '#ccc'
  }
});


export default function LinearDeterminate(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(50);

  return (
    <div className={classes.root}>
      <LinearProgress  />
    </div>
  );
}
