import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { AddGroup } from "./AddGroup";

import { FadeLoader } from "react-spinners";
import { css } from "@emotion/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from "@material-ui/core";
import EventsCard from "../layout/EventsCard";
import Grid from "@material-ui/core/Grid";
const override = css`
  display: block;
  margin: auto;
  margin-top: 20%;
  border-color: #03728b;
`;
const locatii = {
  CORP_A_LEU_PARTER: "Corp A Leu - Parter",
  CORP_A_LEU_ETAJ: "Corp A Leu - Etajul 1",
  SALA_LECTURA: "Sală de lectură - Cămin Leu A",
  BIBLIOTECA_CENTRALA: "Biblioteca centrală - Campus UPB",
};

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModal: false,
      groups: [],
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({ currentUser: user.id });
    axios
      .get("api/groups")
      .then((response) => {
        const { data } = response;
        this.setState({ groups: data, loading: false });
      })
      .catch((error) => {});
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  renderModal = () => {
    return (
      <Dialog
        onClose={this.closeModal}
        aria-labelledby="customized-dialog-title"
        open={this.state.openModal}
      >
        <DialogTitle>Adaugă grup</DialogTitle>
        <AddGroup onSubmit={this.onGroupSubmit} />
      </Dialog>
    );
  };

  onGroupSubmit = (data) => {
    const newGroup = { ...data, lider: this.state.currentUser };
    axios
      .post("api/groups/add", newGroup)
      .then((response) => {
        const newGroups = this.state.groups;
        newGroups.push(response.data);
        this.setState({ groups: newGroups }, () => {
          this.closeModal();
        });
      })
      .catch((error) => {});
  };

  onDelete = (id) => {
    axios
      .delete("api/groups/" + id)
      .then((response) => {
        window.alert("Ai șters grupul");
        window.location.reload(true);
      })
      .catch((error) => {});
  };

  renderGroups = (location) => {
    return this.state.groups.map((group, index) => {
      if (group.locatie === location) {
        return (
          <React.Fragment key={index}>
            <div className="quiz-list-item">
              <div className="row quiz-list-item-row">
                <div className="col">
                  <div className="quiz-list-item-container">
                    {group.lider === this.state.currentUser && (
                      <button
                        onClick={(e) => this.onDelete(group._id)}
                        className="delete-category-button"
                      >
                        &#10006;
                      </button>
                    )}
                    <div>
                      <strong>Materie: </strong>
                      {group.nume}
                    </div>
                    <div>
                      <strong>Cadru didactic: </strong>
                      {group.profesor}
                    </div>
                    <div>
                      <strong>Detalii adiționale: </strong>
                      {group.detalii}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    });
  };
  render() {
    return this.state.loading ? (
      <div className="sweet-loading">
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={"#03728b"}
          loading={this.state.loading}
        />
      </div>
    ) : (
      <React.Fragment>
        {" "}
        <Button onClick={this.openModal}>Adaugă eveniment</Button>
        <br />
        <br />
        {this.renderModal()}
        <Grid container spacing={5}>
          <Grid item xs={6}>
            {" "}
            <EventsCard
              title="Sala de lectura"
              image="https://www.dacca.ro/filehandler/ProductSpaceFile/autoxauto/amenajare-biblioteca-sala-lectura-forbo-8-253.jpg?v=636666431831285799"
              events={this.state.groups.filter((group) => {
                return group.locatie === locatii.SALA_LECTURA;
              })}
            />
          </Grid>
          <Grid item xs={6}>
            <EventsCard
              title="Corp A Leu - Parter"
              image="https://www.nwradu.ro/wp-content/uploads/2016/06/facultatea_electronica_03.jpg"
              events={this.state.groups.filter((group) => {
                return group.locatie === locatii.CORP_A_LEU_PARTER;
              })}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={5}>
          <Grid item xs={6}>
            {" "}
            <EventsCard
              title="Corp A Leu - Etaj"
              image="https://lh3.googleusercontent.com/proxy/U7vt3i5XQ8EfNPaGI-gO1QRuNhuQTijG7lI0N3ZowkXCrzH6F9jGmAtuuDagMtPLvUvnJKe8G5DjOqyhQZaeWCmr0DA1aSDfbZSq9gI4"
              events={this.state.groups.filter((group) => {
                return group.locatie === locatii.CORP_A_LEU_ETAJ;
              })}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <EventsCard
              title="Biblioteca centrală"
              image="https://fim.upb.ro/wp-content/uploads/2019/04/biblioteca-UPB.jpg"
              events={this.state.groups.filter((group) => {
                return group.locatie === locatii.BIBLIOTECA_CENTRALA;
              })}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Learning.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Learning);
