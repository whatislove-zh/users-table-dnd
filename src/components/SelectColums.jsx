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
      <Button onClick={() => dispatch(setModal(true))}>Select Colums</Button>
      {isModalOpen && <Modal />}
    </>
  );
};
