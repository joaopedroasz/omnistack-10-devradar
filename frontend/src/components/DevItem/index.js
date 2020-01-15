import React from 'react';

import './styles.css';

function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt="Perfil do dev" />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p className="bio">{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
    </li>
  );
}

export default DevItem;