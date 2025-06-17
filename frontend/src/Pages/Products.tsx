import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";

// components
import CustomCard from "../Components/CustomCard";
import CustomForm from "../Components/CustomForm";

// utils helpers
import { callApi, ip } from "../utils/api.helpers";

interface Product {
  id: string;
  name: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
}

export default function Products() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  async function fetchProducts() {
    try {
      let url = `${ip}/api/products`;
      let result = await callApi(url, "GET");
      setData(result.data);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message);
    }
  }

  function handleCreateProductFormModalOpen() {
    setOpen(true);
  }

  function handleCreateProductFormModalClose() {
    setOpen(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <div>
          <Button variant="contained" onClick={handleCreateProductFormModalOpen}>
            Add Product
          </Button>

          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={"15px"}>
            {!data?.length ? (
              <p>No Products to display</p>
            ) : (
              data?.map((el, index) => {
                return <CustomCard key={index} el={el} />;
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
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
              <CustomForm formType="create" productData={productData} />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}
