
import React from 'react';
import { Container } from 'react-bootstrap';
import HomeSectionContent from '../components/HomeSectionContent';


const HomePageComp = () => {
    const rockArtists = ['queen', 'u2', 'thepolice', 'eagles', 'thedoors', 'oasis', 'thewho', 'bonjovi'];
    const popArtists = ['maroon5', 'coldplay', 'onerepublic', 'jamesblunt', 'katyperry', 'arianagrande'];
    const hipHopArtists = ['lilwayne', 'drake', 'kanyewest', 'travisscott', 'gunna', 'future', 'yeat'];

    return (
        <Container >
                
                    <h2>Rock Classics</h2>
                    <HomeSectionContent artists={rockArtists} />
              
           
                    <h2>Pop Culture</h2>
                    <HomeSectionContent artists={popArtists} />
          
               
                    <h2>HipHop</h2>
                    <HomeSectionContent artists={hipHopArtists} />
         
        </Container>
    );
};

export default HomePageComp;