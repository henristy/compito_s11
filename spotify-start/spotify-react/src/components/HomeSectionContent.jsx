// Home.js
import React, { useEffect, useState } from 'react';
import  Row from 'react-bootstrap/Row';
import { headers } from '../data';
import HomeCard from './HomeCard';
import MessageError from './MessageError';



const Home = ({ artists }) => {

    const [Cards, setCards] = useState([]);
    const [errMsg, setErrMsg] = useState([])

    const getSong = async (artist) => {
        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + artist, {
                method: 'GET',
                headers,
            })

            if (response.ok) {
                const result = await response.json()
                return result.data[Math.floor(Math.random() * result.data.length)];

            }

        } catch (err) {
            console.log(err)
            setErrMsg(err);
        }

    }

    useEffect(() => {
        artists.sort(() => Math.random() - 0.5).splice(5);
        const fetchData = async () => {
            const promises = artists.map(artist => getSong(artist));
            const results = await Promise.all(promises);
            setCards(results.flat());
        };

        fetchData();
    }, [artists]);

    if(!Cards) return <MessageError err={errMsg} />

    return (
        <Row xs={1} md={3} lg={5} className="g-5 py-3" >
            {Cards.map((card, i) => (
                <HomeCard key={i} card={card} />
            ))}
        </Row>
    );
};

export default Home;
