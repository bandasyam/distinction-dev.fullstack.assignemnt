import { Box, Button, TextField, Typography } from "@mui/material";
import React, { use, useState } from "react";
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
  const [name, setName] = useState(productData?.name);
  const [price, setPrice] = useState(productData?.price);
  const [tags, setTags] = useState(productData?.tags);

  const [errorMessage, setErrorMessage] = useState({ name: "", price: "", tags: "" });

  async function handleSubmitClick() {
    try {
      let url = `${ip}/api/products`;
      if (formType == "create") {
        let result = await callApi(url, "POST", {
          id: uuidv4(),
          name: name,
          price: price,
          status: "active",
          tags: tags,
        });

        console.log("result.data", result.data);
      } else {
        let url = `${ip}/api/products/${productData?.id}`;
        let result = await callApi(url, "PUT", {
          name: name,
          price: price,
          tags: tags,
        });

        console.log("udpate result", result.data);
      }
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message);
    }
  }

  function handleNameChange(value: any) {
    setName(value);
  }

  function handlePriceChange(value: any) {
    console.log(value);
    if (value == "") {
      return;
    }

    if (isNaN(Number(value))) {
      return setErrorMessage((prev) => ({ ...prev, price: "Price should be a number" }));
    } else {
      return setPrice(Number(value));
    }
  }

  return (
    <form>
      <div>
        <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => handleNameChange(e.target.value)} />
      </div>

      <div>
        <TextField label="price" variant="outlined" fullWidth margin="normal" value={price} onChange={(e) => handlePriceChange(e.target.value)} />
        {errorMessage?.price ? <Typography color="red">{errorMessage?.price}</Typography> : null}
      </div>

      <div>
        <TextField
          label="tags"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Enter tags separated by commas (e.g., electronics, phone, keyboard)"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
      </div>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="inherit" type="submit" onClick={handleSubmitClick}>
          Submit
        </Button>
      </Box>
    </form>
  );
}
