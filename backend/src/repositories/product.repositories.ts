import { Product, ProductList } from "../constants";
import productRepository from "../utils/db.helpers";

export const getProductsData = async () => {
  return productRepository.getFromDb() || [];
};

export const getProductsDataWithPagination = async (pageNumber: number, pageSize = 10) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let products = await getProductsData();
  return products.slice(startIndex, endIndex);
};

export const insertProduct = async (products: ProductList, data: Product) => {
  products.push(data);
  return productRepository.insertToDb(products);
};

export const updateProduct = async (products: ProductList, data: Product, index: number) => {
  let product = products[index];
  Object.assign(product, data);

  products[index] = product;

  return productRepository.insertToDb(products);
};
