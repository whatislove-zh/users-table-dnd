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
import { useUsers } from "../store/get-users/use-users";

export const UsersTable = () => {
  const [users, status, error] = useUsers();

  

  console.log(users, status, error);
  return (
    <Box>
      {status === "loading" && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {status === "received" && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(users[0]).map((user) => (
                  <TableCell align="right" key={user}>
                    {user}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="right">{user?.id}</TableCell>
                  <TableCell align="right">{user?.name}</TableCell>
                  <TableCell align="right">{user?.username}</TableCell>
                  <TableCell align="right">{user?.email}</TableCell>
                  <TableCell align="right">{user?.address?.city}</TableCell>
                  <TableCell align="right">{user?.phone}</TableCell>
                  <TableCell align="right">{user?.website}</TableCell>
                  <TableCell align="right">{user?.company?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
