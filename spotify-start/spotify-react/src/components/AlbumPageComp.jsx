import React from 'react';
import { Image, Col, Row, Container } from 'react-bootstrap';
import Loading from './Loading'
import MessageError from './MessageError'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCirclePlay} from "react-icons/fa6";
import TrackList from './TrackList';
import { PlayAlbum } from '../slice/queueSlice';

const AlbumPageComp = () => {
  const { album, loading, error } = useSelector(state => state.album)
  const dispatch = useDispatch()

  if (loading) return <Loading />;
  if (error) return <MessageError />;
  if (!album) return null;


  return (
    <Container>
      {album && (
        <Row className='mb-3'>
          <Col xs={12}  className="w-75 mx-auto">
            <Image src={album.cover_xl} alt={`${album.title_short} album cover photo`} className='w-100' height={500} />
          </Col>
          <Col xs={12} className="w-75 mx-auto pt-2 d-flex flex-column">
            <p className="d-none d-md-block">{album.type.toUpperCase()}</p>
            <h1 className="fw-bolder mb-2">{album.title}</h1>
            <div className="d-flex flex-column flex-md-row align-items-baseline justify-self-bottom">
              <p>
                <Image
                  className="rounded-circle me-3"
                  width="50px"
                  height="50px"
                  src={album.artist.picture_small}
                  alt={`${album.artist.name}'s picture`}
                />
                {album.artist.name}
              </p>
              <p>
                · {album.release_date.slice(0, 4)} · {album.nb_tracks} brani,  
                <span className="text-white-50 ms-2 me-5">{Math.floor(album.duration / 60)} min {album.duration % 60} sec.</span>
                <span><FaRegCirclePlay className='fs-1' onClick={() => dispatch(PlayAlbum(album.tracks.data))}/> </span>
              </p>
            </div>
          </Col>
        </Row>
      )}
      
      {album.tracks.data.map((brano, i) => <TrackList key={i} brano={brano} i={i} />)}
    </Container>
  );
};

export default AlbumPageComp;
