import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/get-users/users-slice";
import { removedColumnUtil } from "../utils/available";
//import { addColumn } from "../store/selected-columns/selected-columns-slice";

export const Modal = () => {
  //const dispatch = useDispatch()

  const users = useSelector(selectUsers);

  const selectedColumns = useSelector((state) => state.selectedColumn);
  const [availableColumns] = removedColumnUtil(users[0], selectedColumns);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ mr: "50px" }}>
        <Typography variant="h6">available</Typography>
        {availableColumns.map((el) => (
          <Typography
            key={el}
            draggable={true}
            sx={{ background: "yellow", m: "5px" }}
          >
            {el}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h6">selected</Typography>
        {selectedColumns.map((el) => (
          <Typography key={el}>{el}</Typography>
        ))}
      </Box>
    </Box>
  );
};
