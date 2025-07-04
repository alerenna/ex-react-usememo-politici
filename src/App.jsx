import { useState, useEffect, useMemo } from 'react'


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


/* 

📌 Milestone 2: Implementare la ricerca ottimizzata
- Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
- Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
- ❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.

*/