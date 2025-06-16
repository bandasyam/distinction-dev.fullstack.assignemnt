import cache from "memory-cache";
import { ProductList } from "../constants";

const key = "products";

const getFromDb = () => {
  return cache.get(key);
};

const insertToDb = (data: ProductList) => {
  return cache.put(key, data);
};

export default { getFromDb, insertToDb };
