import { IVenda } from '../Context/DataContext';

const VendaItem = ({ venda }: { venda: IVenda }) => {
  return (
    <div className='venda box'>
      <a href="" style={{ fontFamily: 'monospace' }}>
        {venda.id}
      </a>
      <div>{venda.nome}{venda.data}</div>
      <div>
        {venda.preco.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </div>
    </div>
  );
};

export default VendaItem;
