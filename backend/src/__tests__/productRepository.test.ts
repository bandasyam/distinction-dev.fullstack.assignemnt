import { getProductsData, getProductsDataWithPagination, insertProduct, updateProduct, deleteProduct } from "../repositories/product.repositories";
import productRepository from "../utils/db.helpers";
import { Product, ProductList, ProductStatus } from "../constants";

// Mock the productRepository module
jest.mock("../utils/db.helpers");

describe("Product Service", () => {
  const mockProducts: ProductList = [
    { id: "1", name: "Product 1", price: 10, tags: ["tag1", "tag2"], status: ProductStatus.Active },
    { id: "2", name: "Product 2", price: 20, tags: ["tag2", "tag3"], status: ProductStatus.Active },
    { id: "3", name: "Product 3", price: 30, tags: ["tag4", "tag2"], status: ProductStatus.Delete },
    { id: "4", name: "Product 4", price: 40, tags: ["tag1", "tag2"], status: ProductStatus.Archived },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("getProductsData", () => {
    it("should return empty array when no products in db", async () => {
      (productRepository.getFromDb as jest.Mock).mockReturnValueOnce(null);
      const result = await getProductsData();
      expect(result).toEqual([]);
    });

    it("should return products from db", async () => {
      (productRepository.getFromDb as jest.Mock).mockReturnValueOnce(mockProducts);
      const result = await getProductsData();
      expect(result).toEqual(mockProducts);
    });
  });

  describe("insertProduct", () => {
    it("should add new product to the list and save to db", async () => {
      const newProduct: Product = { id: "5", name: "Product 5", price: 40, tags: ["tag1", "tag2"], status: ProductStatus.Archived };
      (productRepository.getFromDb as jest.Mock).mockReturnValueOnce([...mockProducts]);

      const result = await insertProduct([...mockProducts], newProduct);

      expect(result).toEqual([...mockProducts, newProduct]);
      expect(productRepository.insertToDb).toHaveBeenCalledWith([...mockProducts, newProduct]);
    });
  });

  describe("updateProduct", () => {
    it("should update existing product and save to db", async () => {
      const updatedFields: Partial<Product> = { name: "Updated Product", price: 99 };
      const expectedUpdatedProduct = { ...mockProducts[1], ...updatedFields };
      const productsCopy = [...mockProducts];

      const result = await updateProduct(productsCopy, updatedFields, 1);

      expect(result).toEqual([mockProducts[0], expectedUpdatedProduct, mockProducts[2]]);
      expect(productRepository.insertToDb).toHaveBeenCalledWith([mockProducts[0], expectedUpdatedProduct, mockProducts[2]]);
    });
  });

  describe("deleteProduct", () => {
    it("should remove product at specified index and save to db", async () => {
      const productsCopy = [...mockProducts];
      const expectedResult = [mockProducts[0], mockProducts[2]];

      const result = await deleteProduct(productsCopy, 1);

      expect(result).toEqual(expectedResult);
      expect(productRepository.insertToDb).toHaveBeenCalledWith(expectedResult);
    });

    it("should throw error when index is out of bounds", async () => {
      const productsCopy = [...mockProducts];

      await expect(deleteProduct(productsCopy, 10)).rejects.toThrow("Index out of bounds");
    });
  });
});
