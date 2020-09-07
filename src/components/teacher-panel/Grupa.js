import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import _ from "lodash";
import MaterialTable from "material-table";
import Moment from "react-moment";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
class Grupa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grupa: props.grupa,
      open: false,
    };
  }

  onBonificationChange = (studentId) => {
    let studentToUpdate = this.state.grupa.students.find(
      (student) => student._id === studentId
    );
    const indexToUpdate = this.state.grupa.students.indexOf(studentToUpdate);
    if (
      !studentToUpdate.bonuses.find(
        (bonus) =>
          bonus.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
      )
    ) {
      studentToUpdate.bonuses.push({
        date: new Date().toISOString(),
        teacher: this.props.auth.user._id,
      });
    } else {
      const newBonuses = studentToUpdate.bonuses.filter(
        (bonus) =>
          bonus.date.slice(0, 10) !== new Date().toISOString().slice(0, 10)
      );
      studentToUpdate.bonuses = newBonuses;
    }
    let newGrupa = this.state.grupa;
    newGrupa.students[indexToUpdate] = studentToUpdate;
    this.setState({ grupa: newGrupa });
  };

  onAttendanceChange = (studentId) => {
    let studentToUpdate = this.state.grupa.students.find(
      (student) => student._id === studentId
    );
    const indexToUpdate = this.state.grupa.students.indexOf(studentToUpdate);
    if (
      !studentToUpdate.attendances.find(
        (attendance) =>
          attendance.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
      )
    ) {
      studentToUpdate.attendances.push({
        date: new Date().toISOString(),
        teacher: this.props.auth.user.id,
      });
    } else {
      const newAttendances = studentToUpdate.attendances.filter(
        (attendance) =>
          attendance.date.slice(0, 10) !== new Date().toISOString().slice(0, 10)
      );
      studentToUpdate.attendances = newAttendances;
    }
    let newGrupa = this.state.grupa;
    newGrupa.students[indexToUpdate] = studentToUpdate;
    this.setState({ grupa: newGrupa });
  };

  saveStudents = () => {
    axios
      .put("/api/students/", this.state.grupa.students)
      .then((res) => window.alert("Succes!"))
      .catch((err) => console.log(err));
  };

  render() {
    const columns = [
      { title: "Nume", field: "name" },
      { title: "Prezenta", field: "attendances" },
      { title: "Bonificatie", field: "bonifications" },
    ];
    const data = this.state.grupa.students.map((student) => {
      return {
        name: student.name,
        attendances: (
          <Checkbox
            onChange={() => this.onAttendanceChange(student._id)}
            checked={student.attendances.some(
              (attendance) =>
                attendance.date.slice(0, 10) ===
                new Date().toISOString().slice(0, 10)
            )}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        ),
        bonifications: (
          <Checkbox
            checked={student.bonuses.some(
              (bonification) =>
                bonification.date.slice(0, 10) ===
                new Date().toISOString().slice(0, 10)
            )}
            onChange={() => this.onBonificationChange(student._id)}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        ),
      };
    });
    return (
      <React.Fragment>
        Data: <Moment format="MM/DD/YYYY">{new Date()}</Moment>
        <br />
        Grupa: {this.state.grupa.nume}
        <MaterialTable
          options={{ showTitle: false, toolbar: false }}
          columns={columns}
          data={data}
        />
        <Button onClick={this.saveStudents}>Save</Button>
      </React.Fragment>
    );
  }
}
Grupa.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Grupa);
