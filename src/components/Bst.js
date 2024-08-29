import React from 'react'
import Results from './Results'
import { useParams } from 'react-router-dom'



const Bst = () => {
  // let id={props.id2}
  const {id}= useParams();
  return (
  
  
    <div className="results">
      <Results/>
    
     
      
    </div>
    

  )
}

export default Bst