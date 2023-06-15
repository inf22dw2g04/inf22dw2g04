import React, { useState, useEffect } from 'react';
import "../App.css";

const TabelaCamioes = () => {
  const [camioes, setCamioes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [marca, setMarca] = useState('');
  const [matricula, setmatricula] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal display

  useEffect(() => {
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
  }, []);

  const deleteCamiao = (id) => {
    fetch(`http://${window.location.hostname}:3009/camiao/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedCamioes = camioes.filter((camiao) => camiao.id !== id);
          setCamioes(updatedCamioes);
        } else {
          throw new Error('Error deleting the camiao.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const handleUpdate = (id) => {
    const data = {
      marca: marca,
      matricula: matricula,
    };
  
    fetch(`http://${window.location.hostname}:3009/camiao/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error updating the camiao.');
        }
      })
      .then((data) => {
        console.log(data);
        // Update the list of camioes after the update
        const updatedCamioes = camioes.map((camiao) => {
          if (camiao.id === id) {
            return {
              ...camiao,
              marca: data.marca,
              matricula: data.matricula,
            };
          }
          return camiao;
        });
        setCamioes(updatedCamioes);
        setEditingId(null);
        setMarca('');
        setmatricula('');
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const handleEdit = (id, marca, matricula) => {
    setEditingId(id);
    setMarca(marca);
    setmatricula(matricula);
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
      marca: marca,
      matricula: matricula,
    };

  fetch(`http://${window.location.hostname}:3009/camiao`, {
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
      setCamioes([...camioes, data]); // Add the new camiao to the list
      setMarca('');
      setmatricula('');
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
            <th>Marca</th>
            <th>Matricula</th>
            <th>ID Condutor</th>
            <th>Ações <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
        </thead>
        <tbody>
          {camioes.map((camiao) => (
            <tr key={camiao.id}>
              <td>#{camiao.id}</td>
              
              <td>{editingId === camiao.id ? <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} /> : camiao.marca}</td>
              
              <td>{editingId === camiao.id ? <input type="text" value={matricula} onChange={(e) => setmatricula(e.target.value)} /> : camiao.matricula}</td>
              <td>#{camiao.idCamionista}</td>
              <td>
                {editingId === camiao.id ? (
                  <>
                    <button className="submit-button5" onClick={() => handleUpdate(camiao.id)}>Guardar</button>
                    <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="submit-button5" onClick={() => handleEdit(camiao.id, camiao.marca, camiao.matricula)}>Editar</button>
                    <button  className="submit-button4" onClick={() => deleteCamiao(camiao.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <td colSpan="5" style={{ textAlign: 'right' }}>
          Total de camiões: {camioes.length}
        </td>
      </table>

      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Camiao
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Camião</h2>
            <form className="form-armazem" onSubmit={handleSubmit}>
              Marca:
              <label className="label">
                <input className="input-armazem" type="text" id="marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
              </label>
              Matricula:
              <label className="label">
              <input className="input-armazem" type="text" id="matricula" value={matricula} onChange={(e) => setmatricula(e.target.value)} required />
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


export default TabelaCamioes;
