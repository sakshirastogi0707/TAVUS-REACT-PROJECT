import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppImage } from "../$widgets/images/app-image";
import { Grid, Paper, Popper, MenuList, Grow } from "@material-ui/core";
import './csv.scss';
import _ from 'lodash';
import { ButtonGray } from "../$widgets/buttons/button-gray";
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import AppDialog from "../$widgets/AppDialog/AppDialog";
import CustomSelect from "../$widgets/input-fields/custom-select";
import Loader from "../$widgets/loader/loader"
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "react-js-pagination";
import Strings from "../../constants/strings"
import { CSVLink, CSVDownload } from "react-csv";
import { Link } from "@material-ui/core";
import DatePicker from "../$widgets/datepicker/Date-Picker";
import { toast } from "react-toastify";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { Slider } from 'material-ui-slider';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {SegmentService} from '../../service/api/segment.service'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));
const options = [
  { value: 'blues sdadad', label: 'Blues dsdada' },
  { value: 'rock', label: 'Rock adadad' },
  { value: 'jazz', label: 'Jazz dadad dada' },
];
const csvDownloadData = [
  ["template_id", "video_name", "intro_with_name", "company_and_website", "position", "calendly_advising_session_url"]
];


export default function UploadVideo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <AppImage name={'upload_icon.svg'} className="cursor-pointer" />
      </label>
    </div>
  );
}

