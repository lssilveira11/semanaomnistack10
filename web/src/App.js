import React, { useState } from 'react';
import { Header } from './Header';

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
  const [counter, setCounter] = useState(0); 

  function incrementCounter() {
    //counter++;
    setCounter(counter + 1)
    console.log(`clicou em counter, valor atual: ${counter}`)
  }

  return (
    <>
      <Header title="Dashboard" />
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default App;
