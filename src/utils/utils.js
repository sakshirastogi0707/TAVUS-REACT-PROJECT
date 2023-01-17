
export const isObjectEmpty = (obj) => {
  if(typeof obj !== 'object') return true;
  return Object.keys(obj).length === 0
}


export function getVideoDuration(blob) {
    const videoElement = document.createElement("video")
    const blobUrl = URL.createObjectURL(blob)
    videoElement.src = blobUrl
    videoElement.preload = "metadata"
    return new Promise((resolve, reject) => {
        // this workaround is needed because of a Chrome bug
        // https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
        // https://bugs.chromium.org/p/chromium/issues/detail?id=642012
        videoElement.onloadedmetadata = async function () {
            while(videoElement.duration === Infinity) {
                await new Promise(r => setTimeout(r, 1000));
                videoElement.currentTime = 10000000*Math.random();
            }
            let duration = videoElement.duration;
            URL.revokeObjectURL(blobUrl)
            resolve(duration)
        }
    })
}

export function getVariableAndReplaceByValue(string,variableData) {
    let splitString = string.split(' ')
    let StringText = ''
    for(let i=0; i<splitString.length;i++){
        if(splitString[i].includes('@')){
            let trimText = splitString[i].split('|')
            if(trimText && trimText.length >0){
              let getVariableName =  trimText[0].split('@')
              if(getVariableName && getVariableName.length >1){
                if(variableData && variableData[getVariableName[1]] && variableData[getVariableName[1]] != undefined && variableData[getVariableName[1]] != ''){
                  StringText+= ` ${variableData[getVariableName[1]]}`
                }
              }
            }
        } else{
          StringText+= ` ${splitString[i]}`
        }
    }
    return StringText;
}
