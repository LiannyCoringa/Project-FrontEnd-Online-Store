import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from './services/api';

export default function Pesquisa() {
  // Define uma variável de estado chamada productArray e uma função para atualizá-la, setProductArray
  const [productArray, setProductArray] = useState([]);
  // Define o valor inicial da variável de estado como um array vazio
  // Cria um estado para receber o array das categorias
  const [categoriesArray, setCategoriesArray] = useState([]);
  useEffect(() => {
    // Nesse efeito, a função setProductArray é chamada para definir o valor inicial da variável de estado productArray como um array vazio.
    setProductArray([]);
    const categories = async () => {
      const data = await getCategories();
      console.log(data);
      setCategoriesArray(data);
    };
    categories();
  }, []);

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
      <input type="text" placeholder="Digite sua busca" />
      {/* Acrescenta as categorias */}
      <h2>Categorias:</h2>
      {categoriesArray.map(({ id, name }) => (
        <div key={ id }>
          <label data-testid="category" htmlFor={ id }>{ name }</label>
          <input type="radio" id={ id } />
        </div>
      ))}
      {/* Verifica se o tamanho do array productArray é igual a zero */}
      {productArray.length === 0
        ? (
          // Se for verdadeiro, renderiza um elemento <h1> com uma mensagem e um atributo data-testid
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>)
        : ''}
    </div>
  );
}
