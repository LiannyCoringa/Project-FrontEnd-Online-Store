import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

type CategoriesArray = {
  id: string;
  name: string;
} [];

type ResultsArray = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
} [];

export default function Pesquisa() {
  // Define uma variável de estado chamada productArray e uma função para atualizá-la, setProductArray
  const [productArray, setProductArray] = useState([]);
  // Define o valor inicial da variável de estado como um array vazio
  // Cria um estado para receber o array das categorias
  const [categoriesArray, setCategoriesArray] = useState<CategoriesArray>([]);
  // Cria um estado para manipulação do input
  const [search, setSearch] = useState('');
  const [resultsArray, setResultsArray] = useState<ResultsArray>([]);

  useEffect(() => {
    // Nesse efeito, a função setProductArray é chamada para definir o valor inicial da variável de estado productArray como um array vazio.
    setProductArray([]);
    const categories = async () => {
      const data = await getCategories();
      setCategoriesArray(data);
    };
    categories();
  }, []);

  // Adiciona a função que lida com o click do botão de pesquisa
  const handleBotao = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const item = categoriesArray
      .find((propriedade) => propriedade.name === search);
    if (item?.id) {
      const produtos = await getProductsFromCategoryAndQuery(item.id, search);
      setResultsArray(produtos.results);
    }
  };

  return (
    <div>
      {/* Renderiza button que dá acesso à página do carrinho de compras */}
      <button>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho de Compras
        </Link>
      </button>
      {/* Renderiza um elemento de entrada de texto com um espaço reservado "Digite sua busca" */}
      <input
        type="text"
        value={ search }
        placeholder="Digite sua busca"
        data-testid="query-input"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      {/* Renderiza um button de pesquisa */}
      <button
        type="button"
        data-testid="query-button"
        onClick={ (event) => handleBotao(event) }
      >
        Pesquisar
      </button>
      {/* Acrescenta as categorias */}
      <h2>Categorias:</h2>
      {categoriesArray.map(({ id, name }) => (
        <div key={ id }>
          <label data-testid="category" htmlFor={ id }>{ name }</label>
          <input type="radio" id={ id } />
        </div>
      ))}
      {/* Verifica se o tamanho do array productArray é igual a zero */}
      {/* Alterado para resultsArray para renderização */}
      {resultsArray.length === 0
        ? (
          // Se for verdadeiro, renderiza um elemento <h1> com uma mensagem e um atributo data-testid
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria
          </h1>)
        : (
          resultsArray.map(({ id, title, thumbnail, price }) => (
            <div key={ id } data-testid="product">
              <p>
                { title }
              </p>
              <img src={ thumbnail } alt={ title } />
              <p>
                { price }
              </p>
            </div>
          ))
        )}
    </div>
  );
}
