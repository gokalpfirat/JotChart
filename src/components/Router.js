import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from "./App";
import FormList from "./FormList/FormList";
import QuestionList from "./QuestionList/QuestionList";
import Builder from "./Builder/Builder";
import ChartViewer from "./ChartViewer/ChartViewer";
import ChooseMenu from "./ChooseMenu/ChooseMenu";
import EditList from "./EditList/EditList";

const Router = () => (
  <BrowserRouter basename='/app'>
      <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/home" component={ChooseMenu}/>
          <Route exact path="/forms" component={FormList}/>
          <Route path="/forms/:formId/:qId" component={Builder}/>
          <Route path="/forms/:formId" component={QuestionList}/>
          <Route path="/charts/edit/:chartId" component={Builder}/>
          <Route path="/charts/:chartId" component={ChartViewer}/>
          <Route path="/charts" component={EditList}/>
      </Switch>
  </BrowserRouter>
);

export default Router;
