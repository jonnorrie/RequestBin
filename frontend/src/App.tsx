import { useState, useEffect } from 'react'
import './App.css';
import NewBasket from './components/NewBasket'
import MyBaskets from './components/MyBaskets'

function App() {

  const dummyBasketData = `http://localhost:3000/asjdfj`
  
  const [userToken, setUserToken] = useState<string | null>(null)
  const [baskets, setUserBaskets] = useState([dummyBasketData]) //TODO rewire when Backend team adds endpoints
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null)
  const [selectedBasketRequests, setSelectedBasketRequests] = useState<any[]>([])
  
  function buildDummyRequests(basketId: string) {
    return [
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-bin-id": basketId },
        body: { event: "payment.created", amount: 2500, currency: "USD" },
        path: `/api/web/${basketId}`,
        date: new Date().toISOString(),
      },
      {
        method: "GET",
        headers: { "user-agent": "Mozilla/5.0", "x-bin-id": basketId },
        body: "health check",
        path: `/api/web/${basketId}/status`,
        date: new Date(Date.now() - 60000).toISOString(),
      },
    ]
  }

  function handleBasketClick(basket: any) {
    const basketId = String(basket)
    setSelectedBasket(basketId)
    setSelectedBasketRequests(buildDummyRequests(basketId))
  }

  useEffect(() => {
    let token = localStorage.getItem('userToken') || null
    setUserToken(token);

    //why are we using a POST request here?? I changed to 'GET'.
    //Also I think we need to pass token via header, we can change when backend team updates.
    fetch("/api/web/baskets", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    })
      .then(response => response.json())
      .then((data: { token: string, baskets: any }) => {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        setUserBaskets(data.baskets);
      })
      .catch(err => {
        console.error("An error occurred", err);
      });
  }, []);

  return (
    <div className="App">
      <div className="component-container">
        <div className="new-basket-panel">
          <NewBasket />
        </div>
        <div className="my-baskets-panel">
          <MyBaskets baskets={baskets} onBasketClick={handleBasketClick} />
        </div>
      </div>
      {selectedBasket && (
        <div style={{ padding: "1.5rem", textAlign: "left" }}>
          <h2>Requests for Basket: {selectedBasket}</h2>
          {selectedBasketRequests.map((request, index) => (
            <div key={index} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem" }}>
              <p><strong>Method:</strong> {request.method}</p>
              <p><strong>Path:</strong> {request.path}</p>
              <p><strong>Date:</strong> {request.date}</p>
              <p><strong>Headers:</strong></p>
              <pre>{JSON.stringify(request.headers, null, 2)}</pre>
              <p><strong>Body:</strong></p>
              <pre>{typeof request.body === "string" ? request.body : JSON.stringify(request.body, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
