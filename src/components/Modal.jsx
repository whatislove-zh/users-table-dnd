import { Box, Divider, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../store/get-users/users-slice";

import { removedColumnUtil } from "../utils/available";
import { setModal } from "../store/modal-show/modal-slice";
import { setColumn } from "../store/selected-columns/selected-columns-slice";
import CloseIcon from "@mui/icons-material/Close";


export const Modal = () => {
  const dispatch = useDispatch();

  const [currentList, setCurrentList] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  
  const [searchValue, setSearchValue] = useState("");


  const users = useSelector(selectUsers);

  const selectedColumns = useSelector((state) => state.selectedColumn);

  useEffect(() => {
    const [availableColumns] = removedColumnUtil(users[0], selectedColumns);
    setSelectedItems(selectedColumns);
    setAvailableItems(availableColumns);
  }, [selectedColumns, users]);

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
      setSelectedItems((prev) => [...prev, currentItem]);
      setAvailableItems((prev) => prev.filter((el) => el !== currentItem));
    }
  };
  const applyHandler = () => {
    dispatch(setColumn(selectedItems));
    dispatch(setModal(false));
  };

  const deleteSelectedItem = (item) => {
    setAvailableItems((prev) => [...prev, item]);
    setSelectedItems((prev) => prev.filter((el) => el !== item));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        minHeight: "100vh",
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "#30343F",
          width: "600px",
          borderRadius: "50px",
        }}
      >
        <TextField
          size="small"
          label="Search..."
          value={searchValue}
          onChange={(e) => {setSearchValue(e.target.value)}}
          sx={{
            borderRadius: "50px",
            input: {
              background: "#FCA311",
              color: "#1B2021",
              borderRadius: "50px",
            },
            width: "200px",
            mx: "75px",
            my: "20px",
            "& label.Mui-focused": {
              color: "black",
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mr: "50px",
              color: "#E5E5E5",
              background: "#1B2021",
              p: "15px",
              borderRadius: "20px",
              width: "200px",
            }}
          >
            <Typography variant="h6">Available columns</Typography>
            <Divider sx={{ background: "white", mb: "10px" }} />
            <Box height="280px">
              {availableItems.filter((el) => (searchValue !=="" ? el.includes(searchValue): true)).map((el) => (
                <Typography
                  key={el}
                  onDragStart={(e) => DragStartHandler(e, el, availableItems)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, availableItems)}
                  draggable={true}
                  sx={{
                    m: "5px",
                    py: "5px",
                    px: "15px",
                    background: "#30343F",
                    borderRadius: "10px",
                    fontSize: "14px",
                  }}
                >
                  {el}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, selectedItems)}
            sx={{
              color: "#E5E5E5",
              background: "#1B2021",
              p: "15px",
              borderRadius: "20px",
              width: "200px",
            }}
          >
            <Typography variant="h6">Selected columns</Typography>
            <Divider sx={{ background: "white", mb: "10px" }} />
            <Box height="280px">
              {selectedItems.map((el) => (
                <Typography
                  key={el}
                  sx={{
                    m: "5px",
                    py: "5px",
                    px: "15px",
                    background: "#30343F",
                    borderRadius: "10px",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {el}{" "}
                  <CloseIcon
                    fontSize="small"
                    onClick={() => {
                      deleteSelectedItem(el);
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Button
          onClick={applyHandler}
          sx={{
            my: "15px",
            ml: "325px",
            px: "15px",
            background: "#FCA311",
            color: "#1B2021",
            "&:hover": { background: "#c37d0e" },
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};
