import React, { Component } from 'react';
import './analytics.scss';
import { HTTP } from "../../service/core/http.service";
import { urls } from "../../config/urlConfig";
import { html } from "./analytics.html";
import { toast } from "react-toastify";
import { StorageService } from "../../service/core/storage.service";
import { UserService } from '../../service/api/user-service';
import { Config } from '../../config/config'
import Strings from "../../constants/strings"
import moment from 'moment';
let dayFlag = 0
let weekFlag = -6
let reCallImpression = 0
let reCallTemplateData3=0
let reCallTemplateData=0
let reCallLeadsData = 0
let reCallCubeData = 0
let reCallActivityLogs = 0

class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            totalImpression: [],
            allTemplateData: [],
            TemplateDetailData: [],
            cubeData: {
                labels:[],
                datasets: [],
                user:{},
                allTemplates: []
            },
            tab: 1,
            allLeads: [],
            views_by: 'week',
            selected_lead: {},
            activePage: 1,
            totalItemsCount: 0,
            isLoadingTemplate: false,
            isLoadingLead: false,
            isLoadingLeadTable: false,
            isLoadingLeadTablePagination: false,
            activityLogs: [],
            leadTab: 'first',
            video_url: '',
            selectedDate: moment().format("YYYY-MM-DD"),
            allTemplatesData: [],
            landing_variables: {},
            default_video_url: Config.VIDEO_URL,
            isLoadingCube: false,
            isLoadingActivity: false,
            dateVal: null,
            otherData: null,oneDate: null,
            selected_template:[]
        }
    }

    async componentDidMount () {
        const user = await UserService.getUserProfile()
        if(user){
            this.setState({user})
        }
        this.getDefaultDomain()
        this.getTemplates()
        // let params = new URLSearchParams(this.props.location.search);        
        // dayFlag = 0
        // weekFlag = -6
    }

    getDefaultDomain = () => {
        let params = '?is_default=true'
        HTTP.get(urls.domain + params).then((result) => {
            if (result.status == 200) {
                if (result.data?.data) {
                    this.setState({ default_video_url: "https://" + result.data?.data.sub_domain + "." + result.data?.data.domain })
                }
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    getTemplates = () => {
        let params = '?limit=5000'
        HTTP.get(urls.getTemplates + params).then((result) => {
            if (result.status == 200) {
                if (result.data?.data?.rows) {
                    let allTemplates = [{ value: '', label: 'All campaigns' }]
                    let templates = []
                    result.data.data.rows.map((val) => {
                        allTemplates.push({ value: val.template_id, label: val.template_name })
                        templates.push(`"${val.template_id}"`)
                    })
                    this.getTemplateData(`[${templates}]`,'step2')
                    this.getImpressions(`[${templates}]`)
                    this.setState({
                        allTemplates,
                        allTemplatesData: result.data.data.rows
                    })
                }
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    // getImpressions=(template)=>{
    //     let params = `?query={"measures":["Analytics.totalPageView"],"filters":[{"member":"Analytics.template","operator":"equals","values":${template}}]}&type=1`
    //     HTTP.get(urls.cube+params).then((result) => {
    //         if(result.status==200){
    //             if(result.data.data.data && result.data.data.data.length>0){
    //                 this.setState({totalImpression : result.data.data.data})
    //             } else {
    //                 this.setState({totalImpression : []})
    //             }
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    getImpressions=async(template)=>{
        const step1Data = this.getLocalStorage('step1')
        if(step1Data){
            this.setState({totalImpression : step1Data })
        }
        let params = `?query={"measures":["Analytics.totalPageView"],"filters":[{"member":"Analytics.template","operator":"equals","values":${template}}]}&type=1`
        HTTP.get(urls.cube+params).then((result) => {
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallImpression<4){
                    reCallImpression=reCallImpression+1
                    return this.getImpressions(template)
                }
                if(result.data.data.data && result.data.data.data.length>0){
                    this.saveLocalStorage(result.data.data.data,'step1')
                    this.setState({totalImpression : result.data.data.data})
                    reCallImpression=0
                } else {
                    this.saveLocalStorage([],'step1')
                    this.setState({totalImpression : []})
                }
            }
        }).catch((err) => {
            console.log(err);
        })
   }

    // getTemplateData=(template)=>{
    //     let params = `?query={"measures": ["Analytics.totalPageView","Analytics.totalCountCta1","Analytics.totalCountCta","Analytics.totalCountCta2"],"filters": [{"member": "Analytics.template","operator": "equals","values": ${template}}],"dimensions": ["Analytics.templateId","Analytics.templateName","Analytics.imageThumbnailUrl"]}&type=2`
    //     this.setState({ isLoadingTemplate: true })
    //     HTTP.get(urls.cube+params).then((result) => { 
    //         if(result.status==200){
    //             if(result.data.data.data && result.data.data.data.length>0){
    //                 this.setState({allTemplateData : result.data.data.data, })
    //             } else {
    //                 this.setState({allTemplateData : []})
    //             }
    //             this.setState({ isLoadingTemplate: false })
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //         this.setState({ isLoadingTemplate: false })
    //     })
    // }

    getTemplateData3=(template,step)=>{
        // let objKey = JSON.parse(template)
        // //checking data in cache
        // const stepData = this.getLocalStorage(step)
        // if(stepData){
        //     if(stepData.length >0 && stepData[0][objKey[0]] && stepData[0][objKey[0]] !== undefined){
        //         this.setState({TemplateDetailData : stepData[0][objKey[0]] })
        //     }else{
        //         this.setState({TemplateDetailData : [] })
                this.setState({ isLoadingTemplate: true })
        //     }
        // } else {
        //     this.setState({TemplateDetailData : [] })
        //     this.setState({ isLoadingTemplate: true })
        // }
        
        let params = `?query={"measures": ["Analytics.totalPageView","Analytics.totalCountCta1","Analytics.totalCountCta","Analytics.totalCountCta2"],"filters": [{"member": "Analytics.template","operator": "equals","values": ${template}}],"dimensions": ["Analytics.templateId","Analytics.templateName","Analytics.imageThumbnailUrl"]}&type=2`
       
        HTTP.get(urls.cube+params).then((result) => { 
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallTemplateData3<4){
                    reCallTemplateData3=reCallTemplateData3+1
                    return this.getTemplateData3(template,step)
                }
                if(result.data.data.data && result.data.data.data.length>0){
                    // let step3Obj = {
                    //     [objKey[0]]: result.data.data.data,
                    // }
                    // if(stepData && stepData.length >0){
                    //     let step3Data = stepData
                    //     step3Data[0][objKey[0]] = result.data.data.data
                    //     this.saveLocalStorage(step3Data,step)
                    // }else{
                    //     let step3Data = []
                    //     step3Data.push(step3Obj)
                    //     this.saveLocalStorage(step3Data,step)
                    // } 
                    this.setState({TemplateDetailData : result.data.data.data, })                
                    reCallTemplateData3=0           
                } else {
                    //this.saveLocalStorage([],step)
                    this.setState({TemplateDetailData : []})
                }
                this.setState({ isLoadingTemplate: false })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ isLoadingTemplate: false })
        })
    }

    getTemplateData=(template,step)=>{
        let objKey = JSON.parse(template)
        //checking data in cache
        const stepData = this.getLocalStorage(step)
        if(stepData){
            this.setState({allTemplateData : stepData })
        } else {
            this.setState({allTemplateData : [] })
            this.setState({ isLoadingTemplate: true })
        }
        
        let params = `?query={"measures": ["Analytics.totalPageView","Analytics.totalCountCta1","Analytics.totalCountCta","Analytics.totalCountCta2"],"filters": [{"member": "Analytics.template","operator": "equals","values": ${template}}],"dimensions": ["Analytics.templateId","Analytics.templateName","Analytics.imageThumbnailUrl"]}&type=2`
       
        HTTP.get(urls.cube+params).then((result) => { 
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallTemplateData<4){
                    reCallTemplateData=reCallTemplateData+1
                    return this.getTemplateData(template,step)
                }
                if(result.data.data.data && result.data.data.data.length>0){
                    // if(step === 'step3'){
                    //     let step3Obj = {
                    //         [objKey[0]]: result.data.data.data,
                    //     }
                    //     if(stepData && stepData.length >0){
                    //         let step3Data = stepData
                    //         step3Data[0][objKey[0]] = result.data.data.data
                    //         this.saveLocalStorage(step3Data,step)
                    //     }else{
                    //         let step3Data = []
                    //         step3Data.push(step3Obj)
                    //         this.saveLocalStorage(step3Data,step)
                    //     } 
                    //     this.setState({allTemplateData : result.data.data.data, })                       
                    // }else{
                        this.saveLocalStorage(result.data.data.data,step)
                        this.setState({allTemplateData : result.data.data.data })
                    // }      
                    reCallTemplateData=0             
                } else {
                    this.saveLocalStorage([],step)
                    this.setState({allTemplateData : []})
                }
                this.setState({ isLoadingTemplate: false })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ isLoadingTemplate: false })
        })
    }


    pagination = (e) => {
        const {selectedTemplate} = this.state
        this.getLeadsData(`["${selectedTemplate?.value}"]`,e)
    }

    fetchMoreData = () => {
        if (this.state.items.length >= 500) {
          this.setState({ hasMore: false });
          return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 20 }))
          });
        }, 500);
      };

    getLeadsData=(template,paage,status=false)=>{
        let {activePage}=this.state
        //page = activePage
        //let objKey = JSON.parse(template)
        //checking data in cache
        //let step = 'step5';
        // const stepData = this.getLocalStorage(step)
        // if(stepData){
        //     if(stepData.length >0 && stepData[0][objKey[0]] && stepData[0][objKey[0]] !== undefined){
                
        //         this.setState({allLeads : stepData[0][objKey[0]],activePage: 1, totalItemsCount: 2 })
        //     }else{
        //         this.setState({allLeads : [] })
        //         //this.setState({ isLoadingLead: true })
        //     }
           
        // } else {
        //     this.setState({allLeads : [] })
        //     //this.setState({ isLoadingLead: true })
        // }
        let params = `?query={"measures": ["Analytics.totalPageView","Analytics.totalCountCta1","Analytics.totalCountCta","Analytics.totalCountCta2"],"filters": [{"member": "Analytics.template","operator": "equals","values": ${template}}],
        "dimensions": ["Analytics.videoId","Analytics.videoName","Analytics.imageThumbnailUrl"],"limit":8,"offset":${8 * (activePage-1)}}&type=4`
        if(status){
            this.setState({ isLoadingLeadTablePagination: status})
        } else {
            this.setState({ isLoadingLeadTable: true})
        }
       
        HTTP.get(urls.cube+params).then((result) => { 
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallLeadsData<4){
                    reCallLeadsData=reCallLeadsData+1
                    return this.getLeadsData(template,paage,status)
                }
                if(result.data.data.data && result.data.data.data.length>0){
                    // let step5Obj = {
                    //     [objKey[0]]: result.data.data.data,
                    // }
                    // if(stepData && stepData.length >0){
                    //     let step5Data = stepData
                    //     step5Data[0][objKey[0]] = result.data.data.data
                    //     this.saveLocalStorage(step5Data,step)
                    // }else{
                    //     let step5Data = []
                    //     step5Data.push(step5Obj)
                    //     this.saveLocalStorage(step5Data,step)
                    // }
                    var joined = this.state.allLeads.concat(result.data.data.data);
                    //this.setState({ myArray: joined })                   
                    this.setState({allLeads : joined, totalItemsCount: result.data.data.totalRecord,activePage: activePage+1 })
                    reCallLeadsData=0
                } else {
                    // this.saveLocalStorage([],step)
                    //this.setState({allLeads : []})
                }
                this.setState({ isLoadingLeadTable: false,isLoadingLeadTablePagination: false })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ isLoadingLeadTable: false,isLoadingLeadTablePagination: false })
        })
    }

    setViewFilter=(views_by)=>{
        this.setState({views_by},()=>this.getCubeData(`["${this.state.selectedTemplate.value}"]`,'' ))
    }

    cubeDataByAction=(choice)=>{
       
        const {views_by, selectedTemplate} = this.state
        let selectedDate = ''
        if(choice == 'back'){
            if(views_by=='day'){
                dayFlag = dayFlag - 1
                selectedDate = dayFlag
            } else {

                weekFlag = weekFlag - 7
                selectedDate = weekFlag
            }
        } else {
            if(views_by=='day'){
                dayFlag = dayFlag + 1
                selectedDate = dayFlag
            } else {
                weekFlag = weekFlag + 7
                selectedDate = weekFlag
            }
        }
        this.getCubeData(`["${this.state.selectedTemplate.value}"]`, selectedDate)
    }

    getCubeData =(template,choice)=>{
        let dateVal = ''
        let dataType = ''
        let getTodatDate = moment().format("YYYY-MM-DD")
        let otherData =  moment().format("YYYY-MM-DD")
        let oneDate = moment().format("YYYY-MM-DD")
        let selectedDate = getTodatDate
        if(choice) {
            if(this.state.views_by=='day') {
                let dateToGet  = moment().add(choice,'d').format('YYYY-MM-DD');
                dateVal = `["${dateToGet} 00:00:00", "${dateToGet} 23:59:59"]`
                dataType = 'dataType=daily'
                oneDate = dateToGet
                selectedDate = dateToGet
            } else if(this.state.views_by=='week') {
                let dateToGet  = moment().add(choice,'d').format('YYYY-MM-DD');
                getTodatDate = moment().add(choice+6,'d').format('YYYY-MM-DD');
                dateVal =`["${dateToGet} 00:00:00", "${getTodatDate} 23:59:59"]`
                oneDate = dateToGet
                otherData = getTodatDate
                dataType = 'dataType=weekly'
                selectedDate = getTodatDate
            }
        } else {
            if(this.state.views_by=='day') {
                dateVal = `["${getTodatDate} 00:00:00", "${getTodatDate} 23:59:59"]`
                dataType = 'dataType=daily'
                selectedDate = getTodatDate
                oneDate = getTodatDate
            } else if(this.state.views_by=='week') {
                let dateToGet  = moment().subtract(6,'d').format('YYYY-MM-DD');
                dateVal =`["${dateToGet} 00:00:00", "${getTodatDate} 23:59:59"]`
                dataType = 'dataType=weekly'
                selectedDate = getTodatDate
                oneDate = dateToGet
                otherData = getTodatDate
            } else if(this.state.views_by=='month') {
                let dateToGet  = moment().subtract(30,'d').format('YYYY-MM-DD');
                dateVal = `["${dateToGet} 00:00:00", "${getTodatDate} 23:59:59"]`
                dataType = 'dataType=monthly'
                selectedDate = getTodatDate
            }
        }
        this.setState({selectedDate:selectedDate,otherData,oneDate})
        
        let params = `?query=
        {"measures": ["Analytics.totalPageView","Analytics.totalCountCta"],
        "filters": [{"member": "Analytics.template","operator": "equals","values": ${template}}],
        "timeDimensions": [{"dimension": "Analytics.createdAt","granularity": "day","dateRange":${dateVal}}]}&type=3&${dataType}`
        this.setState({isLoadingCube: true})
        HTTP.get(urls.cube+params).then((result) => { 
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallCubeData<4){
                    reCallCubeData=reCallCubeData+1
                    return this.getCubeData(template,choice)
                }
                if(result.data.data.data && result.data.data.data.length>0){
                    let dataSet = result.data.data.data
                    let processedData = []
                    let labelData = []
                    let impresionData =[]
                    let viewData = []
                    let linkData = []
                    for(let i=0; i<dataSet.length;i++){
                        labelData.push(moment(dataSet[i]['Analytics.createdAt']).format("ddd DD"))
                        impresionData.push(dataSet[i]['Analytics.totalPageView'])
                        if(dataType!=='dataType=monthly'){viewData.push(dataSet[i]['totalViews'])}
                        linkData.push(dataSet[i]['Analytics.totalCountCta'])
                    }
                    if(dataType=='dataType=monthly'){
                        processedData={
                            labels: labelData,
                            datasets: [{
                                label: 'Impressions',
                                data: impresionData,
                                backgroundColor: '#11CABE',
                            },
                            {
                                label: 'CTA clicked',
                                data: linkData,
                                backgroundColor: '#50B5FF',
                            }]
                        }
                    } else {
                        processedData={
                            labels: labelData,
                            datasets: [{
                                label: 'Impressions',
                                data: impresionData,
                                backgroundColor: '#11CABE',
                                hoverBackgroundColor: '#5eecc2',
                                //hoverBorderColor: '0px 0px 25px #30E0A1',
                                borderRadius:10,
                                width:'50px'
                            },
                            {
                                label: 'Views',
                                data: viewData,
                                backgroundColor: '#246CF9',
                                borderRadius:10,
                                hoverBackgroundColor: '#6aa2de'
                            },
                            {
                                label: 'CTA clicked',
                                data: linkData,
                                backgroundColor: '#50B5FF',
                                borderRadius:10,
                                hoverBackgroundColor: '#88d5e2'
                            },
                            ],
                            totalViews: result.data.data?.totalViews,
                            lastViews: result.data.data?.lastViews
                        }
                    }
                   
                    
                    this.setState({cubeData : processedData})
                    reCallCubeData=0
                } else {
                    this.setState({cubeData: {
                        labels:[],
                        datasets: [],
                        user:{},
                        allTemplates: []
                    }})
                }
                this.setState({isLoadingCube: false})
            }
        }).catch((err) => {
            console.log(err);
            this.setState({isLoadingCube: false})
        })
    }

    getActivityLogs=(id)=>{
        let video_id = `["${id}"]`
        let params = `?query={"filters": [{"member": "Analytics.filterByVideoId","operator": "equals","values": ${video_id}}],"dimensions": ["Analytics.id","Analytics.event","Analytics.city","Analytics.country","Analytics.createdAt","Analytics.device"],"ungrouped":true}&type=5`
        this.setState({isLoadingActivity: true,activityLogs: []})
        HTTP.get(urls.cube+params).then((result) => { 
            if(result.status==200){
                if(result.data?.data?.error=="Continue wait" && reCallActivityLogs<4){
                    reCallActivityLogs=reCallActivityLogs+1
                    return this.getActivityLogs(id)
                }
                if(result.data.data.data){
                    this.setState({activityLogs: result.data.data.data})
                }
                reCallActivityLogs=0
                this.setState({isLoadingActivity: false})
            }
        }).catch((err) => {
            console.log(err);
            this.setState({isLoadingActivity: false})
        })
    }

    changeTemplate = (template) => {
        dayFlag = 0
        weekFlag = -6
        this.setState({allTemplateData:[], TemplateDetailData:[]})
        let selected_template = []
        this.setState({tab: 2,activePage:1,allLeads :[],totalItemsCount:0})
        if(template.value){
            selected_template = `["${template.value}"]`
            this.getTemplateData3(selected_template,'step3')
            this.getImpressions(selected_template)
            this.getCubeData(selected_template,'')
            this.setState({tab: 2,activePage:1,allLeads :[],totalItemsCount:0},()=>this.getLeadsData(selected_template,1))
        } else {
            this.getTemplates()
        }
        this.setState({selectedTemplate: template,selected_template})
    }

    selectTemplate=(template_id,name)=>{
        dayFlag = 0
        weekFlag = -6
        this.setState({allTemplateData:[], TemplateDetailData:[]})
        const {allTemplatesData} = this.state
        let selected_template  = []
        if(template_id){
            selected_template = `["${template_id}"]`
        }
        let landing_variables = {}
        if(allTemplatesData && allTemplatesData.length>0 && template_id){
            landing_variables = allTemplatesData.find( val => val.template_id==template_id)
        }
        this.setState({selectedTemplate: {label:name, value:template_id},selected_template,allLeads :[],activePage:1,totalItemsCount:0}, ()=> this.getLeadsData(selected_template,this.state.activePage))
        this.getCubeData(selected_template,'')
        this.getTemplateData3(selected_template,'step3')
       
        this.setState({tab: 2, landing_variables: landing_variables?.landing})
    }

    changeTab=(tab)=>{
        if(tab==1){
            this.getTemplates()
        }
        this.setState({tab})
    }

    copyText = async (event, text) => {
        var input = document.createElement('textarea');
        input.innerHTML = text;
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        toast.success(Strings.LINK_COPIED)
        return result;
    }

   

    selectLead=async(val,type,index,action)=>{
        const {allLeads, selectedLeadIndex} = this.state
        let video_id = ''
        //console.log(allLeads.length,'sss')
        //console.log(selectedLeadIndex,'ssse')
        if(action){
            if(action == 'back' && selectedLeadIndex!==0){
                this.setState({selected_lead: allLeads[selectedLeadIndex-1], selectedLeadIndex: selectedLeadIndex-1})
                if(allLeads[selectedLeadIndex-1]['Analytics.videoId']){
                    video_id = allLeads[selectedLeadIndex-1]['Analytics.videoId']
                }
            } 
            if(action == 'next' && allLeads[selectedLeadIndex+1]){
                this.setState({selected_lead: allLeads[selectedLeadIndex+1], selectedLeadIndex: selectedLeadIndex+1})
                if(allLeads[selectedLeadIndex+1]['Analytics.videoId']){
                    video_id = allLeads[selectedLeadIndex+1]['Analytics.videoId']
                }
            }
        } else if(index || index==0 ){
            this.setState({selected_lead: allLeads[index], selectedLeadIndex: index})
            video_id = allLeads[index]['Analytics.videoId']
            if(type==1){
                this.setState({tab: 3})
            }
        }
        if(video_id){
            this.getActivityLogs(video_id)
            this.getVideo(video_id)
        }
    }

    getVideo=async(id)=>{
        await HTTP.get(urls.getVideos+'/'+id ).then((result) => {
            if(result.status==200){
                if(result?.data?.status){
                    this.setState({video_url: result?.data.data.final_video_asset_url})
                }
            }
        }).catch((err) => {
            console.log(err.message,'video error');
        })
    }

    saveLocalStorage = (data,key) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getLocalStorage = (key)=> {
        let data = localStorage.getItem(key);
        try{
            return JSON.parse(data)
        }catch(e){
            return []
        }
    }

    handleTabChange=(choice)=>{
        if(choice==1){
            this.getTemplates()
        }
        this.setState({tab: choice})
    }

    render = () => html.apply(this);
}

export default (Analytics);
