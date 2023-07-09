import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product, ProductType } from './types/types';
import { getProductById } from './services/api';

function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [carrinhoArray, setCarrinhoArray] = useState<ProductType[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      const data = await getProductById(id ?? '');
      setProduct(data);
    };
    fetchProductById();
  }, [id]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCarrinhoArray(JSON.parse(savedCartItems));
    } else {
      setCarrinhoArray([]);
    }
  }, []);

  const handleClickAddToCart = (productInfo: ProductType) => {
    const newCarrinhoArray = [...carrinhoArray, productInfo];
    setCarrinhoArray(newCarrinhoArray);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(carrinhoArray));
  }, [carrinhoArray]);

  return (
    <div data-testid="product">
      <button data-testid="cart-button" onClick={ () => navigate(-1) }>
        Voltar
      </button>
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/shopping-cart') }
      >
        Seu Carrinho
      </button>
      {product ? (
        <>
          <h2 data-testid="product-detail-name">{product.title}</h2>
          <h2
            data-testid="product-detail-price"
          >
            {/* Colocando a unidade do do produto (brl) no preço */}
            {`${product.currency_id} ${product.price}`}
          </h2>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              handleClickAddToCart(product);
            } }
          >
            Adicionar ao Carrinho
          </button>
          <ul>
            {product.attributes.map((attribute) => (
              <li key={ attribute.name }>
                <p>{attribute.name}</p>
                <p>{attribute.value_name}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Produto não encontrado</p>
      )}

    </div>
  );
}

export default ProductDetail;
