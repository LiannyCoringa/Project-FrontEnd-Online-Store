import { useEffect, useState } from 'react';

function Carrinho() {
  // Define uma variável de estado chamada carrinhoArray e uma função para atualizá-la, setCarrinhoArray
  const [carrinhoArray, setCarrinhoArray] = useState([]);
  // Define o valor inicial da variável de estado como um array vazio
  useEffect(() => {
  // Nesse efeito, a função setCarrinhoArray é chamada para definir o valor inicial da variável de estado carrinhoArray como um array vazio.
    setCarrinhoArray([]);
  }, []);
  return (
    <div>
      {/* Verifica se o tamanho do array productArray é igual a zero */}
      {carrinhoArray.length === 0
        ? (
          // Se for verdadeiro, renderiza um elemento <h1> com uma mensagem e um atributo data-testid
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>)
        : ''}
    </div>
  );
}

export default Carrinho;
