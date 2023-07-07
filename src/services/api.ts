export async function getCategories() {
  // Define a URL da API para obter as categorias do Mercado Livre
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  // Faz uma requisição assíncrona para a URL e aguarda a resposta
  const response = await fetch(url);
  // Extrai os dados da resposta como JSON
  const data = await response.json();
  // Retorna os dados obtidos
  return data;
}

export async function
getProductsFromCategoryAndQuery(categoryId?: string, query?: string) {
  // Define a URL da API para obter produtos com base na categoria e consulta fornecidas
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  // Faz uma requisição assíncrona para a URL e aguarda a resposta
  const response = await fetch(url);
  // Extrai os dados da resposta como JSON
  const data = await response.json();
  // Retorna os dados obtidos
  return data;
}

export async function getProductById(productId: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}
