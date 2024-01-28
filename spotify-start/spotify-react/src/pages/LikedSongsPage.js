import React from 'react'
import { Col, Row, Image, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import TrackList from '../components/TrackList'

export default function LikedSongsPage() {

    const likedSongs = useSelector(state => state.favorites.songs)
    console.log(likedSongs)
    return (
        <Container>
            <Row md={1}>
                <Col>
                    <Row md={2} className='w-50 mx-auto'>

                        {likedSongs.toSorted(() => Math.random() - 0.5).map((song, i) => (i < 4 &&
                            <Col className='m-0 p-0' key={i} >
                                <Image src={song.album.cover_big} height={300} className='w-100' />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <h2 className='my-5'>Liked Songs:</h2>
                <Col>
                    {likedSongs.map((brano, i) => <TrackList brano={brano} key={i} i={i} />)}
                </Col>
            </Row>
        </Container>
    )
}
