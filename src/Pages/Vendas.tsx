import React from 'react'
import { useData } from '../Context/DataContext'
import VendaItem from '../Components/VendaItem';

const Vendas = () => {
  const { data } = useData();

  if(data === null) return null;
  return (
    <ul className='box'>
      {data.map((venda) => <li key={venda.id}><VendaItem venda={venda}/></li>)}
    </ul>
  )
}

export default Vendas
