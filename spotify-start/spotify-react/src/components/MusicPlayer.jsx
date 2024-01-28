import React, { useState, useRef, useEffect } from "react";
import { Col, ProgressBar, Row, Image } from "react-bootstrap";
import { BiShuffle, BiSkipPreviousCircle, BiPlayCircle, BiPauseCircle, BiSkipNextCircle, BiRepeat, BiMicrophone, BiMenu, BiLaptop, BiVolumeLow, BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAlbum } from "../slice/albumSlice";
import { fetchArtist } from "../slice/artistSlice";
import { useSelector } from "react-redux";
import { formatTime } from "../data";
import { RemoveFromQueue } from "../slice/queueSlice";

const MusicPlayer = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {queue, current} = useSelector(state => state.queue);
    const audioRef = useRef(new Audio());

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSong, setCurrentSong] = useState()

    useEffect(() => {
        console.log(queue)
        if (queue && queue.length > 0) {
            setCurrentSong(queue[currentTrackIndex]);
        }
    }, [queue, currentTrackIndex]);

    useEffect(() => {
        setCurrentSong(current)
    }, [current])
    

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSkipPrevious = () => {
        const newIndex = (currentTrackIndex - 1 + queue.length) % queue.length 
        setCurrentTrackIndex(newIndex);
        setIsPlaying(true);
        audioRef.current.autoplay=true;
    };

    const handleSkipNext = () => {
        const newIndex = (currentTrackIndex + 1) % queue.length
        setCurrentTrackIndex(newIndex);
        setIsPlaying(true);
        audioRef.current.autoplay=true;
    };

    if (!queue || queue.length === 0 || !currentSong) {
        return null;
    }
    return (
        <>
            <Row className="position-fixed bottom-0 align-items-center bg-secondary-subtle" style={{width:'84%'}}>
                <Col sm={3} className="d-flex align-items-center">

                    <div className="p-3 ">
                        <Image src={currentSong.album.cover_small} className="img-fluid" width="60px" height="50px" alt="Album Art" onClick={() => {
                            navigate('/album/' + currentSong.album.title)
                            dispatch(fetchAlbum(currentSong.album.id))
                        }} />
                    </div>
                    <div className="flex-column p-2">
                        <p className="m-0" onClick={() => {
                            navigate('/artist/' + currentSong.artist.name)
                            dispatch(fetchArtist(currentSong.artist.id))
                        }}>{currentSong.title_short} </p>
                        <p className="m-0">{currentSong.artist.name}</p>
                    </div>
                </Col>

                <Col sm={6}>
                    <div className="text-white align-items-center d-flex justify-content-center fs-3">
                        <BiShuffle className="mx-1" />
                        <BiSkipPreviousCircle className="mx-1" onClick={handleSkipPrevious} />
                        {isPlaying ? (
                            <BiPauseCircle className="mx-1 fs-1" onClick={handlePlayPause} />
                        ) : (
                            <BiPlayCircle className="mx-1 fs-1" onClick={handlePlayPause} />
                        )}
                        <BiSkipNextCircle className="mx-1" onClick={handleSkipNext} />
                        <BiRepeat className="mx-1" />
                    </div>

                    <div className="progress-block mb-1 text-white d-flex justify-content-between align-items-center">
                        <div className="mr-2 ">{formatTime(currentTime)}</div>
                        <ProgressBar now={(currentTime / duration) * 100} className="w-100" variant="success" />
                        <div className="mr-2">{formatTime(duration)}</div>
                    </div>
                </Col>

                <Col sm={3}>
                    <div className="d-flex justify-content-end p-2">
                        <BiMicrophone className="mx-1" />
                        <BiMenu className="mx-1" />
                        <BiLaptop className="mx-1" />
                        <BiVolumeLow className="mx-1" />
                        <div className="progress-block mt-1 text-white d-flex justify-content-between align-items-center w-50">
                            <ProgressBar now={25} className="w-100" variant="success" />
                        </div>
                        <BiArrowBack className="mx-1" />
                    </div>
                </Col>
            </Row>
            <audio
                src={currentSong.preview}
                ref={audioRef}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onEnded={() => {
                    dispatch(RemoveFromQueue(currentSong))
                    handleSkipNext()
                }}
            />
        </>
    );
};


export default MusicPlayer;
