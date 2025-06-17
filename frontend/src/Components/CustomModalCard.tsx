import { Button } from "@mui/material";
import React from "react";

import { callApi, ip } from "../utils/api.helpers";

export default function CustomModalCard({ deleteArchiveOpen, setDeleteArchiveOpen }: any) {
  async function handleYesClick() {
    try {
      let url = `${ip}/api/products/${deleteArchiveOpen?.id}`;
      let method = deleteArchiveOpen?.type == "delete" ? "DELETE" : "PATCH";

      let result = await callApi(url, method);
      console.log("result.data", result.data);
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message);
    }
  }

  function handleNoClick() {
    setDeleteArchiveOpen({ open: false, type: "", id: "" });
  }

  return (
    <div>
      Are you sure you want to {deleteArchiveOpen?.type}?
      <div>
        <Button onClick={handleYesClick}>Yes</Button>
        <Button onClick={handleNoClick}>No</Button>
      </div>
    </div>
  );
}
