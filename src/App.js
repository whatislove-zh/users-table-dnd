import { Container } from "@mui/material";
import { SelectColums } from "./components/SelectColums";
import { UsersTable } from "./components/UsersTable";


function App() {
  
  return (
    <>
      <Container
        sx={{ background: "#1B2021", my: "15px", borderRadius: "25px" }}
      >
        <SelectColums />
        <UsersTable />
      </Container>
      
    </>
  );
}

export default App;
