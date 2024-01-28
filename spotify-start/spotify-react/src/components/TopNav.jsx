import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'

export default function TopNav() {
  return (
    <Row className="mb-3">
        <Col className=" d-none d-md-flex justify-content-evenly ">
          <Button variant='dark'>TRENDING</Button>
          <Button variant='dark'>PODCAST</Button>
          <Button variant='dark'>MOODS AND GENRES</Button>
          <Button variant='dark'>NEW RELEASES</Button>
          <Button variant='dark'>DISCOVER</Button>
        </Col>
    </Row>
  )
}
