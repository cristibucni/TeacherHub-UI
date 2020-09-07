import React, { Component } from "react";
import _ from "lodash";
import "./Dashboard.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      handle: "",
      location: "",
      skills: [],
      university: "",
      faculty: "",
      website: "",
      bio: "",
      social: {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      canSend: false,
    };
  }

  componentDidMount() {
    const user = this.props.userId;
    this.setState({ user: user, handle: user });
    axios
      .get("api/profile")
      .then((response) => {
        this.setState({ loading: false, hasProfile: true });
      })
      .catch((error) => {
        const errorsArray = [];
        Object.keys(error.response.data).forEach((key) => {
          const keyValuePair = {
            error: error.response.data[key],
          };

          errorsArray.push(keyValuePair);
        });

        this.setState({
          errors: errorsArray,
          loading: false,
        });
      });
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (
        this.state.location !== "" &&
        !_.isEmpty(this.state.skills) &&
        this.state.university !== "" &&
        this.state.faculty !== ""
      ) {
        this.setState({ canSend: true });
      }
    });
  };

  handleOnSkillChange = (e) => {
    this.setState({ skills: e.target.value.split(",") }, () => {
      if (
        this.state.location !== "" &&
        !_.isEmpty(this.state.skills) &&
        this.state.university !== "" &&
        this.state.faculty !== ""
      ) {
        this.setState({ canSend: true });
      }
    });
  };

  handleSubmit = () => {
    const data = {
      user: this.state.user,
      handle: this.state.handle,
      location: this.state.location,
      skills: this.state.skills,
      university: this.state.university,
      faculty: this.state.faculty,
      website: this.state.website,
      bio: this.state.bio,
      social: {
        facebook: this.state.social.facebook,
        instagram: this.state.social.instagram,
        linkedin: this.state.social.linkedin,
      },
    };
    axios
      .post("/api/profile/", data)
      .then((result) => {
        window.location.reload();
      })
      .catch(function (error) {});
  };

  render() {
    return (
      <div className="dashboard-container">
        {" "}
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Bio"
            fullWidth
            onChange={(e) => this.handleOnChange(e)}
            name="bio"
            placeholder=""
          />
        </div>
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Website"
            fullWidth
            onChange={(e) => this.handleOnChange(e)}
            name="website"
            className="marginTop14"
            placeholder=""
          />
        </div>
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Locatie"
            fullWidth
            className="marginTop14"
            onChange={(e) => this.handleOnChange(e)}
            name="location"
            placeholder=""
          />
        </div>
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Universitate"
            fullWidth
            className="marginTop14"
            onChange={(e) => this.handleOnChange(e)}
            name="university"
            placeholder=""
          />
        </div>
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Facultate"
            className="marginTop14"
            fullWidth
            onChange={(e) => this.handleOnChange(e)}
            name="faculty"
            placeholder=""
          />
        </div>
        <div className="question-container">
          <TextField
            id="standard-basic"
            label="Aptitudini"
            className="marginTop14"
            fullWidth
            onChange={(e) => this.handleOnSkillChange(e)}
            name="skills"
            placeholder=""
          />
        </div>
        <div className="row marginTop14">
          <div className="col ">
            <div className="question-container">
              <TextField
                id="standard-basic"
                label="Facebook"
                fullWidth
                onChange={(e) => this.handleOnChange(e)}
                name="facebook"
                placeholder=""
              />
            </div>
          </div>
          <div className="col">
            <div className="question-container">
              <TextField
                id="standard-basic"
                fullWidth
                label="Instagram"
                onChange={(e) => this.handleOnChange(e)}
                name="instagram"
                placeholder=""
              />
            </div>
          </div>
          <div className="col">
            <div className="question-container">
              <TextField
                id="standard-basic"
                fullWidth
                label="LinkedIn"
                onChange={(e) => this.handleOnChange(e)}
                name="linkedin"
                placeholder=""
              />
            </div>
          </div>
        </div>
        {this.state.canSend && (
          <div className="send-button">
            <Button onClick={this.handleSubmit}>Trimite</Button>
          </div>
        )}
      </div>
    );
  }
}

export default CreateProfile;
