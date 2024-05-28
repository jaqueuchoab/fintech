// Criando um contexto para o uso global dos dados vindos da api
import React from 'react';
import useFetch from '../Hooks/useFetch.tsx';

// Tipo para o retorno context
type IDataContext = {
  data: IVenda[] | null;
  loading: boolean;
  error: string | null;
  inicio: string;
  final: string;
  setInicio: React.Dispatch<React.SetStateAction<string>>;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
};

// Tipo de venda, dado retornado do fecth
type IVenda = {
  id: string;
  nome: string;
  preco: number;
  status: 'pago' | 'processando' | 'falha';
  pagamento: 'boleto' | 'pix' | 'cartao';
  data: string;
  parcelas: number | null;
};

// Criação do contexto
const DataContext = React.createContext<IDataContext | null>(null);

// Função instantanea que promove a facilidade no uso dos values compartilhados pelo contexto 
export const useData = () => {
  // Usando o contexo de antemão
  const context = React.useContext(DataContext);
  // Importando o contexto diretamente
  if (!context) throw new Error('useData precisa estar em DataContextProvider');
  return context;
};

// Função que pega a data atual, será usada para trazer sempre um valor inicial para os states incio e final
function getDate(before: number) {
  const date = new Date();
  date.setDate(date.getDate() - before);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

// Provider que permite o acesso global, desde que seja importado, aos valores definidos em value
export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  // Inicio e final de vendas passadas
  const [inicio, setInicio] = React.useState(getDate(30));
  const [final, setFinal] = React.useState(getDate(0));

  //. Retorno da useFetch, na url modificada justamente de acordo com o inicio e fim do periodo em que deseja-se ver os relatórios
  const { data, loading, error } = useFetch<IVenda[]>(
    `https://data.origamid.dev/vendas/?inicio=${inicio}&?final=${final}`,
  );
  console.log(data);
  
  return (
    // Retorno do provedor do contexto e seu valores que podem ser acessados pelo children 
    <DataContext.Provider value={{ data, loading, error, inicio, setInicio, final, setFinal }}>
      {children}
    </DataContext.Provider>
  );
};
