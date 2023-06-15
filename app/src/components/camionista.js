import React, { useState, useEffect } from 'react';
import "../App.css";

const TabelaCamionistas = () => {
  const [camionistas, setCamionistas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [cc, setcc] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal 
  
  useEffect(() => {
    obterCamionistas();
  }, []);

  const obterCamionistas = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/camionista`, { withCredentials: true });
      if (response.ok) {
        const data = await response.json();
        setCamionistas(data);
      } else {
        throw new Error('Erro na resposta.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const excluirCamionista = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/camionista/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedCamionistas = camionistas.filter((camionista) => camionista.id !== id);
        setCamionistas(updatedCamionistas);
      } else {
        throw new Error('Erro ao excluir o camionista.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const atualizarCamionista = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/camionista/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, cc }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedCamionistas = camionistas.map((camionista) => {
          if (camionista.id === id) {
            return {
              ...camionista,
              nome: data.nome,
              cc: data.cc,
            };
          }
          return camionista;
        });
        setCamionistas(updatedCamionistas);
        setEditingId(null);
        setNome('');
        setcc('');
      } else {
        throw new Error('Erro ao atualizar o camionista.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const editarCamionista = (id, nome, cc) => {
    setEditingId(id);
    setNome(nome);
    setcc(cc);
  };

  
  const handleAdd = () => {
    setShowModal(true); // Show the modal to add a new camiao
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newCamiao = {
      nome: nome,
      cc: cc,
    };

  fetch(`http://${window.location.hostname}:3009/camionista`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCamiao),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding the camiao.');
      }
    })
    .then((data) => {
      console.log(data);
      setCamionistas([...camionistas, data]);
      setNome('');
      setcc('');
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
            <th>Nome</th>
            <th>CC</th>
            <th>Ações <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
        </thead>
        <tbody>
          {camionistas.map((camionista) => (
            <tr key={camionista.id}>
              <td>#{camionista.id}</td>
              <td>
                {editingId === camionista.id ? (
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                ) : (
                  camionista.nome
                )}
              </td>
              <td>
                {editingId === camionista.id ? (
                  <input type="text" value={cc} onChange={(e) => setcc(e.target.value)} />
                ) : (
                  camionista.cc
                )}
              </td>
              <td>
                {editingId === camionista.id ? (
                  <>
                    <button className="submit-button5" onClick={() => atualizarCamionista(camionista.id)}>Guardar</button>
                    <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="submit-button5" onClick={() => editarCamionista(camionista.id, camionista.nome, camionista.cc)}>Editar</button>
                    <button  className="submit-button4" onClick={() => excluirCamionista(camionista.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de camionistas: {camionistas.length}
        </td>
      </table>
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Camionista
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Camionista</h2>
            <form className="form-armazem" onSubmit={handleSubmit}>
              Nome:
              <label className="label">
                <input className="input-armazem" type="text" id="marca" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </label>
              CC:
              <label className="label">
              <input className="input-armazem" type="text" id="matricula" value={cc} onChange={(e) => setcc(e.target.value)} required />
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


export default TabelaCamionistas;
