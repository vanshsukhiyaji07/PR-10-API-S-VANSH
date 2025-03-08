import React from 'react'

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" >
  <div className="text-center">
    <div className="spinner-border text-white" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <h2 className="mt-3 text-white">LOADING...</h2>
  </div>
</div>


  )
}

export default Loading
