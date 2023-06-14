import React, { useState, useEffect } from 'react';
import "../App.css";


const TabelaArmazens = () => {
  const [armazens, setArmazens] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3009/armazem`, {withCredentials:true})
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          throw new Error('Erro na resposta da solicitação.');
        }
      })
      .then((dados) => {
        setArmazens(dados);
      })
      .catch((erro) => {
        console.error('Ocorreu um erro:', erro);
      });
  }, []);

  const excluirArmazem = (id) => {
    fetch(`http://${window.location.hostname}:3009/armazem/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          const armazensAtualizados = armazens.filter(
            (armazem) => armazem.id !== id
          );
          setArmazens(armazensAtualizados);
        } else {
          throw new Error('Erro ao excluir o armazém.');
        }
      })
      .catch((erro) => {
        console.error('Ocorreu um erro:', erro);
      });
  };

  const handleUpdate = (id) => {
    const data = {
      localizacao,
      tipo
    };

    fetch(`http://${window.location.hostname}:3009/armazem/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Atualizar a lista de armazéns após a atualização
        const armazensAtualizados = armazens.map((armazem) => {
          if (armazem.id === id) {
            return {
              ...armazem,
              localizacao: data.localizacao,
              tipo: data.tipo
            };
          }
          return armazem;
        });
        setArmazens(armazensAtualizados);
        setEditingId(null);
        setLocalizacao('');
        setTipo('');
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  };

  const handleEdit = (id, localizacao, tipo) => {
    setEditingId(id);
    setLocalizacao(localizacao);
    setTipo(tipo);
  };

  const handleAdd = () => {
    setShowModal(true);// Mostrar o modal para adicionar um novo armazém
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fechar o modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const novoArmazem = {
      localizacao,
      tipo
    };
  
    fetch(`http://${window.location.hostname}:3009/armazem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoArmazem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArmazens([...armazens, data]); // Adiciona o novo armazém à lista
        setLocalizacao('');
        setTipo('');
        setShowModal(false); // Fecha o modal após a adição do armazém
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
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
            <th>Localização</th>
            <th>Tipo</th>
            <th>Ações 
              <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
          
        </thead>
        <tbody>
          {armazens.map((armazem) => (
            <tr key={armazem.id}>
              <td>#{armazem.id}</td>
              <td>
                {editingId === armazem.id ? (
                  <input
                    type="text"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                  />
                ) : (
                  armazem.localizacao
                )}
              </td>
              <td>
                {editingId === armazem.id ? (
                  <input
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                ) : (
                  armazem.tipo
                )}
              </td>
              
              <td>
                {editingId === armazem.id ? (
                 <>
                 <button
                    className="submit-button5"
                    onClick={() => handleUpdate(armazem.id)}
                  >
                    Guardar
                  </button>

                  <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>

                ) : (
                  <>
                    <button
                      className="submit-button5"
                      onClick={() =>
                        handleEdit(
                          armazem.id,
                          armazem.localizacao,
                          armazem.tipo
                        )
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="submit-button4"
                      onClick={() => excluirArmazem(armazem.id)}
                    >
                      
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
            
          )
          )}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de armazéns: {armazens.length}
        </td>
      </table>
      
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Armazém
      </button>

      

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Armazém</h2>
            <form className="form-armazem" onSubmit={handleSubmit}>
              Localização:
              <label className="label">
                <input
                  className="input-armazem"
                  type="text"
                  value={localizacao}
                  onChange={(event) => setLocalizacao(event.target.value)} required
                />
              </label>
              Tipo:
              <label className="label">
                <input
                  className="input-armazem"
                  type="text"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}  required
                />
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




function CriarArmazem() {
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      localizacao,
      tipo
    };

    fetch('http://localhost:3009/armazem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // Processar a resposta do servidor
        console.log(data);
      })
      .catch(error => {
        // Lidar com erros
        console.error('Ocorreu um erro:', error);
      });
  };

  return (
    <div>
      <h2>Adicionar Armazém</h2>
      <form className="form-armazem" onSubmit={handleSubmit}>
        <label className='label'>
          Localização:
          <input
            className="input-armazem"
            type="text"
            value={localizacao}
            onChange={event => setLocalizacao(event.target.value)}
          />
        </label>
        <label className='label'>
          Tipo:
          <input
            className="input-armazem"
            type="text"
            value={tipo}
            onChange={event => setTipo(event.target.value)}
          />
        </label>
        <button className="submit-button" type="submit">Adicionar</button>
      </form>
    </div>

  
  );
}

function ExcluirArmazem() {
  const [armazemId, setArmazemId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3009/armazem/${armazemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Exibe a mensagem de sucesso retornada pelo servidor
      } else {
        throw new Error('Erro na resposta da solicitação.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <div>
      <h2>Remover Armazém</h2>
      <form className="form-armazem" onSubmit={handleSubmit}>
        <label className='label'>
          ID do Armazém:
          <input
            className="input-armazem"
            type="text"
            value={armazemId}
            onChange={(event) => setArmazemId(event.target.value)}
          />
        </label>
        <button className="submit-button" type="submit">Excluir</button>
      </form>
    </div>
  );
}

const atualizarArmazem = async (id, localizacao, tipo) => {
  try {
    const response = await fetch(`http://localhost:3009/armazem/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ localizacao, tipo })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro na resposta da solicitação.');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    throw error;
  }
};

const AtualizarArmazemForm = () => {
  const [id, setId] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se pelo menos um parâmetro foi fornecido
    if (localizacao.trim() === '' && tipo.trim() === '') {
      console.log('Nenhum parâmetro foi fornecido. O armazém não será alterado.');
      return;
    }

    // Chamar a função atualizarArmazem com os valores fornecidos
    atualizarArmazem(id, localizacao, tipo)
      .then((data) => {
        console.log('Armazém atualizado:', data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao atualizar o armazém:', error);
      });
  };

  return (
    <div>
      <h2>Atualizar Armazém</h2>
      <form className="form-armazem" onSubmit={handleSubmit}>
        <label className="label">
          ID do Armazém:
          <input
            className="input-armazem"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </label>
        <label className="label">
          Nova Localização:
          <input
            className="input-armazem"
            type="text"
            value={localizacao}
            onChange={(event) => setLocalizacao(event.target.value)}
          />
        </label>
        <label className="label">
          Novo Tipo:
          <input
            className="input-armazem"
            type="text"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
          />
        </label>
        <button className="submit-button" type="submit">Atualizar</button>
      </form>
    </div>
  );
};


export {TabelaArmazens, CriarArmazem, ExcluirArmazem, AtualizarArmazemForm};



