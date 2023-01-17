
import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import './cropper.scss'
import {connect, useDispatch, useSelector} from 'react-redux'
import Action from "../../../../../redux/action";
import { AppImage } from "../../../../$widgets/images/app-image";
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles } from './styles'
import {CampaignService} from "../../../../../service/api/campaign.service";
import {StorageKeys, StorageService, TempStorage} from "../../../../../service/core/storage.service";
import LinearDeterminate from "../../../../$widgets/app-progress/app-progress"
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { UserService } from '../../../../../service/api/user-service';
import { SegmentService } from '../../../../../service/api/segment.service'
// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// }

const Demo = ({ classes, userDetail }) => {
  const landingState = useSelector(s => s.landingState)
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(2)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [file_type, setFileType] = useState('')
  const [aspect, setAspect] = useState(16/4)

  const dispatch = useDispatch()
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async (zoom) => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
      submit(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileType(file.type.split('/')[1])
      let imageDataUrl = await readFile(file)
      setImageSrc(imageDataUrl)
      submit(imageDataUrl)
    }
  }

  const deleteLogo = (croppedImage) => {
    dispatch({
      type: Action.UpdateLandingState,
      payload: {
          logo: ""
      },
      origin: 'logo.deleteLogo'
    })
  }

  useEffect(() => {
    
  }, [imageSrc])

  const submit = (croppedImage) => {
    setLoading(true)
    let formData = new FormData();    //formdata object
    if(croppedImage){
      formData.append('logo', croppedImage);   //append the values with key, value pair
      formData.append('file_type', file_type)
      CampaignService.uploadImage(formData)
          .then((result) => {
              setLoading(false)
              if(result?.Location){
                dispatch({
                  type: Action.UpdateLandingState,
                  payload: {
                      logo: result?.Location
                  },
                  origin: 'logo.submit'
              })
              SegmentService.analyticsTrack('Logo Configured', {
                url: result?.Location,
              });
            }
          }).catch((error) => {
          setLoading(false)
          console.log('campaign not saved', error)
      })
    }
  }

  return (
    <div className='cropImg'>
      {loading ? <div className="line-loader">
      </div> : null}
      {imageSrc ? (
        <React.Fragment>
          <div className='toggleButton'>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="left" onClick={()=>setAspect(16/4)}
                  variant="contained" aria-label="left aligned">
                <AppImage name={'rectangle-horizontal.svg'}/>
                </ToggleButton>
                <ToggleButton value="center" onClick={()=>setAspect(4/3)}
                  variant="contained"
                  aria-label="centered">
                  <AppImage name={'Square.svg'}/>
                </ToggleButton>
              </ToggleButtonGroup>
          </div>
          <div className='closeBtn'>
            <div className={"cropImgBox"}>
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                //cropSize = {{ width: 190, height: 44 }}
                // aspect={16/9}
                aspect={aspect}
                restrictPosition={false}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
                <div className='closeIcon'>
                <AppImage  onClick={()=>setImageSrc(null)} name={'cross-icon.svg'} />
              </div>
            </div>
          </div>

          <div className='zoomIn'>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            {!loading &&
            <div className='saveBtn'>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              </div>
            }
          </div>
        </React.Fragment>
      ) : (
        <div className='upload-main'>
          <div className='uploadLogo justify-content-center'>
              <div className='uploadSvg text-center'>
                  <label htmlFor="icon-button-file" className="upload-button">
                    <AppImage name={'cloud-upload.svg'} width="43" className="cursor-pointer" />
                  </label>
                  <p>Drag and drop or browse to<br/> choose a file</p>
                <form>
                    <input type="file" onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" />
                </form>
              </div>
              {landingState.logo && !imageSrc && !landingState.logo.includes('template-logo') && 
                <div className='cropLogo'>
                  <div className='LogoDev d-flex justify-content-between'>
                        <div className='logoTitle'>
                            <div className='align-self'>
                              <AppImage name={'gallery.svg'} width="24"/>
                            </div>
                              <div className='logoName align-self'>
                                <h5>{landingState.logo.split('.com/')[1]}</h5>
                              </div>
                        </div>
                        {!landingState.logo.includes('template-logo') &&
                          <div className='imgDev'>
                            <AppImage name={'trash.svg'} onClick={deleteLogo} width="24" />
                          </div>
                        }
                        
                    </div>
                </div>
              }
          </div>
        </div>
      )}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}
export default  withStyles(styles)(Demo)

