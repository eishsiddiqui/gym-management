import { BrowserRouter } from "react-router";
import { Routing } from "./components/layout/Routing";
import { appAxios } from "./helpers/axios";

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
