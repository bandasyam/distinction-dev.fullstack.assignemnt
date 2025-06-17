import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { callApi, ip } from "../utils/api.helpers";

// Define Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  status: "active" | "archived";
  tags: string[];
}

// Props interface
interface CustomFormProps {
  formType: "create" | "edit";
  productData?: Product | null;
}

export default function CustomForm({ formType, productData }: CustomFormProps) {
  const [id, setId] = useState(() => productData?.id || uuidv4());
  const [name, setName] = useState(productData?.name);
  const [price, setPrice] = useState(productData?.price);
  const [tags, setTags] = useState(productData?.tags);

  const [error, setError] = useState("");

  async function handleSubmitClick() {
    try {
      let url = `${ip}/api/products`;
      if (formType == "create") {
        let result = await callApi(url, "POST", {
          id: id,
          name: name,
          price: price,
          status: "active",
          tags: tags,
        });

        console.log("result.data", result.data);
      }
    } catch (e) {}
  }

  return (
    <form>
      <TextField label="Name" variant="outlined" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
      <TextField label="price" variant="outlined" fullWidth margin="normal" onChange={(e) => setPrice(Number(e.target.value))} />
      <TextField label="tags" variant="outlined" fullWidth margin="normal" onChange={(e) => setTags(e.target.value.split(","))} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="inherit" type="submit" onClick={handleSubmitClick}>
          Submit
        </Button>
      </Box>
    </form>
  );
}
