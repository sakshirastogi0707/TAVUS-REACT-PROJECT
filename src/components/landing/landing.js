import React, {Component} from 'react';
import './landing.scss';
import {html} from "./landing.html";
import {HTTP} from "../../service/core/http.service";
import {urls} from "../../config/urlConfig";
import { toast } from "react-toastify";


class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            isLoading: false,
            videoJsOptions: '',
            cta_button_link: '',
            cta2_button_link: ''
        }
    }

    componentDidMount() {
        const url = new URL(window.location.href);
        var id = url.searchParams.get('id');
     
        this.getVideo(id)
    }

    getVideo=async(id)=>{
        this.setState({isLoading: true})
        await HTTP.get(urls.getVideos+'/'+id ).then((result) => {
            if(result.status==200){
                if(result?.data?.status){
                    this.setState({videoData: result.data.data})
                    if(result?.data?.data?.other_data){
                        var variables = result.data.data.other_data;
                        if(result.data.data.template.landing.cta_button_link){
                            let queryStart = result.data.data.template.landing.cta_button_link.indexOf("h")
                            let queryEnd   = result.data.data.template.landing.cta_button_link.indexOf("?") + 1 || url.length + 1
                            let url = result.data.data.template.landing.cta_button_link.slice(queryStart, queryEnd - 1)+'?'
                            let cta_button_link =  this.parseURLParams(result.data.data.template.landing.cta_button_link)
                            let arr = []
                            Object.keys(cta_button_link).map(function(key, index) {
                                arr.push(key.replace(/{|}/g,''))
                            });
                            let count = 0
                            arr.forEach((num1, index) => {
                                if(variables[num1]){
                                    url+= count==0 ? variables[num1] : '&'+variables[num1]
                                    count =  count+1;
                                } else {
                                    console.log(num1,'not found in variables')
                                }
                            });
                            this.setState({cta_button_link: url})
                        }
                        if(result.data.data.template.landing.cta2_button_link){
                            let queryStart = result.data.data.template.landing.cta2_button_link.indexOf("h")
                            let queryEnd   = result.data.data.template.landing.cta2_button_link.indexOf("?") + 1 || url.length + 1
                            let url = result.data.data.template.landing.cta2_button_link.slice(queryStart, queryEnd - 1)+'?'
                            
                            let cta2_button_link =  this.parseURLParams(result.data.data.template.landing.cta2_button_link)
                            let arr = []
                            Object.keys(cta2_button_link).map(function(key, index) {
                                arr.push(key.replace(/{|}/g,''))
                            });
                            let count = 0
                            arr.forEach((num1, index) => {
                                if(variables[num1]){
                                    url+= count==0 ? variables[num1] : '&'+variables[num1]
                                    count =  count+1;
                                } else {
                                    console.log(num1,'not found in variables')
                                }
                            });
                            this.setState({cta2_button_link: url})
                        }
                    } else {
                        this.setState({
                            cta2_button_link: result.data.data?.template?.landing.cta2_button_link,
                            cta_button_link: result.data.data?.template?.landing.cta_button_link
                        })
                    }
                } else {
                    toast.warning(result.data.message)
                    this.props.history.push('/login')
                }
            }
            this.setState({isLoading: false})
        }).catch((err) => {
            console.log(err.message);
            this.setState({isLoading: false})
        })
    }

    parseURLParams=(url)=>{
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;
    
        if (query === url || query === "") return;
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
    
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }

    render = () => html.apply(this);
}

export default (Landing);
