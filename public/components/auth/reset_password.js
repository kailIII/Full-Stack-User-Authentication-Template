import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { resetPassword, authError } from '../../actions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class ResetPassword extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			newPassword: '',
      confirmPassword: ''
		};

		this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {

    const { resetPassword, authError } = this.props;

    const token = this.props.params.token;
		const newPassword = this.state.newPassword.toLowerCase();
    const confirmPassword = this.state.confirmPassword.toLowerCase();

    const props = {
      password: newPassword
    };

		if (newPassword === confirmPassword) {
			resetPassword(props, token)
	      .then(() => {
	        toastr.success("Your password was successfully changed!");
	        browserHistory.push('/');
	      })
	      .catch((err) => {
	        toastr.error("Password could not be changed");
	      });
		} else {
			authError("Passwords do not match");
		}



	}

	handleUpdateFormState(event) {
		this.setState({
      [event.target.name]: event.target.value
    });
	}

	render() {

      return (
        <div className="row">
          <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            <div className="form-group">

      		  	<div className="form-group">
                <label>New Password</label>
      					<input
      						id="newPassword"
      						className="form-control"
      						type="password"
      						name="newPassword"
      						placeholder="New Password..."
      						onChange={this.handleUpdateFormState} />
      				</div>

      				<div className="form-group">
                <label>Confirm Password</label>
      					<input
      						id="confirmPassword"
      						className="form-control"
      						type="password"
      						name="confirmPassword"
      						placeholder="Confirm Password..."
      						onChange={this.handleUpdateFormState} />
      				</div>

      				<button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>

      			</div>

						<div className="text-center error">
							{this.props.errorMessage}
						</div>

						div id="signInMessage" className="row alert alert-success">
				    	<ul>

				    	  <li>
									<i className="fa fa-cube fa-2x" aria-hidden="true"></i>

				    	  </li>

				    	  <li>
									 <i className="fa fa-cube fa-2x" aria-hidden="true"></i>

				    	  </li>

				    	  <li>
										<i className="fa fa-cube fa-2x" aria-hidden="true"></i>

				    	  </li>
				    	  <li>
										<i className="fa fa-cube fa-2x" aria-hidden="true"></i>

				    	  </li>
				    	</ul>
          </div>
        </div>

  		);

	}

}


function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated,
	 				 errorMessage: state.auth.error
				 };
}

export default connect(mapStateToProps, { resetPassword, authError })(ResetPassword);
