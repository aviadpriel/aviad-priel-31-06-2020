import React from 'react';
import './App.css';
import { createBrowserHistory as createHistory } from "history";
import { BrowserRouter} from "react-router-dom";
import {Header,Footer,Pages} from "./components";
const history = createHistory();

function App() {
  return (
      <BrowserRouter history={history}>
        <div className="App">
          <Header />
          <div className="app-body container-fluid">
          <Pages/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
  );
}

export default App;
