import React, { useState, useEffect } from 'react';
import "./App.css";



const TabelaArmazens = () => {
const [armazens, setArmazens] = useState([]);
const [editingId, setEditingId] = useState(null);
const [localizacao, setLocalizacao] = useState('');
const [tipo, setTipo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3009/armazem')
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
    fetch(`http://localhost:3009/armazem/${id}`, {
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

    fetch(`http://localhost:3009/armazem/${id}`, {
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

  return (
    <div>
      <h1>Armazéns</h1>
      <table className="tabela-armazens">
        <thead>
          <tr>
            <th>ID</th>
            <th>Localização</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {armazens.map((armazem) => (
            <tr key={armazem.id}>
              <td>{armazem.id}</td>
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
                  <button
                    className="submit-button4"
                    onClick={() => handleUpdate(armazem.id)}
                  >
                    Confirmar
                  </button>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default TabelaArmazens;