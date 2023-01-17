import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppImage } from "../images/app-image";
import "./loading-button.scss"

export default function LoadingButtons(props) {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
      <div className='loadingBtn'>
        <LoadingButton
          onClick={props.onClick}
          className={props.className}
          disabled={props.disabled}
          endIcon={<AppImage name={'arrow-left.svg'} width={'14'}/>}
          loading={props.isLoading}
          loadingPosition="end"
          variant="contained"
        >
          {props.title}
        </LoadingButton>
      </div>
        
  );
}