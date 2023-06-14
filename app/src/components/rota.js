import React, { useState, useEffect } from 'react';
import "../App.css";

const TabelaRotas = () => {
  const [rotas, setRotas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoChegada, setPontoChegada] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal 
  
  useEffect(() => {
    obterRotas();
  }, []);

  const obterRotas = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/rota`, { withCredentials: true });
      if (response.ok) {
        const data = await response.json();
        setRotas(data);
      } else {
        throw new Error('Erro na resposta.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };
 

  const deleteRota = (id) => {
    fetch(`http://${window.location.hostname}:3009/rota/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedRotas = rotas.filter((rota) => rota.id !== id);
          setRotas(updatedRotas);
        } else {
          throw new Error('Error deleting the rota.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const updateRota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3009/rota/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pontoPartida, pontoChegada }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedRotas = rotas.map((rota) => {
          if (rota.id === id) {
            return {
              ...rota,
              pontoPartida: data.pontoPartida,
              pontoChegada: data.pontoChegada,
            };
          }
          return rota;
        });
        setRotas(updatedRotas);
        setEditingId(null);
        setPontoPartida('');
        setPontoChegada('');
      } else {
        throw new Error('Erro ao atualizar o rota.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };


  const editRota = (id, pontoPartida, pontoChegada) => {
    setEditingId(id);
    setPontoPartida(pontoPartida);
    setPontoChegada(pontoChegada);
  };

  
  const handleAdd = () => {
    setShowModal(true); // Show the modal to add a new rota
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newRota = {
      pontoPartida: pontoPartida,
      pontoChegada: pontoChegada,
    };

    fetch(`http://${window.location.hostname}:3009/rota`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRota),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error adding the rota.');
        }
      })
      .then((data) => {
        console.log(data);
        setRotas([...rotas, data]);
        setPontoPartida('');
        setPontoChegada('');
        setShowModal(false); // Close the modal after submitting
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };
    
  return (
    <div>
      <table className="tabela-armazens">
        <thead>
          <tr>
          </tr>
          <tr>
            <th>ID</th>
            <th>Ponto de Partida</th>
            <th>Ponto de Chegada</th>
            <th>Ações <button className="submit-button8" onClick={handleAdd}>
                +
              </button> </th>
          </tr>
        </thead>
        <tbody>
          {rotas.map((rota) => (
            <tr key={rota.id}>
              <td>#{rota.id}</td>
              <td>
                {editingId === rota.id ? (
                  <input
                    type="text"
                    value={pontoPartida}
                    onChange={(e) => setPontoPartida(e.target.value)}
                  />
                ) : (
                  rota.pontoPartida
                )}
              </td>
              <td>
                {editingId === rota.id ? (
                  <input
                    type="text"
                    value={pontoChegada}
                    onChange={(e) => setPontoChegada(e.target.value)}
                  />
                ) : (
                  rota.pontoChegada
                )}
              </td>
              <td>
                {editingId === rota.id ? (
                    <>
                      <button className="submit-button5" onClick={() => updateRota(rota.id)}>Guardar</button>
                      <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="submit-button5" onClick={() => editRota(rota.id, rota.pontoPartida, rota.pontoChegada)}>Editar</button>
                      <button  className="submit-button4" onClick={() => deleteRota(rota.id)}>Excluir</button>
                      </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de Rotas: {rotas.length}
        </td>
      </table>
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Rota
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Rota</h2>
            <form className="form-armazem" onSubmit={handleSubmit}>
              Ponta Partida:
              <label className="label">
                <input className="input-armazem" type="text" id="marca" value={pontoPartida} onChange={(e) => setPontoPartida(e.target.value)} required />
              </label>
              Ponto Chegada:
              <label className="label">
              <input className="input-armazem" type="text" id="matricula" value={pontoChegada} onChange={(e) => setPontoChegada(e.target.value)} required />
              </label>
              <>
              <td>
                <button className="submit-button5" type="submit">
                  Adicionar
                </button>
                <button className="submit-button4" onClick={handleCloseModal}>
                Fechar
                </button>
              </td>
              </>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};







export default TabelaRotas;
