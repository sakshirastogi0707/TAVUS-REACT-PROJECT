import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './accordion.scss';

const Accordian = (props) => {
  

  return (
    <div className='accordion'>
      <Accordion square={false} expanded={props.expanded} onChange={props.onChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.value}
          </Typography>
        </AccordionDetails>
      </Accordion>      
    </div>
  );
}

export default Accordian;
