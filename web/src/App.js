import React, { useState, useEffect } from 'react';
import api from './services/api'
// import { Header } from './Header';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

/*
Voce sabe React?

* Componente:
  - funcao que retorna algum conteudo (html, css, outro javascript)
  - nao interfere no restante da aplicacao (independente)
  - sempre comeca com letra maiuscula
* Propriedade:
  - informacoes dos componentes PAI para os componentes FILHOS
* Estado:
  - informacao que o componente vai mainpular
  - mantida pelo componente
  - conceito: imutabilidade

*/

function App() {
  // nao pode usar uma var simples como abaixo
  // const counter = 0;

  // use state retorna uma variavel e uma funcao que eh usada para alterar o valor dela
  // const [counter, setCounter] = useState(0);

  // function incrementCounter() {
  //   //counter++;
  //   setCounter(counter + 1)
  //   console.log(`clicou em counter, valor atual: ${counter}`)
  // }

  const [devs, setDevs] = useState([]);
  
  /* useEffect: dispara uma funcao toda vez que informacao for alterada 
  - a funcao que vai ser executada
  - vetor de vars que monitora para ver se teve alteracoces
  */
  useEffect(()=>{
    async function loadDevs() {
     const response = await api.get('/devs');
     setDevs(response.data)
    }

    loadDevs();    
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    console.log(response.data);

    setDevs([...devs, response.data])
  }

  return (
    // <>
    //   <Header title="Dashboard" />
    //   <h1>Contador: {counter}</h1>
    //   <button onClick={incrementCounter}>Incrementar</button>
    // </>
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
