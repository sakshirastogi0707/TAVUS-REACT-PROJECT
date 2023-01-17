import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loader.scss'
import { AppImage } from "../images/app-image";

function Loader(props) {
  return (
    <div style={props.styles ? {...props.styles}: {}} className={props.className ? `${props.className+' loader'}` : "loader"}>
      <div className="loadericon">
        <AppImage name={'loader-anim.png'} className="rotate" width="68" />
        {/* <div className='position-relative'>
          <div className="circle circle9 c92"></div>
          <h6 className='loading_title'>Loading data...</h6>
        </div> */}
      </div>
    </div>
  );
}
export default Loader;