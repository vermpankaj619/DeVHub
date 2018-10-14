import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


class Skills extends Component {


  render() {
    const skills = this.props.skills.map(skills => (
      <tr key={skills._id}>
        <td>{skills}</td>

        <td>
          <Moment format="YYYY/MM/DD">{skills.from}</Moment> -
          {skills.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{skills.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, skills._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Skills Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {Skills}
          </thead>
        </table>
      </div>
    );
  }
}


export default connect()(Skills);
