import React, { useState, useEffect, useCallback, useRef } from 'react';

const YoutubeVideo = (props) => {
    const { videoId, autoPlay, title } = props;
    const iframeRef = useRef();


    const videoURL = `https://www.youtube.com/embed/${videoId}${autoPlay ? "?autoplay=1" : ""}`;

    const defaultHeight = 495;

    const [videoHeight, setVideoHeight] = useState(iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight)

    const handleChangeVideoWidth = useCallback(() => {
        const ratio =
            window.innerWidth > 990
                ? 1.0
                : window.innerWidth > 522
                    ? 1.2
                    : window.innerWidth > 400
                        ? 1.45
                        : 1.85;
        const height = iframeRef.current
            ? iframeRef.current.offsetWidth * 0.5625
            : defaultHeight;
        return setVideoHeight(Math.floor(height * ratio));
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        const ratio =
            window.innerWidth > 990
                ? 1.0
                : window.innerWidth > 522
                    ? 1.2
                    : window.innerWidth > 400
                        ? 1.45
                        : 1.85;
        const height = iframeRef.current
            ? iframeRef.current.offsetWidth * 0.5625
            : defaultHeight;
        setVideoHeight(Math.floor(height * ratio));
        return function cleanup() {
            window.removeEventListener("resize", handleChangeVideoWidth);
        };
    }, [videoHeight, handleChangeVideoWidth]);


    return (
        <iframe
        ref={iframeRef}
        title={title}
        width="100%"
        height={`${videoHeight}px`}
        src={videoURL}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${videoURL}?autoplay=1><img src=https://img.youtube.com/vi/${videoId}/hqdefault.jpg alt=${title}><span>▶</span></a>`}
        />
  );
}

export default YoutubeVideo;