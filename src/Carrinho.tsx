import { useEffect, useState } from 'react';
import { InfoProductsInitialProp } from './types/types';

function Carrinho() {
  // Define uma variável de estado chamada carrinhoArray e uma função para atualizá-la, setCarrinhoArray
  const [carrinhoArray,
    setCarrinhoArray] = useState<InfoProductsInitialProp[]>([]);
  // Define o valor inicial da variável de estado como um array vazio

  const getLocalStorage = () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') as string);
    if (savedCartItems) {
      const addQuantity = savedCartItems
        .map((cartItem: InfoProductsInitialProp) => (
          { ...cartItem, quantity: cartItem.quantity ?? 1 }));
      setCarrinhoArray((addQuantity));
    } else {
      setCarrinhoArray([]);
    }
  };

  useEffect(() => {
    // Nesse efeito, a função setCarrinhoArray é chamada para definir o valor inicial da variável de estado carrinhoArray como um array vazio.
    getLocalStorage();
  }, []);

  const handleClickIncreaseQuantity = (id: string) => {
    const clickedProduct = carrinhoArray
      .map((product) => (product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product));
    setCarrinhoArray(clickedProduct);
    localStorage.setItem('cartItems', JSON.stringify(clickedProduct));
  };

  const handleClickDecreaseQuantity = (id: string) => {
    const clickedProduct = carrinhoArray
      .map((product) => (product.id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product));
    setCarrinhoArray(clickedProduct);
    localStorage.setItem('cartItems', JSON.stringify(clickedProduct));
  };

  const handleClickRemoveQuantity = (id: string) => {
    const clickedProduct = carrinhoArray
      .filter((product) => (product.id !== id));
    setCarrinhoArray(clickedProduct);
    localStorage.setItem('cartItems', JSON.stringify(clickedProduct));
  };

  return (
    <div>
      {carrinhoArray.length === 0 ? (
      /* Verifica se o tamanho do array productArray é igual a zero */
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
      ) : (
        <div>
          <h1>Produtos no Carrinho:</h1>
          {carrinhoArray.map(({ id, title, price, thumbnail, quantity }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <img
                src={ thumbnail }
                alt={ title }
              />
              <button
                data-testid="remove-product"
                onClick={ () => handleClickRemoveQuantity(id) }
              >
                X
              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                Quantidade:
                {' '}
                { quantity }
              </p>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => handleClickDecreaseQuantity(id) }
              >
                -
              </button>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => handleClickIncreaseQuantity(id) }
              >
                +
              </button>
              <p>
                Preço: R$
                {' '}
                {price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carrinho;
