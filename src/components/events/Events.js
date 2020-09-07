import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Modal from "react-responsive-modal";
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/core";
import Moment from "react-moment";
import { AddEvent } from "./AddEvent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import EventsCard from "../layout/EventsCard";
const override = css`
  display: block;
  margin: auto;
  margin-top: 20%;
  border-color: #03728b;
`;

const locatii = {
  FACULTATE: "Facultate",
  SALA_LECTURA: "Sală de lectură - Cămin Leu A",
  CANTINA: "Cantină Leu",
};

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModal: false,
      events: [],
    };
  }

  componentDidMount() {
    axios
      .get("api/events")
      .then((response) => {
        const { data } = response;
        this.setState({ events: data, loading: false });
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
        <DialogTitle id="simple-dialog-title">Adaugă eveniment</DialogTitle>
        <AddEvent onSubmit={this.onEventSubmit} />
      </Dialog>
    );
  };

  onEventSubmit = (data) => {
    axios
      .post("api/events/add", data)
      .then((response) => {
        const newEvents = this.state.events;
        newEvents.push(response.data);
        this.setState({ events: newEvents }, () => {
          this.closeModal();
        });
      })
      .catch((error) => {});
  };

  onDelete = (id) => {
    axios
      .delete("api/events/" + id)
      .then((response) => {
        window.alert("Ai șters evenimentul");
        window.location.reload(true);
      })
      .catch((error) => {});
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
        <EventsCard
          title="Facultate"
          image="https://cronicaromana.net/wp-content/uploads/2019/06/universitatea-politehnica-bucuresti.jpg"
          events={this.state.events.filter((event) => {
            return event.locatie === locatii.FACULTATE;
          })}
        />
        <br />
        <EventsCard
          title="Sală de lectură"
          image="https://www.telekiteka.ro/files/image/2018-05-11-13-25-03_75af56f7f7545b.jpg.jpg"
          events={this.state.events.filter((event) => {
            return event.locatie === locatii.SALA_LECTURA;
          })}
        />
        <br />
        <EventsCard
          title="Cantina"
          image="https://www.restaurantecantine.ro/files/home/cantine-17a/_MG_7646.jpg"
          events={this.state.events.filter((event) => {
            return event.locatie === locatii.CANTINA;
          })}
        />
      </React.Fragment>
    );
  }
}

Events.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Events);
