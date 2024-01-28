import { useEffect, useState } from 'react';
import { BiArrowFromRight} from 'react-icons/bi';
import { Card, Container } from 'react-bootstrap';
import TrackList from './TrackList';
import Loading from './Loading';
import MessageError from './MessageError';
import { useSelector } from 'react-redux';
import { MdVerified } from "react-icons/md";
import { headers } from '../data';

const ArtistPageComp = () => {
  const { artist, loading, error } = useSelector(state => state.artist)
  const [songsData, setSongsData] = useState([]);

  

  useEffect(() => {
    const getTracks = async () => {
      try {
        fetch(artist.tracklist, { method: 'GET' , headers})
          .then((response) => response.json())
          .then((json) => setSongsData(json.data))
      } catch (error) {
        console.error(error);
      }
    };

    getTracks();
  }, [artist.tracklist]);


  if (loading) return <Loading />;
  if (error) return <MessageError err={error} />;
  if (!artist) return null;

  return (
    <Container>
      {artist && (
        <Card className='w-75 my-5 mx-auto'>
          <Card.Img src={artist.picture_big} height="700px" alt={`${artist.name}'s picture`} />
          <Card.ImgOverlay className="d-flex flex-column justify-content-between">
            <div>
              <BiArrowFromRight className="bi-arrow-left px-2 d-md-none fs-2 bg-body-tertiary bg-opacity-50 rounded-circle" />
            </div>
            <div>
              <p className="m-0 d-none d-md-block">
                <MdVerified className="text-primary" /> Artista verificato
              </p>
              <Card.Title className="fs-1 fw-bolder">{artist.name}</Card.Title>
              <Card.Text className=" d-none d-md-inline-block">{artist.nb_fan}</Card.Text>
              <span className="ms-2 d-none d-md-inline">ascoltatori mensili</span>
            </div>
          </Card.ImgOverlay>
        </Card>
      )}

      {songsData.map((brano, i) => <TrackList key={i} brano={brano} i={i}/>)}
    </Container >
  );
};

export default ArtistPageComp;
