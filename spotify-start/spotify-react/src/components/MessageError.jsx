import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default function MessageError({err}) {
  return (
    <Alert variant = 'warning'>{err}</Alert>
  )
}

