import React, { useEffect, useState } from 'react'
import { Row, Col, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AddToFavorites, RemoveFromFavorites } from '../slice/favoritesSlice'
import { fetchArtist } from '../slice/artistSlice'
import { useNavigate } from 'react-router-dom'
import { AddToQueue, Play } from '../slice/queueSlice'
import { formatTime } from '../data'

export default function TrackList({ brano, i, likedPage }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [like, setLike] = useState(false)
    const faves = useSelector(state => state.favorites.songs)

    useEffect(() => {
        const isLiked = !likedPage && faves.some(song => song.id === brano.id)
        setLike(isLiked)
    }, [brano.id, faves, likedPage])

    const handleLikeToggle = () => {
        
        if (like) {
            dispatch(RemoveFromFavorites(brano))
        } else {
            dispatch(AddToFavorites(brano))
        }
        setLike(!like)
    }

    return (
        <Row>
            <Col xs={12} md={1} className="text-center cursor-pointer d-none d-md-block">{i + 1}</Col>
            <Col xs={12} md={5} onClick={() => dispatch(Play(brano))}>
                <p className={`m-0 fw-bold ${brano.type}`}>{brano.title}</p>
                <p className="text-white-50 m-0" onClick={() => {
                    navigate('/artist/' + brano.artist.name )
                    dispatch(fetchArtist(brano.artist.id))
                    }}>{brano.artist.name}</p>
            </Col>
            <Col xs={12} md={3} className="text-end d-none d-md-block">{brano.rank}</Col>
            <Col xs={12} md={2} className="text-end d-none d-md-block">
                {formatTime(brano.duration)}
            </Col>
            <Col xs={12} md={1} className="text-end">
                <Dropdown>
                    <Dropdown.Toggle className='bg-transparent border-0'></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e)=> {dispatch(AddToQueue(brano))}}>Add to queue</Dropdown.Item>
                        <Dropdown.Item onClick={handleLikeToggle}>
                            {like ? 'Remove from favorites' : 'Add to Favorites'}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
}
