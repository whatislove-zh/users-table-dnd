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

export const UsersTable = () => {
  const [users, status, error] = useUsers();
  const selectedColumn = useSelector((state) => state.selectedColumn);

  return (
    <Box>
      {status === "loading" && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {status === "received" && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {selectedColumn.map((user) => (
                  <TableCell align="left" key={user}>
                    {user}
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
                    {visibleUser?.id && (
                      <TableCell align="left">{visibleUser?.id}</TableCell>
                    )}
                    {visibleUser?.name && (
                      <TableCell align="left">{visibleUser?.name}</TableCell>
                    )}
                    {visibleUser?.username && (
                      <TableCell align="left">
                        {visibleUser?.username}
                      </TableCell>
                    )}
                    {visibleUser?.email && (
                      <TableCell align="left">{visibleUser?.email}</TableCell>
                    )}
                    {visibleUser?.address?.city && (
                      <TableCell align="left">
                        {visibleUser?.address?.city}
                      </TableCell>
                    )}
                    {visibleUser?.phone && (
                      <TableCell align="left">{visibleUser?.phone}</TableCell>
                    )}
                    {visibleUser?.website && (
                      <TableCell align="left">{visibleUser?.website}</TableCell>
                    )}
                    {visibleUser?.company?.name && (
                      <TableCell align="left">
                        {visibleUser?.company?.name}
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
