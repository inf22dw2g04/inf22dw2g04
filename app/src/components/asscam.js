import React, { useState, useEffect } from 'react';
import "../App.css";

const AssociarCamionistaCamiao = () => {
  const [camionistas, setCamionistas] = useState([]);
  const [camioes, setCamioes] = useState([]);
  const [camionistaId, setCamionistaId] = useState('');
  const [camiaoId, setCamiaoId] = useState('');

  useEffect(() => {
    // Carregar a lista de camionistas e camiões
    fetchCamionistas();
    fetchCamioes();
  }, []);

  const fetchCamionistas = () => {
    // Fazer uma requisição GET para obter a lista de camionistas
    fetch(`http://${window.location.hostname}:3009/camionista`, { withCredentials: true })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error in response.');
        }
      })
      .then((data) => {
        setCamionistas(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const fetchCamioes = () => {
    // Fazer uma requisição GET para obter a lista de camiões
    fetch(`http://${window.location.hostname}:3009/camiao`, { withCredentials: true })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error in response.');
        }
      })
      .then((data) => {
        setCamioes(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const handleCamionistaChange = (event) => {
    setCamionistaId(event.target.value);
  };

  const handleCamiaoChange = (event) => {
    setCamiaoId(event.target.value);
  };

  const handleAssociar = () => {
    // Fazer uma requisição PUT para associar o camionista ao camião
    fetch(`http://${window.location.hostname}:3009/camionista/${camionistaId}/associar-camiao`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ camiaoId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Associação realizada com sucesso');
        } else {
          throw new Error('Error associating camionista and camiao.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div>
      <h2>Associar Camionista a Camião</h2>
      <div className="label">
        <label className="label">Camionista:</label>
        <select className="input-armazem" value={camionistaId} onChange={handleCamionistaChange}>
          <option value="">Selecione um camionista</option>
          {camionistas.map((camionista) => (
            <option key={camionista.id} value={camionista.id}>
              {camionista.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="label">
        <label className="label">Camião:</label>
        <select className="input-armazem" value={camiaoId} onChange={handleCamiaoChange}>
          <option value="">Selecione um camião</option>
          {camioes.map((camiao) => (
            <option key={camiao.id} value={camiao.id}>
              {camiao.marca} - {camiao.matricula}
            </option>
          ))}
        </select>
      </div>
      <div className="label"><button className="submit-button5" onClick={handleAssociar}>Associar</button></div>
      
    </div>
  );
};

export default AssociarCamionistaCamiao;
