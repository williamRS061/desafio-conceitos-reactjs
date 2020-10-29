import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Frontend app',
      url: 'https://github.com/user',
      techs: ['nodejs', 'react']
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repos = [...repositories];
    const repoIndex = repos.findIndex((repo) => repo.id === id);
    repos.splice(repoIndex, 1);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
