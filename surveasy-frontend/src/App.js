import { Switch } from "react-router-dom";
import PublicRoutes from "routes/PublicRoutes";

function App() {
  return (
    <>
      <Switch>
        <PublicRoutes />
      </Switch>
    </>
  );
}

export default App;
