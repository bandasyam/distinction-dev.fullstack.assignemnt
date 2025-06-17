import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";

// components
import CustomCard from "../Components/CustomCard";
import CustomForm from "../Components/CustomForm";
import CustomModalCard from "../Components/CustomModalCard";

// utils helpers
import { callApi, ip } from "../utils/api.helpers";

interface Product {
  id: string;
  name: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
}

type EditType = "create" | "edit";

export default function Products() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  const [formType, setFormType] = useState<EditType>("create");
  const [searchText, setSearchText] = useState("");
  const [searchTextActivated, setSearchTextActivated] = useState(false);
  const [deleteArchiveOpen, setDeleteArchiveOpen] = useState({ open: false, type: "", id: "" });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function fetchProducts(currentPage = 1) {
    setLoading(true);
    try {
      let url = `${ip}/api/products?page=${currentPage}`;
      let result = await callApi(url, "GET");
      if (!result.data.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (currentPage == 1) {
        setData(result.data);
      } else {
        setData((prev: Product[]) => [...prev, ...result.data]);
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message);
    } finally {
      console.log("finally");
      setTimeout(() => {
        setLoading(false);
      }, 1000 * 5);
    }
  }

  function handleCreateProductFormModalOpen() {
    setOpen(true);
  }

  function handleCreateProductFormModalClose() {
    setOpen(false);
  }

  function handleSearchTextEnter(value: string) {
    if (value.length) {
      setSearchTextActivated(true);
    } else {
      setSearchTextActivated(false);
    }

    setSearchText(value);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTextActivated && page > 1) {
      fetchProducts(page);
    }
  }, [page, searchTextActivated]);

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();
    setFilteredData(data.filter((product: Product) => product.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))));
  }, [searchText]);

  useEffect(() => {
    function handleScroll() {
      const nearBottom = window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight;

      if (nearBottom && !searchTextActivated && hasMore) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchTextActivated, hasMore]);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    maxWidth: 500,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 4 },
  };

  return (
    <div style={{ marginTop: "15px" }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "70px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "10px",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
            }}
          >
            <Button variant="contained" style={{ height: "50px", alignSelf: "center" }} onClick={handleCreateProductFormModalOpen}>
              Add Product
            </Button>

            <div style={{ flex: 1, minWidth: "250px", maxWidth: "400px" }}>
              <TextField label="You can search based on tags" variant="outlined" fullWidth onChange={(e) => handleSearchTextEnter(e.target.value)} />
            </div>
          </div>

          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={"15px"}>
            {!data?.length ? (
              <p>No Products to display</p>
            ) : (
              (searchTextActivated ? filteredData : data)?.map((el, index) => {
                return (
                  <CustomCard
                    key={index}
                    el={el}
                    setOpen={setOpen}
                    setProductData={setProductData}
                    setFormType={setFormType}
                    setDeleteArchiveOpen={setDeleteArchiveOpen}
                  />
                );
              })
            )}
          </Box>

          <Modal
            open={open}
            onClose={handleCreateProductFormModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CustomForm formType={formType} productData={productData} />
            </Box>
          </Modal>

          {deleteArchiveOpen?.open && (
            <Modal
              open={deleteArchiveOpen.open}
              onClose={() => setDeleteArchiveOpen({ open: false, type: "", id: "" })}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CustomModalCard deleteArchiveOpen={deleteArchiveOpen} setDeleteArchiveOpen={setDeleteArchiveOpen} fetchProducts={fetchProducts} />
              </Box>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
