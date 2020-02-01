import React, {
  useEffect,
  useState
} from 'react';

import api from '../../services/api';

import './../../global.css';
import './styles.css';

// {match.params._id} id do dev

export default function DevUpdate({ match, history }) {
  const [dev, setDev] = useState({});
  const [devName, setDevName] = useState('');
  const [devBio, setDevBio] = useState('');
  const [devTechs, setDevTechs] = useState([]);

  useEffect(() => {
    async function loadDev() {
      const response = await api.get(`dev?_id=${match.params._id}`);

      setDev(response.data);
    }

    loadDev();
  }, [match.params._id]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: devName,
      bio: devBio,
      techs: devTechs
    };

    await api.put(`dev/${dev._id}`, data);

    history.push('/');
  }

  async function handleDeleteDev() {
    await api.delete(`dev/${dev._id}`);

    history.push('/');
  }

  return (
    <>
      <h1>Editar {dev.github_username}</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              onChange={e => setDevName(e.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              onChange={e => setDevBio(e.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Techs:</label>
            <input
              type="text"
              id="techs"
              onChange={e => setDevTechs(e.target.value)}
              required
            />
          </div>

          <div className="button-block">
            <button type="submit">Atualizar dev</button>
            <button type="button" onClick={() => handleDeleteDev()}>Excluir dev</button>
          </div>
        </form>
      </div>
    </>
  );
}