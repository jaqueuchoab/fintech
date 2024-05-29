import React from 'react';
import { useData } from '../Context/DataContext';

// Estilização padrão dos botões
const style: React.CSSProperties = {
  padding: 'var(--gap) var(--gap-s)',
  backgroundColor: 'var(--color-3)',
  border: 'none',
  borderRadius: 'var(--gap)',
  color: 'var(--color-2)',
  fontWeight: '600',
  textTransform: 'capitalize',
};

// Função que retorna o nome de meses a partir do n passado
function nomeMes(n: number) {
  const date = new Date();
  // Permite ir para meses adiante ao atual ou anteriores, dependem do n
  date.setMonth(date.getMonth() + n);
  // Intl articifio que permite formatar dados, de acordo com as configs informadas por parâmetro
  return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
}

// Retorna a data formatada no padrão yyyy-mm-dd
function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

// Componente mesBtn
const MesBtn = ({ n }: { n: number }) => {
  // Funções dos estados inicio e final
  const { setInicio, setFinal } = useData();

  // Muda inicio e final para respectivamente, o primeiro dia do mês em questão no button, e para o último dia do mês em questão
  function setMes(n: number) {
    const date = new Date();
    date.setMonth(date.getMonth() + n);

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    setInicio(formatDate(firstDay));
    setFinal(formatDate(lastDay));
  }

  return (
    <button
      style={style}
      // Ativação setMes
      onClick={() => {
        setMes(n);
      }}
    >
      {nomeMes(n)}
    </button>
  );
};

export default MesBtn;
