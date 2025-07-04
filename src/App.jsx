import { useState, useEffect } from 'react'


function App() {
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.log(err))
  }, [])

  console.log(politicians)

  return (
    <div className='container'>
      <h1>Lista politici</h1>
      <div className="row gap-3 politicians-list">
        {politicians.map(politician => (
          <div className="col-md-3 mb-4" key={politician.id}>
            <div className="card" style={{ width: "18rem" }}>
              <img className='card-img-top' src={politician.image} alt={politician.name} />
              <div className="card-body">
                <h2 className='card-title'>Nome: {politician.name}</h2>
                <p className="card-subtitle mb-2 text-muted">Posizione: {politician.position}</p>
                <p className="card-text">{politician.biography}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default App
