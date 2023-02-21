import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/modal-show/modal-slice";
import { Modal } from "./Modal";

export const SelectColums = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen);
  

  return (
    <>
      <Button onClick={() => dispatch(setModal(true))} sx={{my:"15px", background:"#FCA311", color:"#1B2021", "&:hover":{background:"#c37d0e"}}}>Select Colums</Button>
      {isModalOpen && <Modal />}
    </>
  );
};
