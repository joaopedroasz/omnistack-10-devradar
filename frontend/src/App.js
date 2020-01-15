import React, {
  useEffect, // Função que serve para disfarar uma função toda vez que uma informação mudar.
  useState
} from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import api from './services/api';

import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';

function App() {
  const [devs, setDevs] = useState([]);

  // Como o array está vazio, a função vai ser executada uma única vez, quando o componente foi renderizado em tela:

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data) {
    // Acessando a API na rota POST '/devs', e passando as informações para criar um usuário.
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        {/* Passando uma função para o componente filho: */}
        <DevForm onSubmit={handleSubmit} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;