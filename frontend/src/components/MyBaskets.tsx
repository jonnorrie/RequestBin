import React from 'react'

const MyBaskets = (props:any) => {
  return (
    <div>
      <h2>My Baskets</h2>
      {props.baskets.map((basket: any) => {
        return (
          <p key={String(basket)}>
            <button type="button" onClick={() => props.onBasketClick(basket)}>
              {basket}
            </button>
          </p>
        )
      })}
    </div>
  )
}

export default MyBaskets
