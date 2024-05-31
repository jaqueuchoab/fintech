import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { IVenda } from '../Context/DataContext';
import Loading from '../Components/Loading';

// Omitindo a data do tipo IVenda pois é o único dado que se diverge do tipo de venda
type VendaSemData =Omit<IVenda, 'data'>;

const Venda = () => {
  // Acesso ao parametro id, usado na rota
  const { id } = useParams();
  // Fetch de uma venda só, não usar o contexto pois ela traz de um inico a um fim. Aqui precisamos da informação de uma venda especifica, o tipo de venda já foi definido inicialmente
  const { data, loading } = useFetch<IVenda>(
    `https://data.origamid.dev/vendas/${id}`,
  );

  if(loading === true) return <Loading/>
  if(data === null) return null;
  return (
    <div>
      <div className="box mb">ID: {data?.id}</div>
      <div className="box mb">Nome: {data?.nome}</div>
      <div className="box mb">
        Preço:{' '}
        {data?.preco.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </div>
      <div className="box mb">Status: {data?.status}</div>
      <div className="box mb">Pagemento: {data?.pagamento}</div>
    </div>
  );
};

export default Venda;
