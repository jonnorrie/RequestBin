import React from 'react'

const MyBaskets = (props:any) => {
  return (
    <div>
      <h2>My Baskets</h2>
      {props.baskets.map((basket: any) => {
        return <p>{basket}</p>
      })}
    </div>
  )
}

export default MyBaskets