export function html() {
  const { isCSVModal, isLoading, allRequests, errors, isLoadingCsv, isSuccessModel, filter_column, filter_status, openSearch, isMapCsv, isTemplateModal, templates, selected_template,
    dynamicVariables, csvLength, generated, custom_cta, isLoadingMap, csvColumn, isViewCsvData, decodedCsv, tableHeaders, arrayIndex, objectKeyName, videoCreating, playVariable,
    isShowVideo, allVideos, default_video_url, loadingData, playLoder, audioKeyLoader } = this.state;
  const { } = this.props;
   const  MapCsv=()=>{
    this.validatePreview(true, 'isViewCsvData')
    SegmentService.analyticsTrack('Map CSV Completed',{})

   }
  return (
    <div className={'csv-uplode-main'}>
      <Grid container className={'ds'} >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="d-flex justify-content-between"> 
            <div className={'title'}>CSV Requests</div>
          </div>
        </Grid>
      </Grid>
      <Grid container className=" mt-4 pb-4">
          <Grid item xs={12} sm={12} md={3} lg={3} >
            
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} className="align-self">
          <div className="d-flex search-section justify-content-end ">
            <div className={'searchDiv align-self pr-2'}>
              {openSearch ?
                <div className={'search-icon '}>
                  <div className="md-form mt-0">
                    <SearchIcon  className="search-thumb" />
                    <AppImage name={'coolicon.svg'} onClick={() => this.setState({ searchField: '', openSearch: false }, () => this.getRequests(1, this.state.searchField, this.state.filter_column, this.state.filter_status))} className="search-cross" />
                    <AppImage onClick={() => this.openDate(true)} name={'calendar.svg'} className="calendar" />
                    <input onChange={(e) => this.setState({ searchField: e.target.value }, () => this.getRequests(1, this.state.searchField, this.state.filter_column, this.state.filter_status))} name="searchField" value={this.state.searchField} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    <DatePicker
                      open={this.state.isOpen}
                      onOpen={() => this.openDate(true)}
                      onClose={() => this.openDate(false)}
                      maxDate={new Date()}
                      onChange={(event) => this.handleDateChange(event)}
                      TextFieldComponent={() => null}
                    />
                  </div>
                </div>
                :
                <div className={'search-icon '}>
                  <SearchIcon onClick={() => this.setState({ openSearch: true })}  />
                </div>
              }

            </div>
            <div className="generate_Btn-coman  d-flex justify-content-lg-end">
              <ButtonLightBlue className="generateBtn"  onClick={() =>this.openModel(true, 'isTemplateModal') }> Upload <span className="pull-right"><AddIcon  /></span></ButtonLightBlue>
            </div>
          </div>
          </Grid>
        </Grid>
        <div className={'card'}>
          <div className={'card-body'}>
            <div className="table-responsive">
              <table className="table table-fixed">
                <thead>
                  <tr>
                    <th width="12%" className="table_title">
                      <span onClick={() => this.filterTable('id')} className={filter_column == 'id' ? "enble" : " "}>
                        Request ID
                        <AppImage className={filter_column == 'id' && filter_status == 'DESC' ? "arrowSelect showDivClick" : 'showDivClick'} name='filter_down.svg' />
                        <AppImage className={filter_column == 'id' && filter_status == 'ASC' ? "arrowSelect showDiv" : 'showDiv'} name={'filter_down.svg'} />
                      </span>
                    </th>
                    <th width="10%">No. of Videos</th>
                    <th width="12%">Campaign Name</th>
                    <th width="10%">
                      <span onClick={() => this.filterTable('submitted_date')} className={filter_column == 'submitted_date' ? "enble" : " "}>
                        Submitted
                        <AppImage className={filter_column == 'submitted_date' && filter_status == 'DESC' ? "arrowSelect showDivClick" : 'showDivClick'} name='filter_down.svg' />
                        <AppImage className={filter_column == 'submitted_date' && filter_status == 'ASC' ? "arrowSelect showDiv" : 'showDiv'} name={'filter_down.svg'} />
                      </span>
                    </th>
                    <th width="10%">
                      <span onClick={() => this.filterTable('completed_date')} className={filter_column == 'completed_date' ? "enble" : " "}>
                        Completed
                        <AppImage className={filter_column == 'completed_date' && filter_status == 'DESC' ? "arrowSelect showDivClick" : 'showDivClick'} name='filter_down.svg' />
                        <AppImage className={filter_column == 'completed_date' && filter_status == 'ASC' ? "arrowSelect showDiv" : 'showDiv'} name={'filter_down.svg'} />
                      </span>
                    </th>
                    <th width="9%">
                      <span onClick={() => this.filterTable('status')} className={filter_column == 'status' ? "enble" : " "}>
                        Status
                        <AppImage className={filter_column == 'status' && filter_status == 'DESC' ? "arrowSelect showDivClick" : 'showDivClick'} name='filter_down.svg' />
                        <AppImage className={filter_column == 'status' && filter_status == 'ASC' ? "arrowSelect showDiv" : 'showDiv'} name={'filter_down.svg'} />
                      </span>
                    </th>
                    <th width="9%" className="text-center">Original CSV </th>
                    <th width="10%" className='videoUL text-center'>Processed CSV</th>
                    <th width="8%"></th>
                  </tr>
                </thead>
                {isLoading ? <Loader /> :
                   <tbody>
                    {allRequests.map((item, index) => {
                      return <tr key={index}>
                        <td>{item?.id}</td>
                        <td>{item?.num_videos}</td>
                        <td>{item?.campaign?.campaign_name}</td>
                        <td>
                          {this.getDate(item?.submitted_date)}
                        </td>
                        <td>{item.status == 'ready' || item.status == 'Ready' ? this.getDate(item?.completed_date) : '-'} </td>
                        <td>{item.status}</td>
                        <td className="text-center">{item?.original_csv && <AppImage onClick={() => window.open(item?.original_csv)} className="download-icon" name={'download_csv.svg'} />}</td>
                        <td className="text-center">
                          <AppImage onClick={() => this.downloadCsv(item)} className="download-icon" name={'download_csv.svg'} /> </td>
                        <td>
                          <RouterLink to={"/dashboard/" + item.id} >View videos</RouterLink>
                        </td>
                      </tr>
                    })}
                    {!isLoading && allRequests.length==0 && 
                      <tr >
                          <td className=" cursor-pointer" colspan="8"  style={{textAlign: 'center'}}>
                              No Data Found
                          </td>
                      </tr>
                    }
                  </tbody>

                }
               
              </table>
            </div>
            <BrowserView>
              <div className="text-right px-3 pb-3">
                <Pagination
                  activePage={this.state.activePage}
                  totalItemsCount={this.state.totalItemsCount}
                  itemsCountPerPage={10}
                  pageRangeDisplayed={3}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  onChange={(e) => this.pagination(e)}
                />
              </div>
            </BrowserView>
            <MobileView>
              <div className="text-right px-3 pb-3">
                <Pagination
                  activePage={this.state.activePage}
                  totalItemsCount={this.state.totalItemsCount}
                  itemsCountPerPage={10}
                  pageRangeDisplayed={3}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  onChange={(e) => this.pagination(e)}
                />
              </div>
            </MobileView>
          </div>
        </div>
      {/* } */}
      <AppDialog open={isTemplateModal}
        maxWidth={'xs'}
        customClassMain="csv-upload-modal"
        onClose={() => this.openModel(false, 'isTemplateModal')}
        modelTitle={"Select Campaign"}
        content={
          <div className=''>
            <div className='contentModal'>
              <div className="">
                <div className="mb-20">
                  <label className="text-left">Campaign<sup className="text-danger">*</sup></label>
                  <CustomSelect onChange={this.handleChangeTemplate} options={templates} name='selected_template' value={selected_template} />
                  {errors['selected_template'] && <span className='error'>{errors.selected_template}</span>}
                </div>
                <div className="uploadbtn">
                  <ButtonLightBlue className=" mt-35 mb-2"
     onClick={()=> selected_template ? this.setState({ isTemplateModal: false, isCSVModal: true, csvData: [], uploadedCsvName: '', is_blank: false }) : toast.warning(Strings.SELECT_ANY_TEMPLATE)}
                  >Next</ButtonLightBlue>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <AppDialog open={isCSVModal}
        maxWidth={'xs'}
        className="csv-upload-modal"
        onClose={() => this.openModel(false, 'isCSVModal')}
        modelTitle={"Upload CSV"}
        content={
          <div className=''>
            {this.state.csvData == '' &&
              <div className="text-left"><Link><AppImage name={'download_icon.svg'} width="16" className="cursor-pointer" />
                <CSVLink data={[csvColumn]}> Download Sample</CSVLink>
              </Link></div>
            }

            <div className='contentModal'>
              {isLoadingCsv ? <Loader /> :
                <div className="">
                  <p className="mb-5">Upload a file</p>
                  {this.state.csvData != ''
                    ?
                    <div className="position-relative text-center mt-3">
                      <label >
                        <AppImage name={'csv.svg'} className="cursor-pointer" />
                        <span className="cross_icon">
                          <AppImage name={'cross_icon.svg'} onClick={() => this.setState({ csvData: [], uploadedCsvName: '', is_blank: false })} className="cursor-pointer" />
                        </span>
                      </label>
                      <label>
                        {this.state.uploadedCsvName}
                      </label>
                    </div>
                    :
                    <div className="uploadmain justify-content-center">
                      <div className="uploadSvg text-center">
                        <label htmlFor="icon-button-file" className="upload-button">
                          <AppImage name={'upload.svg'} width="50" className="cursor-pointer" />
                        </label>
                        <h5>Upload a CSV file to import</h5>
                        <p>Drag it from your file explorer or click<br /> anywhere to choose a file</p>
                        <form>
                          <input
                            type="file"
                            value={''}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={this.confirmFunction}
                          />
                        </form>
                        <span className="upload-button">{this.state.uploadedCsvName}</span>
                      </div>
                    </div>
                  }
                  <div className="uploadbtn">
                    <ButtonLightBlue className=" mt-5 mb-2"
                      onClick={() => this.validateCsvDataAndBlank()}
                    >Submit</ButtonLightBlue>

                  </div>
                </div>
              }
            </div>
          </div>
        }
      />

      <AppDialog open={isSuccessModel}
        maxWidth={'sm'}
        className="csv-upload-modal success-model "
        onClose={() => this.recallApi()}
        modelTitle={'Thank You!'}
        content={
          <div className=''>
            <div className='contentModal'>
              <div className="submission">
                <label htmlFor="icon-button-file" className="upload-button">
                </label>
                    <Alert
                        iconMapping={{
                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                        }}
                    >
                       {Strings.REQUEST_SUBMITTED}
                    </Alert>
                <p>Tavus will process these videos, test for quality, and<br /> return the CSV to you shortly.</p>
              </div>
              <div className="submission-btn">
                <ButtonLightBlue className="mb-2"
                  onClick={() => this.recallApi()}
                >Back to home</ButtonLightBlue>
              </div>
            </div>
          </div>
        }
      />


      <AppDialog open={isMapCsv}
        maxWidth={'sm'}
        className="request-modal map-csv"
        onClose={() => this.openModel(false, 'isMapCsv')}
        modelTitle={'Map CSV Headers'}
        customClassMain="csvModel"

        content={

          <div className='contentModal'>
            <div className="model-sec">

              <h5>Video Variables</h5>
              <p>These variables will be used as data within your video for the “{this.getTemplateName(selected_template)}” template</p>
              {isLoadingMap ? <Loader /> :
                <div className="map-csv-input text-left">
                  
                  {generated ?
                    <div className="mb-20">
                      <label className="text-left" for="videoname">Background Video URL<sup className="text-danger">*</sup></label>
                      <CustomSelect onChange={this.handleChangeHeader} options={this.state.keyValues} name="background_url" id="background_url" value={this.state.headerArray['background_url']} />
                      {errors['background_url'] && <span className='error'>{errors.background_url}</span>}
                    </div>
                    : ''
                  }
                  {custom_cta ?
                    <div className="mb-20">
                      <label className="text-left" for="videoname">CTA URL<sup className="text-danger">*</sup></label>
                      <CustomSelect onChange={this.handleChangeHeader} options={this.state.keyValues} name="custom_cta_url" id="custom_cta_url" value={this.state.headerArray["custom_cta_url"]} />
                      {errors['custom_cta_url'] && <span className='error'>{errors.custom_cta_url}</span>}
                    </div>
                    : ''
                  }
                  {dynamicVariables && dynamicVariables.length > 0 && <h5 className="text-left">Video Variables</h5>}
                  {dynamicVariables && dynamicVariables.length > 0 && dynamicVariables.map((val, key) => {
                    return <div className="mb-20">
                      {val?.variable !== false ?
                        <>
                          <label className="text-left" for="Variables2">{val?.label}<sup className="text-danger">*</sup></label>
                          <CustomSelect onChange={this.handleChangeHeader} options={this.state.keyValues} name={val?.label} value={this.state.headerArray[val?.label]} />
                          {errors[val?.label] && <span className='error'>{errors[val?.label]}</span>}
                        </>
                        :
                        null
                      }

                    </div>
                  })}
                 
                  <div className="uploadbtn">
                    <ButtonLightBlue onClick={() => MapCsv()} className=" mt-35 mb-2">Preview</ButtonLightBlue>
                  </div>
                </div>
              }
            </div>
          </div>

        }
      />

      <AppDialog open={isViewCsvData}
        maxWidth={'auto'}
        customClassMain="csv-upload-modal success-model "
        onClose={() => this.openModel(false, 'isViewCsvData')}
        flag={false}
        modelTitle={'Preview Variables'}
        content={
          <div className=''>
            <div className='contentModal csv_upload'>
              {loadingData ? <Loader /> :
                <>
                  <table className="table table-fixed">
                    <thead>
                      {tableHeaders.length > 0 && tableHeaders.length > 0 &&
                        <tr>
                          <th width="60">S/N</th>
                          {tableHeaders && tableHeaders.length > 0 && tableHeaders.map((val1, key) => {
                            return <th width="200">{val1}</th>
                          })}
                          <th width="80">Edit</th>
                        </tr>
                      }
                    </thead>
                    <tbody>
                      {decodedCsv && decodedCsv.length > 0 && decodedCsv.map((val, key) => (
                        <tr key={key}>
                          <th className="var_list" width="20">{key + 1} </th>
                          {Object.keys(val).map((keyName, i) => (
                            <>

                              {keyName !== 'edit' && keyName !== 'play' && keyName !== 'pause' && keyName !== 'mp3' && keyName !== 'loader' ?
                                <th className={
                                  val?.edit
                                    ?
                                    tableHeaders[i] != 'custom_cta_url ' &&
                                      tableHeaders[i] != 'background_url' ? 'position-relative' : 'table_url position-relative'
                                    :
                                    tableHeaders[i] != 'custom_cta_url ' &&
                                      tableHeaders[i] != 'background_url' ? 'table_th_bg position-relative' : 'table_url position-relative'
                                }>
                                  <div className="d-flex justify-content-between ">
                                    {val?.edit
                                      ?
                                      <input
                                        onChange={(event) => this.changeVariable(event, val, key, tableHeaders[i])}
                                        className=" form-control"
                                        type="text" value={val[tableHeaders[i]]}
                                      />
                                      : <>
                                        <div className="var_list align-self">{val[tableHeaders[i]]}</div>
                                        {tableHeaders[i] != 'custom_cta_url' && tableHeaders[i] != 'background_url' ?
                                          <>
                                            <div className="position-relative roundBg align-self">
                                              <div className="play_butto " onClick={(event) => this.playVariable(val[tableHeaders[i]], tableHeaders[i], val, key, event)}>
                                               
                                                {audioKeyLoader == key && playLoder == tableHeaders[i] ?
                                                  <div className="loading-overlay-cell">
                                                    <AppImage name={'loader-anim.png'} className="rotate" width="20" />
                                                  </div>
                                                  :
                                                  val?.play && val?.play.includes(tableHeaders[i]) ?
                                                    <AppImage name={'pause1.svg'} className="cursor-pointer polygon" width="14" />
                                                    :
                                                    <>
                                                      {this.getButton(key, tableHeaders[i]) ?
                                                        <AppImage name={'sound.svg'} className="cursor-pointer polygon Playicon" width="18" />
                                                        :
                                                        <AppImage name={'retry_icon.svg'} className="cursor-pointer polygon" width="16" />
                                                      }
                                                    </>
                                                }
                                              </div>
                                            </div>
                                          </>
                                          :
                                          null
                                        }

                                      </>

                                    }

                                  </div>
                                </th>

                                :
                                null
                              }

                            </>
                          ))}
                          <th className="text-center ">

                            {val.edit
                              ? <span className="cursor-pointer" onClick={(e) => this.editVaraible(val, key, 'disabled')}><CheckIcon /></span>
                              : <span onClick={(e) => this.editVaraible(val, key, 'enabled')}><EditIcon className="cursor-pointer" /></span>
                            }

                          </th>
                        </tr>
                      ))}
                    </tbody>
                    {playVariable ?
                      <div className="loading-overlay"><AppImage name={'loader.gif'} width="35" /></div>
                      :
                      null
                    }

                  </table>


                </>
              }
            </div>
            {!loadingData &&
              <div className="generate_Btn ">
                <ButtonLightBlue
                  className={
                    "mb-2 mt-3 " +
                    (playVariable || this.state.disableBtn ? "disabled-submit " : " ") +
                    ""
                  }
                  onClick={() => this.generateVideo()}>
                  {videoCreating ? 'Please wait...' : 'Generate Videos'}

                </ButtonLightBlue>
              </div>
            }

          </div>
        }
      />

      {/* all videos */}
      <AppDialog open={isShowVideo}
        maxWidth={'l'}
        className="csv-upload-modal success-model "
        onClose={() => this.openModel(false, 'isShowVideo')}
        content={
          <div className=''>
            <div className='contentModal'>
              <h1>Videos</h1>
              <table className="table table-fixed">
                <thead>
                  <tr>
                    <th width="90px">Video</th>
                    <th >Name </th>
                    <th width="80px">Request </th>
                    <th width="110px">Date </th>
                    <th width="120px">Template Name</th>
                    <th width="120px">Status </th>
                    <th className='videoUL'>Video URL</th>
                  </tr>
                </thead>
                <tbody>
                  {allVideos.map((item, index) => {
                    return <tr key={index} >
                      <td className={'video-thumb'}>{item?.final_video_asset_url && item.status == 'ready' ? <AppImage className="video-thumb" src={item.image_thumbnail_url} /> : item.status.includes("error") ? <AppImage className="video-thumb" name={"Error.png"} /> : <AppImage className="video-thumb" name={"Generating.png"} />}&ensp;</td>
                      <td >{item?.landing_title}</td>
                      <td>{item?.id}</td>
                      <td >{this.getDate(item?.created_at)}</td>
                      <td >{item?.template?.template_name}</td>
                      <td >{this.getStatus(item?.status)}</td>
                      {item?.final_video_asset_url && item?.status == 'ready'
                        ? <td className='videoUL video-thumb' >
                          <Link onClick={() => window.open(default_video_url + '/video?id=' + item?.id, "_blank")}>{default_video_url + '/video?id=' + item?.id}</Link>
                        </td> : <td></td>}
                    </tr>
                  })}
                </tbody>
              </table>
            </div >
          </div >
        }
      />
    </div >
  );
}