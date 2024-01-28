import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import HomeCard from './HomeCard'
import Loading from './Loading';
import MessageError from './MessageError';


export default function SearchPageComp() {
    const { query } = useParams()
    const { results, loading, error } = useSelector(state => state.searchResults)

    if (loading) return <Loading />;
    if (error) return <MessageError err={error} />;
    if (!results) return null;


    return (
        <Container>
            <h2>Results for "{query}"</h2>
            <Row xs={1} md={3} lg={5} className="g-5 py-3" >
                {results && results.map((card, i) => (
                    i < 15 && <HomeCard key={i} card={card} />
                ))}
            </Row>
        </Container>
    )
}