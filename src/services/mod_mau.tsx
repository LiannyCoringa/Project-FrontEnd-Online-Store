// CARRINHO - ESTAS SÃO AS MODIFICAÇÕES, QUE FIZ NO CODIGO CARRINHO PARA ATENDER AO REQUISITO 8//

// 1. ADD da interface Product://

/* interface Product {
  id: string;
  title: string;
  price: number;
} */

// 2. Atualiza o useState com tipagem de Product[]://

/* const [carrinhoArray, setCarrinhoArray] = useState<Product[]>([]); */

// 3. Usa o JSON.parse para definir o valor inicial do carrinhoArray no useEffect://

/* const savedCartItems = localStorage.getItem('cartItems');
if (savedCartItems) {
  setCarrinhoArray(JSON.parse(savedCartItems));
} else {
  setCarrinhoArray([]);
} */

// 4. ADD dos elementos 'p' para exibir o nome e a quantidade de cada produto no carrinho://

/* { carrinhoArray.map(({ id, title, price }) => (
  <div key={ id }>
    <p data-testid="shopping-cart-product-name">{title}</p>
    <p data-testid="shopping-cart-product-quantity">Quantidade: 1</p> ADD apenas 1 produto
    <p>
      Preço: R$
      {' '}
      {price}
    </p>
  </div>
)); }
*/

// PESQUISA - ALTERAÇÕES FEITAS NO OCMPONENTE PESQUISA PARA ATENDER O REQUISITO 8//

// 1. Declaração da função handleClickAddToCart://

/* const handleClickAddToCart = (id: string) => {
    const clickedProduct = productsList.find((product) => product.id === id);
    if (clickedProduct) {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        const cartItems = JSON.parse(savedCartItems);
        localStorage.setItem(
          'cartItems',
          JSON.stringify([...cartItems, clickedProduct]),
        );
      } else {
        localStorage.setItem(
          'cartItems',
          JSON.stringify([clickedProduct]),
        );
      }
    }
  };
*/

// Essa função vai receber o ID do produto clicado como parâmetro. Ela encontra o produto //

/* correspondente na lista de produtos productsList, depois verifica se o carrinho
de compras já tem itens salvos no localStorage. Se já houver itens salvos, o produto
clicado é adicionado ao array existente. Se não, um novo array é criado com o
produto clicado e salvo no localStorage com a chave "cartItems". */

// Adição do botão "Adicionar ao Carrinho" em cada produto na lista://

/* <button
  data-testid="product-add-to-cart"
  onClick={ (event) => {
    event.stopPropagation();
    handleClickAddToCart(id);
  } }
>
  Adicionar ao Carrinho
</button>
*/

// Esse trecho de código adiciona um botão "Adicionar ao Carrinho" em cada produto da lista. //

/* Quando esse botão é clicado, a função handleClickAddToCart é chamada com o ID do
produto tendo como argumento. O evento stopPropagation() é chamado para evitar que o
evento de clique crie erro no 'botão do produto', evitando comportamentos errados. */
