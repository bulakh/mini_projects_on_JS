import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { AppRoute } from '../../const.js';
import Main from '../main/Main.jsx'
import NotPage404 from '../NotPage404/NotPage404.jsx';
import TodoList from '../projects/TodoList/TodoList.jsx';
import Slider from '../projects/Slider/Slider.jsx';
import PasswordGenerator from '../projects/PasswordGenerator/PasswordGenerator.jsx';
import Validator from '../projects/Validator/Validator.jsx';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main />
        </Route>
        <Route path={AppRoute.TODO}>
          <TodoList />
        </Route>
        <Route path={AppRoute.SLIDER}>
          <Slider />
        </Route>
        <Route path={AppRoute.GENERATOR}>
          <PasswordGenerator />
        </Route>
        <Route path={AppRoute.VALIDATOR}>
          <Validator />
        </Route>
        <Route>
          <NotPage404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
