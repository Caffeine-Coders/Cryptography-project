import React from 'react'

export const Chatcard = (props) => {
    const { photo, name, desc } = props;
  return (
    <div className='chatcard'> 
    <div className="card">
        <div class="card-body">
        <h5 class="card-title">
        <img src={photo} className='profilephoto'/>
        {name}
        </h5>
        <p class="card-text"> {desc}</p>
        </div>
    </div>
</div>
  )
}
