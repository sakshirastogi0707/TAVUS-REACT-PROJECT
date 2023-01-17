import {Config} from "./config";

export const baseUrl = Config.API_URL
export const baseUrlLocal = 'http://localhost:5000/api/v1/'
const SubsBase = `${baseUrl}substitution`
const AudioGenBase = `${baseUrl}audioGen`
const DynamicSampleBase = `${baseUrl}dynamicSample`
export const urls = {
    //auth
    login: baseUrl + 'auth/login/',
    register: baseUrl + 'auth/register',
    initialSignup:  baseUrl + 'auth/initial-signup',
    //users
    survey: baseUrl +'users/survey',
    getUserDetail: baseUrl +'users/me',
    profile: baseUrl+'users/profile',
    getUsers: baseUrl +'users/all',
    getUserStatus: baseUrl +'users/email',
    userInvite: baseUrl +'users/invite',
    inviteUser: baseUrl +'users/invite',
    inviteUserMail: baseUrl +'users/invite-mail',
    setDomain: baseUrl +'users/settings-domain',
    validateDomain: baseUrl +'users/validate-domain',
    albCreation: baseUrl +'users/alb-creation',
    albValidate: baseUrl +'users/alb-validate',
    defaultDomain: baseUrl +'users/default-domain',
    activeDomain: baseUrl +'users/active-domain',
    getDomain: baseUrl +'users/user-domain',
    domain: baseUrl +'users/domain',
    userRoleUpdate: baseUrl +'users/',
    uploadLogo: baseUrl +'uploads/logo',
    uploadVideoRecording: baseUrl +'uploads/video-recording',
    micAvail: baseUrl +'users/is-mic-available',
    userSteps: baseUrl +'users/steps',
    paragraphs: baseUrl +'voices/paragraphs',
    campaignTraining: baseUrl +'voices',
    myVoice: baseUrl +'voices/list',
    getScriptVideo:`${baseUrl}users/scriptRecording/`,

    uploadVoices: baseUrl +'uploads/voices',
    trainingPermisionVideo: baseUrl +'uploads/training-permissions-video',
    //videos
    requestsDownload:  baseUrl +'requests/downloads',
    requests:  baseUrl +'requests',
    videos:  baseUrl +'videos',
    getVideos: baseUrl +'requests',
    getRequests: baseUrl +'videos/get-requests',
    postRequests: baseUrl +'videos/post-requests',
    postVideos: baseUrl +'videos/request-video',
    uploadVideos: baseUrl +'uploads/upload-video',
    uploadBackgroundVideo: baseUrl +'videos/upload-background-video',
    deleteVideoS3: baseUrl +'videos/deleteVideoS3',
    retryVideos: baseUrl +'videos/retry',
    resetVideoQaStatus: baseUrl +'videos/reset-qa-status',
    postCsv: baseUrl +'videos/request-csv',
    updateLandingName: baseUrl +'videos/updateLandingName',
    verifyVideo: baseUrl +'videos/qa-status',
    variablePreview: baseUrl +'voices/variables/preview/',
    csvVideoRequest: baseUrl +'videos/csv-video-request/',
    downloadCsv: baseUrl +'bulk-requests/download-process-csv/',
    getCsvStatus : baseUrl +'videos/csvStatus/',
    //templates
    getTemplates: baseUrl +'templates',
    campaignsWithAsign: baseUrl +'campaigns/with-assignuser',
    getAllCampaigns: baseUrl +'campaigns/users',
    templatesWithAsign: baseUrl +'templates/with-assignuser',
    assignTemplate: baseUrl +'templates/assign',
    unassign: baseUrl +'templates/unassign',
    //avtars and mux
    getAvtars: baseUrl +'avatars/2/dynamic-variables',
    downloadVideo: baseUrl +'mux/dowaload-enabled',
    //analytics
    cube: baseUrl+"cube",
    
    //integrations
    getIframeSrc: baseUrl + 'integrations/get-iframe-src',
    getAvailableConnectors: baseUrl + 'integrations/get-available-connectors',
    enableSolutionInstance: baseUrl + 'integrations/enable-solution-instance',
    generateAPIKey: baseUrl + 'integrations/generate-api-key',
    zapierWebhookSample: baseUrl + 'integrations/zapier-webhook',
    disableIntegrations: baseUrl + 'integrations/delete-campaign-integrations',
    
    //media template
    mediaTemplate: baseUrl + "media-templates",

    // campaign
    getCampaigns: baseUrl +'campaigns/sliders',
    getCampaignListV2: baseUrl +'campaigns/list-v2',
    getCampaignById: baseUrl +'campaigns/',
    getCampaignByPrimaryKey: baseUrl +'campaigns/get/',
    getCampaignById2: baseUrl +'campaigns/get/{1}?template_id={2}',
    saveCampaign: baseUrl +'campaigns',
    createCampaign: baseUrl +'campaigns/create',
    scripts: baseUrl +'scripts',
    getVariables: baseUrl +'variables/',
    addVariable: baseUrl +'variables/',
    removeVariable: baseUrl +'variables/{1}/remove',


    // subs
    getTranscript: `${SubsBase}/transcript/`,
    getTemplate: `${SubsBase}/template/`,
    revertTemplate: `${SubsBase}/template/revert/`,
    submitTemplate: `${SubsBase}/template/submit/`,
    updateSubstitutionConfig: `${SubsBase}/substitutionConfig/`,
    getSubs: `${SubsBase}/`,
    postNewVars: `${SubsBase}/`,
    deleteVars: `${SubsBase}/`,
    getAllSubVariableNames: `${SubsBase}/names/`,


    //audioGen
    getAudioRequestUrl: `${AudioGenBase}/status`,
    generateAudioRequest: `${AudioGenBase}/create`,


    // video 
    generateBackgroundVideoSample: `${DynamicSampleBase}/generate`,
    getBackgroundSample: `${DynamicSampleBase}/video/`,


    //bulk-request
    bulkRequest : baseUrl +'bulk-requests'

};
