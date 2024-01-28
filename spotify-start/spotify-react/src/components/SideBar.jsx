// Sidebar.js
import React, { useState } from 'react';
import { Navbar, Nav, Button, InputGroup, FormControl, Image} from 'react-bootstrap';
import { FaBookOpen, FaHome } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResults } from '../slice/searchResultsSlice';


const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    return (
        <Navbar className="position-fixed top-0 bottom-0 start-0 d-flex flex-column justify-content-between p-5" >
            <div>
                <Navbar.Brand>
                    <Image src="logo/Spotify_Logo.png" alt="Spotify_Logo" width="150" height="40" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className="me-auto flex-column">
                        
                        <Nav.Item onClick={()=> navigate('/')} className='pt-5 pb-2' ><FaHome /> Home</Nav.Item>
                        <Nav.Item onClick={()=> navigate('/likedSongs')}><FaBookOpen /> Liked Songs </Nav.Item>
                            
                        <Nav.Item className="py-2">
                            <InputGroup className="mt-3 w-75">
                                <FormControl value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" id="searchField"/>
                                <Button variant='outline-light' onClick={()=>{ dispatch(getResults(query)); navigate('/'+ query)}}>GO</Button>
                            </InputGroup>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </div>
            <div className='w-100 pe-5'>
                <p><Button variant='black' className='border-2 border-white rounded-5 w-100'>Sign Up</Button></p>
                <p><Button variant='light' className='border-2 rounded-5 w-100'>Login</Button></p>
                <p>
                    <Button variant='dark' className='text-white-50'>Cookie Policy</Button>|<Button variant='dark' className='text-white-50'> Privacy</Button>
                </p>
            </div>      
        </Navbar>
    );
};

export default Sidebar;
