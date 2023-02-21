import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Box,
  Typography,
  TableCell,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useUsers } from "../store/get-users/use-users";
import { removedColumnUtil } from "../utils/available";

const tableCellStyle = { color: "white" };

export const UsersTable = () => {
  const [users, status, error] = useUsers();
  const selectedColumn = useSelector((state) => state.selectedColumn);

  const selectedColumnSort = [].concat(selectedColumn).sort();
  

  return (
    <Box>
      {status === "loading" && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {status === "received" && (
        <TableContainer>
          <Table sx={{ overflow: "auto" }}>
            <TableHead sx={{ background: "#30343F" }}>
              <TableRow>
                {selectedColumnSort.map((user) => (
                  <TableCell sx={tableCellStyle} align="center" key={user}>
                    {user.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                const [availableColumns] = removedColumnUtil(
                  users[0],
                  selectedColumn
                );
                const [, visibleUser] = removedColumnUtil(
                  user,
                  availableColumns
                );

                return (
                  <TableRow key={user.id}>
                    {visibleUser?.address?.city && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.address?.city}
                      </TableCell>
                    )}
                    {visibleUser?.company?.name && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.company?.name}
                      </TableCell>
                    )}
                    {visibleUser?.email && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.email}
                      </TableCell>
                    )}
                    {visibleUser?.id && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.id}
                      </TableCell>
                    )}
                    {visibleUser?.name && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.name}
                      </TableCell>
                    )}
                    {visibleUser?.phone && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.phone}
                      </TableCell>
                    )}

                    {visibleUser?.username && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.username}
                      </TableCell>
                    )}

                    {visibleUser?.website && (
                      <TableCell sx={tableCellStyle} align="center">
                        {visibleUser?.website}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
