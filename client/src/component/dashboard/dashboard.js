import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link} from 'react-router-dom';
import { connect} from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../../comman/Spinner';
import { loginUser } from '../../actions/authAction';
import ProfileActions from './ProfileAction';
import Experince from './Experince';
import Education from './Education';
import Skiils from './Skill';
export class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    onDeleteClick(e) {
        this.props.deleteAccount();
      }
  render() {
    

    const {user} = this.props.auth;
    const { profile, loading} = this.props.profile;

    let dashboardContent;

    if( profile===null || loading) {
        dashboardContent = <Spinner/>
    }else {
       if(Object.keys(profile).length > 0) {
        dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              <ProfileActions />
              <Experince experience={profile.experience}/>
              <Education  education={profile.education}/>
            {/* //  <Skiils skiils={profile.skills}/> */}
             <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        )
       }
       else {
           dashboardContent = (
               <div>
                   <p className='lead text-muted'>Welcome{user.name}</p>
                   <p> You have not yet a profile, please add some info</p>
                   <Link to='/create-profile' className=' btn btn-lg btn-info'>Create Profile</Link>
               </div>
           )
       }
    }
 
    return (
        <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.PropTypes={
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateProps,{getCurrentProfile, deleteAccount})(Dashboard);
