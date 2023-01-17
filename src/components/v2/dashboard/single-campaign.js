import React, {useState, useEffect} from "react";
import "./single-campaign.scss";
import Activity from "./components/activity/activity";
import Analytics from "./components/analytics/top-analytics";
import CsvData from "./components/Csv-request/csv-data";
import DropdownButton from './dropdown-button'
import AppTable from "../../$widgets/app-table-custom/app-table";
import SelectAutoWidthDropdown from "../../$widgets/icon-lable-dropdown/icon-label-dropdown";
import IconLabelButtonsBlack from "../../$widgets/buttons/icon-label-buttons-black"
import {VideoService} from "../../../service/api/video.service";
import {AppImage} from "../../$widgets/images/app-image";
import {ButtonIcon} from "../../$widgets/buttons";
import ReactPlayer from "react-player";
import AppDialog from "../../$widgets/AppDialog/AppDialog";
import {ButtonLightBlue} from "../../$widgets/buttons/button-lightblue";
import {Config} from "../../../config/config";
import Utils from "../../../service/core/utils";
import Strings from './../../../constants/strings'
import {toast} from "react-toastify";
import {CampaignService} from "../../../service/api/campaign.service";
import {useHistory} from "react-router-dom";

const VIDEO_BASE_URL = Config.VIDEO_URL;

