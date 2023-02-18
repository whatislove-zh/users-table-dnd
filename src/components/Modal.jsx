import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../store/get-users/users-slice";
import { addColumn } from "../store/selected-columns/selected-columns-slice";
import { removedColumnUtil } from "../utils/available";

//import { addColumn } from "../store/selected-columns/selected-columns-slice";

export const Modal = () => {
  const dispatch = useDispatch();

  const [currentList, setCurrentList] = useState([]);

  const [currentItem, setCurrentItem] = useState([]);

  const users = useSelector(selectUsers);

  const selectedColumns = useSelector((state) => state.selectedColumn);
  const [availableColumns] = removedColumnUtil(users[0], selectedColumns);

  const DragStartHandler = (e, card, list) => {
    setCurrentItem(card);
    setCurrentList(list);
  };
  const dragEndHandler = (e) => {};
  const dragLeaveHandler = (e) => {};

  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dropHandler = (e, list) => {
    e.preventDefault();
    if (currentList[0] !== list[0]) {
      dispatch(addColumn(currentItem));
    }
  };

  return (
    <Box
      sx={{
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
        
      }}
    >
      <Box sx={{ mr: "50px" }}>
        <Typography variant="h6">Available columns</Typography>
        {availableColumns.map((el) => (
          <Typography
            key={el}
            onDragStart={(e) => DragStartHandler(e, el, availableColumns)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, availableColumns)}
            draggable={true}
            sx={{ m: "5px" }}
          >
            {el}
          </Typography>
        ))}
      </Box>
      <Box
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, selectedColumns)}
      >
        <Typography variant="h6">Selected columns</Typography>
        {selectedColumns.map((el) => (
          <Typography key={el} sx={{ m: "5px" }}>
            {el}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
