import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfiles} from '../../actions/profileActions'
import Spinner from '../../comman/Spinner';
import ProfileItem from './ProfileItem';


class Profile extends Component {
 componentDidMount() {
   this.props.getProfiles();
 }

 render() {
  const { profiles, loading } = this.props.profile;
  let profileItems;

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }
  }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profile);