import React from 'react'

const NewBasket = () => {

  function handleCreateBasket(event: any) {
    event.preventDefault()
    let url = event.target.previousElementSibling.childNodes[0]
    console.log(url)
    let inputValue = event.target.previousElementSibling.children[0].value
    console.log(`${url}`)
  }

  return (
    <div>
      <h1>New Basket</h1>
      <p>Create a new basket to send HTTP requests to</p>
      <p>http://requestbasket.com/<input></input></p>
      <button onClick={handleCreateBasket}>Create</button>
    </div>
  )
}

export default NewBasket