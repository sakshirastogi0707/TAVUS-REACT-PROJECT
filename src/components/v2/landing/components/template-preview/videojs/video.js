//
// This example assumes you are importing videojs-mux from npm
// View this code on codesandbox: https://codesandbox.io/s/mux-data-video-js-react-pyl1h
//
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
//import {Config} from "../../../../../../config/config";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-mux";
import "./video.scss";


export function VideoPlayer(props) {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && props.videoData !== undefined) {
      if (props) {
        setVideoSrc(props?.videoData?.stream_url)
      }
      const video = videoRef.current;
      const initTime = Date.now();
      var user = null
     
      
      playerRef.current = videojs(video, {
        sources: [{
          src: props?.videoData?.stream_url,
          type: "application/x-mpegURL",
          poster: 'http://video-js.zencoder.com/oceans-clip.jpg'
        }],
        plugins: {
          mux: {
            debug: false,
            data: {
              env_key: 'ffff', // required

              // Metadata
              player_name: "Tavus",
              //video_title: props.videoData?.landing_title,
              player_init_time: initTime.toExponential,
              //custom_1: props.videoData?.template_id.toString(),
              //custom_2: props.videoData?.userDomain,
              //custom_3: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
              //video_id: props.videoData?.id.toString(),
              //video_series: props.videoData?.template_id.toString(),
              //viewer_user_id: props.videoData?.userDomain

              // ... and other metadata
            }
          }
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoRef, props.videoData]);

  return (
    <video
      className="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered"
      //poster="http://video-js.zencoder.com/oceans-clip.png"
      controls
      ref={videoRef}
      //data-setup='{"example_option":true}'
      style={{
        width: "100%", maxWidth: "100%",
        height: props.height
      }}
    />
  );
}