export default function SingleCampaign(props) {
    const history = useHistory()
    const campaignId = props?.match?.params?.id;
    const [requests, setRequests] = useState([])
    const [nextCursor, setNextCursor] = useState('')
    const [isVideoModal, setIsVideoModal] = useState()
    const [selectedVideo, setSelectedVideo] = useState()
    const [isShareModal, setIsShareModal] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [variables, setVariables] = useState(null)

    const default_columns = [
        {
            id: 5, field: "preview", headerName: "Preview", width: 150, renderCell: (data) => {
                return data.row.still_image_thumbnail_url
                    ? <AppImage onClick={() => {
                        setIsVideoModal(true)
                        setSelectedVideo(data.row)
                    }} src={data.row.still_image_thumbnail_url} width={80}/>
                    : 'Not Available'
            }
        },
        {id: 1, field: "video_title", headerName: "Video name", width: 150},
        {id: 2, field: "created_at", headerName: "Date generated", width: 150},
        {id: 3, field: "status", headerName: "Status", width: 150, hide: false},
        {
            id: 4, field: "share", headerName: "Share", width: 150, renderCell: (data) => {
                return <ButtonIcon onClick={() => {
                    setSelectedVideo(data.row)
                    setIsShareModal(true)
                }}>
                    <AppImage name={'share-3-alternate.svg'} width={'20'}/>
                </ButtonIcon>
            }
        },
    ];
    const [columns, setColumns] = useState(null)

    const getVariablesFromAPI = async () => {
        const variables = await CampaignService.getVariables(campaignId)
        let x = 6
        const variableColumns = variables.map(v => {
            return {id: x++, field: v.name, headerName: v.name, width: 150, hide: true}
        })
        setColumns([...default_columns, ...variableColumns])
        setVariables(variables)
    }

    const callApiToGetRequests = async () => {
        if (nextCursor === null) return
        if (nextCursor) {
            setLoadingMore(true)
        }
        const {data, next_cursor} = await VideoService.getRequests({
            template_id: campaignId,
            cursor: nextCursor
        })
        setLoadingMore(false)
        setRequests([...requests, ...data])
        setNextCursor(next_cursor)
    }

    useEffect(() => {
        callApiToGetRequests()
        getVariablesFromAPI()
    }, [])



    const getVideoUrl = () => {
        return VIDEO_BASE_URL + '/video/' + selectedVideo?.id
    }

    const handleCopyUrl = () => {
        Utils.copyText(getVideoUrl())
        toast.success(Strings.LINK_COPIED)
    }

    const clickOnDiv2 = (event, text, url) => {
        const elemDiv = document.createElement("div");
        const elemImg = document.createElement("img");
        const link = document.createElement('a');
        link.setAttribute("href", url);
        elemImg.setAttribute("src", text);
        link.appendChild(elemImg);
        elemDiv.appendChild(link);

        const a = document.createElement('a');
        const linkText = document.createTextNode(url);
        a.appendChild(linkText);
        a.title = url;
        a.href = url;
        elemDiv.appendChild(a);

        document.body.appendChild(elemDiv);
        saveToClipboard2(elemDiv);
        setTimeout(() => {
            document.body.removeChild(elemDiv);
            toast.success('Link copied!')
        }, 1000)
    }

    const saveToClipboard2 = (node) => {
        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range2 = document.createRange();
            range2.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range2);
        }
        document.execCommand('copy');
    }

    const handleEditClick = () => {
        history.push(`/campaigns/${campaignId}/edit`);
    }

    return (
        <div className="single-campaign-main">
            <div className="title">
                <h3>Campaign Name</h3>
            </div>
            <div className="button-section d-flex justify-content-start">
                <div className="generateBtn">
                    <DropdownButton/>
                    {/* <SelectAutoWidthDropdown /> */}
                </div>
                <div className="edit-campaign-btn">
                    <IconLabelButtonsBlack onClick={handleEditClick} title="Edit campaign" startIcon="pencil-white.svg"/>
                </div>
                <div className="add-collaborators-btn">
                    <IconLabelButtonsBlack title="Add Collaborators" startIcon="share-icon.svg"/>
                </div>
            </div>
            <div className="dataTableBox d-flex justify-content-start">
                <div className="dataTable">
                    {columns && <AppTable rows={requests} columns={columns} pageSize={11}/>}
                    <div className="show-more-box">
                        <button disabled={!nextCursor}  className={'show-more'} onClick={callApiToGetRequests}>
                            Show More {loadingMore ? <i className="fa fa-spinner fa-spin ml-4" /> : null}
                        </button>
                    </div>
                    
                </div>
                <div className="csv-tabel">
                    <CsvData/>
                </div>
            </div>

            {/*   <Activity />
      <Analytics /> */}

            <AppDialog open={isVideoModal}
                       maxWidth={'md'}
                       className="video-modal"
                       onClose={() => setIsVideoModal(false)}
                       content={
                           <div className='contentModal'>
                               <div>
                                   <ReactPlayer controls className="img-fluid" url={selectedVideo?.stream_url}/>
                               </div>

                           </div>
                       }
            />

            <AppDialog open={isShareModal}
                       maxWidth={'sm'}
                       className="share-modal"
                       onClose={() => setIsShareModal(false)}
                       modelTitle={"Share Video"}
                       content={
                           <div className='contentModal'>
                               <div>
                                   {/* <AppImage name={'register.svg'} className="img-fluid" /> */}
                                   <ReactPlayer
                                       controls={true}
                                       className="img-fluid"
                                       url={selectedVideo?.stream_url}
                                       config={{
                                           file: {
                                               forceHLS: true,
                                           }
                                       }}
                                   />
                                   <div className="d-flex mt-4 mb-4">
                                       <input type="text"
                                              className="copytext"
                                              value={getVideoUrl()}
                                              id="vehicle-url"
                                              readOnly={true}
                                              placeholder="Share URL"/>
                                       <button type="button"
                                               className="btn btn-secondary"
                                               onClick={handleCopyUrl}>Copy</button>
                                   </div>
                                   {/*{this.state.mux_id &&*/}
                                   {/*    <ButtonLightBlue*/}
                                   {/*        onClick={() => this.downloadVideo()} className="Btn mb-3">Download*/}
                                   {/*        Video</ButtonLightBlue>*/}
                                   {/*}*/}

                                   <ButtonLightBlue
                                       onClick={(e) => clickOnDiv2(e, selectedVideo.gif_thumbnail_url, getVideoUrl())}
                                       className="Btn mb-3">Copy GIF Thumbnail & Link</ButtonLightBlue>
                                   <ButtonLightBlue
                                       onClick={(e) => clickOnDiv2(e, selectedVideo.still_image_thumbnail_url, getVideoUrl())}
                                       className="Btn mb-2">Copy Static Image & Link</ButtonLightBlue>

                               </div>

                           </div>
                       }
            />
        </div>
    );
}
