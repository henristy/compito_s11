import React, { useEffect, useState } from 'react'
import { Col, Image } from 'react-bootstrap'
import {GoHeart, GoHeartFill} from 'react-icons/go'
import { AddToFavorites, RemoveFromFavorites } from '../slice/favoritesSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAlbum } from '../slice/albumSlice'
import { fetchArtist } from '../slice/artistSlice'
import { Play } from '../slice/queueSlice'

export default function HomeCard({ card }) {
    const faves = useSelector(state => state.favorites.songs)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [like, setLike] = useState(false)

    useEffect(() => {
        faves.includes(card.id) && setLike(false)
    }, [faves, card.id])
    

    return (
    <Col>
        <p className='fw-bold m-0'>{card.title_short.length > 18 ? card.title_short.slice(0, 20) + '...' : card.title_short} 
            <span className='float-end' 
                onClick={()=> {
                    setLike(!like)
                    like ? dispatch(RemoveFromFavorites(card)) :  dispatch(AddToFavorites(card))
                }}>{like ? <GoHeartFill className='text-success' /> :<GoHeart className='text-success'/> }</span></p>
        <Image src={card.album.cover_medium} className='w-100' alt="Card image" onClick={() => dispatch(Play(card))}/>
        <p className='m-0 me-2'> Artist: 
            <span className='fw-bold text-decoration-none text-white' variant='link'
                onClick={() => {
                    navigate('/artist/' + card.artist.name )
                    dispatch(fetchArtist(card.artist.id))
                    }}>{card.artist.name}
            </span>
        </p>
        <p className='me-2 align-items-center'>Album:
            <span className='fw-bold text-decoration-none text-white' variant='link' 
                onClick={() => {
                    navigate('/album/' + card.album.title)
                    dispatch(fetchAlbum(card.album.id))
                    }}>{card.album.title}
            </span>
        </p>
    </Col >
  )
}
