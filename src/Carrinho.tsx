import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  price: number;
}

function Carrinho() {
  // Define uma variável de estado chamada carrinhoArray e uma função para atualizá-la, setCarrinhoArray
  const [carrinhoArray, setCarrinhoArray] = useState<Product[]>([]);
  // Define o valor inicial da variável de estado como um array vazio

  useEffect(() => {
    // Nesse efeito, a função setCarrinhoArray é chamada para definir o valor inicial da variável de estado carrinhoArray como um array vazio.
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCarrinhoArray(JSON.parse(savedCartItems));
    } else {
      setCarrinhoArray([]);
    }
  }, []);

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
          {carrinhoArray.map(({ id, title, price }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p data-testid="shopping-cart-product-quantity">Quantidade: 1</p>
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
