import React, { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";

// import provider and auth that we exported from src/firebase.js
import { auth, providerFacebook } from "../../firebase";

import Aux from "../../hoc/Aux/Aux";
import Header from "../../components/Header/Header";
import Rooms from "../Rooms/Rooms";
import FullRoom from "../../components/FullRoom/FullRoom";
import NewRoom from "../../components/NewRoom/NewRoom";
import Footer from "../../components/Footer/Footer";

class Catalogue extends Component {
  state = {
    username: "",
    user: null,
    auth: false
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  loginHandler = () => {
    auth
      .signInWithPopup(providerFacebook)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        this.setState({
          user: user
        });
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.email;

        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
      });
  };

  logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        this.setState({
          user: null
        });
      })
      .catch(error => {
        // An error happened.
      });
  };

  render() {
    /*
    const RoomsWithProps = props => {
      return <Rooms user={this.state.user} />;
    };

    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return React.createElement(component, finalProps);
    };

    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
          }}
        />
      );
    };
    */

    let addListing;

    if (this.state.user) {
      addListing = (
        <li>
          <NavLink
            to={{
              pathname: "/add-listing"
              //hash: "#submit",
              //search: "?quick-submit=true"
            }}
          >
            List my place
          </NavLink>
        </li>
      );
    } else {
      addListing = null;
    }

    return (
      <Aux>
        <Header
          user={this.state.user}
          login={this.loginHandler}
          logout={this.logoutHandler}
        />

        <div className="section">
          <div className="container">
            <ul>{addListing}</ul>

            <Switch>
              {this.state.user ? (
                <Route path="/add-listing" component={NewRoom} />
              ) : null}

              <Route path="/room/:id" exact component={FullRoom} />
              <Route path="/rooms" exact component={Rooms} />
              <Route path="/" exact component={Rooms} />

              {<Route render={() => <h1>Not found</h1>} />}
            </Switch>
          </div>
        </div>

        <Footer />
      </Aux>
    );
  }
}

export default Catalogue;
