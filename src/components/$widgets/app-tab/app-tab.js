import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './app-tab.scss';


const StyledTabs = withStyles({
  indicator: {
    backgroundColor: '#29CA9C',
  }
})(Tabs);

const StyledTab = withStyles({
  root: {
    height: 80,
    backgroundColor: '#fff'
    
  },
  selected: {
    backgroundColor: '#fff'
  }
})(Tab);


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabSize = (event, newValue) => {
    let size = 100/props.tabs.length
    return {minWidth: size+"%"}
  };

  return (
    <div className={classes.root, 'main-app-tab'}
    >
      <StyledTabs
        value={props.value}
        onChange={props.onChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
       
      >
        {props.tabs.map(({label, component: Component}, index) => {
          return <StyledTab label={label} style={handleTabSize(props.tabs)}/>
          
        })}

      </StyledTabs>

        {props.tabs.map(({label, component: Component}, index) => {
          return props.value === index ? <Component context={props.context}/> : null
        })}

    </div>
  );
}
