import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "./Dashboard.css";
import _ from "lodash";
import Card from "../layout/Card";
import Grid from "@material-ui/core/Grid";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Grid container spacing={5}>
        <Grid item>
          {" "}
          <Card
            title="Catalog"
            text="Introduceti prezente sau bonificatii pentru studentii dumneavoastra."
            link="teacher-panel"
            image={
              "https://1.bp.blogspot.com/-mrYRAX7ann8/XQpfcVC6luI/AAAAAAAAICc/6KsmV99jN2gvmaHJJcELMfZx8atXJt_6QCLcBGAs/s1600/gradebook.png"
            }
          />
        </Grid>

        <Grid item>
          {" "}
          <Card
            title="Profil"
            text="Setati profilul."
            link="profile"
            image={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
            }
          />
        </Grid>

        <Grid item>
          {" "}
          <Card
            title="Incarca fisiere"
            text="Setati profilul."
            link="upload-file"
            image={
              "https://www.lifewire.com/thmb/2KYEaloqH6P4xz3c9Ot2GlPLuds=/1920x1080/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
            }
          />
        </Grid>
        <Grid item>
          {" "}
          <Card
            title="Evenimente"
            text="Setati profilul."
            link="events"
            image={
              "https://miro.medium.com/max/4778/1*V4bRc4XWPvPCnwwL8Mieiw.jpeg"
            }
          />
        </Grid>
        <Grid item>
          {" "}
          <Card
            title="Grupuri"
            text="Setati profilul."
            link="learning"
            image={
              "https://inboundhype.com/wp-content/uploads/2018/01/What-is-a-focus-group.png"
            }
          />
        </Grid>
      </Grid>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Dashboard);
