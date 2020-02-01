import React, {
  useState,
  useEffect
} from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Essa função retorna uma callback, que são duas funções, uma se a pesquisa pela localização deu certo, outra se deu errado.
    navigator.geolocation.getCurrentPosition(
      // Função caso a posição for pega com sucesso:
      (position) => {
        const { latitude, longitude } = position.coords;
        // Setando os estados 'Latitude' e 'Longitude'.
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    }); // Executando a função passada pelo componente pai.

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          type="text"
          name="github_username"
          id="github_username"
          value={github_username}
          onChange={event => setGithubUsername(event.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={event => setTechs(event.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={event => setLongitude(event.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default DevForm;