import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import _ from "lodash";
import Card from "../layout/Card";
import Fab from "../layout/Fab";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Grupa from "./Grupa";
import { List, ListItem } from "@material-ui/core";
class TeacherPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grupe: [],
      selectedGrupa: null,
    };
  }

  componentDidMount() {
    axios
      .get("api/users/current/grupe")
      .then((response) => {
        const { data } = response;
        this.setState({ grupe: data.grupe, loading: false });
      })
      .catch((error) => {});
  }

  selectCard = (grupa) => {
    this.setState({ selectedGrupa: grupa });
  };

  renderGroups = () => {
    return this.state.grupe.map((grupa) => {
      return (
        <React.Fragment>
          <Grupa grupa={grupa} />
          <br />
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <Fab />
        {this.state.loading ? "loading..." : this.renderGroups()}
      </React.Fragment>
    );
  }
}
TeacherPanel.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(TeacherPanel);
