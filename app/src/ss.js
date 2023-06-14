/*const TabelaArmazens = () => {
    const [armazens, setArmazens] = useState([]);
  
    useEffect(() => {
      // Fazer o pedido GET usando o fetch
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
            // Atualizar a lista de armazéns após a exclusão
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
  
    return (
      <div>
        <h1>Tabela de Armazéns</h1>
        <table className="tabela-armazens">
          <thead>
            <tr>
              <th>ID</th>
              <th>Localização</th>
              <th>Tipo</th>
              <th>Ações</th> {/* Nova coluna para as ações *}
            </tr>
          </thead>
          <tbody>
            {armazens.map((armazem) => (
              <tr key={armazem.id}>
                <td>{armazem.id}</td>
                <td>{armazem.localizacao}</td>
                <td>{armazem.tipo}</td>
                <td>
                  <button className='submit-button4' onClick={() => excluirArmazem(armazem.id)}>Excluir</button>
                </td> {/* Botão Excluir *}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  */