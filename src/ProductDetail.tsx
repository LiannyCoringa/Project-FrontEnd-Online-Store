import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from './types/types';
import { getProductById } from './services/api';

function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      const data = await getProductById(id ?? '');
      setProduct(data);
    };

    fetchProductById();
  }, [id]);

  return (
    <div data-testid="product">
      <button data-testid="cart-button" onClick={ () => navigate(-1) }>
        Voltar
      </button>
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('./Carrinho') }
      >
        Seu Carrinho
      </button>
      {product ? (
        <>
          <h2 data-testid="product-detail-name">{product.title}</h2>
          <h2 data-testid="product-detail-price">{product.price}</h2>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <ul>
            {product.attributes.map((attribute) => (
              <li key={ attribute.value_id }>
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
