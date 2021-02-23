import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Faqs from "./components/Faqs";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Marcacao from "./components/Marcacao";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/faqs" component={Faqs} />
        <Route exact path="/marcacoes/add" component={Form} />
        <Switch>
          <Route
            exact
            path="/marcacao/:id"
            render={(props) => <>{<Marcacao />}</>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
