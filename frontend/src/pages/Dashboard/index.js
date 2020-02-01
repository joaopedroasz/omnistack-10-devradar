import React, {
  useEffect, // Função que serve para disfarar uma função toda vez que uma informação mudar.
  useState
} from 'react';

import './../../global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

import api from '../../services/api';

import DevItem from '../../components/DevItem';
import DevForm from '../../components/DevForm';

function App({ history }) {
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

  function handleEditDev(id) {
    history.push(`/dev/${id}`);
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
            <DevItem key={dev._id} dev={dev} handleEditDev={handleEditDev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;