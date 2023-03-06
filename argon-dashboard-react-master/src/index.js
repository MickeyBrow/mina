/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const root = ReactDOM.createRoot(document.getElementById("root"));

const firebaseConfig = {
  apiKey: "AIzaSyD9ZKP77NW-GVwhvl0ZsEBnzDletZt15F8",
  authDomain: "mina-5f4b8.firebaseapp.com",
  projectId: "mina-5f4b8",
  storageBucket: "mina-5f4b8.appspot.com",
  messagingSenderId: "143634310712",
  appId: "1:143634310712:web:4e833a19e60906eb8a68cd",
  measurementId: "G-7FWFM4KPMT",
  databaseURL: "https://mina-5f4b8-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);


root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>
);
