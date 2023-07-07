import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

type CategoriesArray = {
  id: string;
  name: string;
} [];

type DisplayResults = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
} [];

export default function Pesquisa() {
  // Define o valor inicial da variável de estado como um array vazio
  // Cria um estado para receber o array das categorias
  const [categoriesArray, setCategoriesArray] = useState<CategoriesArray>([]);
  // Cria um estado para manipulação do input
  const [search, setSearch] = useState('');
  const [productsList, setProductsList] = useState<DisplayResults>([]);

  useEffect(() => {
    // Nesse efeito, a função setResultsArray é chamada para definir o valor inicial da variável de estado resultsArray como um array vazio.
    setProductsList([]);
    const categories = async () => {
      const data = await getCategories();
      setCategoriesArray(data);
    };
    categories();
  }, []);

  // Adiciona a função que lida com o click do botão de pesquisa
  const handleBotao = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const produtos = await getProductsFromCategoryAndQuery(undefined, search);
    setProductsList(produtos.results);
  };

  const handleRadio = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoriaId = categoriesArray
      .find((element) => element.id === event.target.id);
    const resultadosCategoria = await
    getProductsFromCategoryAndQuery(categoriaId?.id, undefined);
    setProductsList(resultadosCategoria.results);
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
          <input
            type="radio"
            id={ id }
            onChange={ (event) => handleRadio(event) }
          />
        </div>
      ))}
      {/* Verifica se o tamanho do array productArray é igual a zero */}
      {/* Alterado para productsList para renderização */}
      {productsList.length > 0
        ? (
          productsList.map(({ id, title, thumbnail, price }) => (
            <div key={ id } data-testid="product">
              <p>
                { title }
              </p>
              <Link data-testid="product-detail-link" to={ `/ProductDetail/${id}` } />
              <img src={ thumbnail } alt={ title } />
              <p>
                { price }
              </p>
            </div>
          ))
        )
        : (
          // Se for falso, renderiza um elemento <h1> com uma mensagem e um atributo data-testid
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>)}
    </div>
  );
}
