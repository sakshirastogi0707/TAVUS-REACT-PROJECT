const _config = {
    IMAGE_URL: '',
    VIDEO_URL: '',
    ENVIRONMENT: '',
    APP_URL: '',
    API_URL: '',
    LOCAL_STORAGE_URL_MAIN: '',
    LOCAL_STORAGE_URL_OTHER: '',
    APP_NAME: '',
    INTERCOM_APP_ID: '',
    SEGMENT_KEY:'',
};
for (const envKey in process.env) {
    _config[envKey.replace('REACT_APP_', '')] = process.env[envKey];
}
export const Config = _config
