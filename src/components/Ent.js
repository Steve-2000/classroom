import React from 'react'
import Results from './Results'
import { useParams } from 'react-router-dom'

const Ent = () => {
  const {id}=useParams()
  return (
    <div className="results">
      <Results/>
      
    </div>
  )
}

export default Ent