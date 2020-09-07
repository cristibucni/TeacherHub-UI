import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import "./App.css";
import Upload from "./components/upload/Upload";
import Dashboard from "./components/dashboard/Dashboard";
import Learning from "./components/learning/Learning";
import Events from "./components/events/Events";
import TeacherPanel from "./components/teacher-panel/TeacherPanel";

// Check for token

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info an exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/teacher-panel" component={TeacherPanel} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/upload-file" component={Upload} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/learning" component={Learning} />
              <Route exact path="/events" component={Events} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
