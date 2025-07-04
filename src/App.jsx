import { useState, useEffect, useMemo, memo } from 'react'

const Card = memo(({ name, image, position, biography }) => {
  console.log("Card");

  return (
    <div className="col-md-3 mb-4">
      <div className="card">
        <img className='card-img-top' src={image} alt={name} />
        <div className="card-body">
          <h2 className='card-title'>Nome: {name}</h2>
          <p className="card-subtitle mb-2 text-muted">Posizione: {position}</p>
          <p className="card-text">{biography}</p>
        </div>
      </div>
    </div>
  )
})




function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(err => console.log(err))
  }, [])

  console.log(politicians)

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const perName = politician.name.toLowerCase().includes(search.toLowerCase())
      const perBio = politician.biography.toLowerCase().includes(search.toLowerCase())

      return perName || perBio

    })
  }, [politicians, search])


  return (
    <div className='container'>
      <h1>Lista politici</h1>
      <div className="row gap-3 politicians-list">
        <h3>Cerca un politico</h3>
        <input
          type="text"
          placeholder='Cerca un politico per nome o bio'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filteredPoliticians.map(politician => (
          <Card {...politician} key={politician.id} />
        ))}
      </div>
    </div>
  )
}


export default App


/* 

📌 Milestone 3: Ottimizzare il rendering delle card con React.memo
- Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
- Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
- Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.

*/