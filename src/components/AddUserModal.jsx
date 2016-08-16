import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    backgroundColor   : 'rgba(255, 255, 255, .1)',
    zIndex:  900
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddUserModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			detailOpen: this.props.detailOpen,
			event: this.props.event,
			username: '',
			password: '',
			email: '',
			name: '',
			isWarden: false,
			wardenName: '',
			isAdmin: false
		}
		this.update = this.update.bind(this);
		this.openDetail = this.openDetail.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
	}

	componentWillReceiveProps(nextProps){
    this.setState({
      detailOpen: nextProps.detailOpen,
      event: nextProps.event
    });
  }

  openDetail() {
    this.setState({
      detailOpen: true
    });
  }

  closeDetail() {
    this.setState({
      detailOpen: false
    });
  }

	insertData(){
		var url = 'http://localhost:3000/api/user';
		var config = {
			method: "POST",
			// required to fix:
			// get the token from admin's token
			headers: {
					'Content-Type': 'application/json',
					'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ5YW5nanVuZyIsImlhdCI6MTQ3MDc3ODQzMX0.76_6xJ2GNkSDv-TnJuSbn-CezwK9a2yLRwgRUUR4PcE'
			},
			body: JSON.stringify({
				username      : this.state.username,
				email         : this.state.email,
				name          : this.state.name,
				isWarden      : this.state.isWarden,
				wardenName    : this.state.wardenName,
				isAdmin       : this.state.isAdmin,
				password      : this.state.password,
				// required to fix: organization hard coded
				// needs to get the organization ID from administration
				OrganizationId: 1
			})
		}
		console.log(config, url)
		return fetch(url, config);
	}

	update(e){
		console.log(e.target.value)
		this.setState({
			username	: ReactDOM.findDOMNode(this.refs.username).value,
			password	: ReactDOM.findDOMNode(this.refs.password).value,
			email			: ReactDOM.findDOMNode(this.refs.email).value,
			name			: ReactDOM.findDOMNode(this.refs.name).value,
			isWarden	: ReactDOM.findDOMNode(this.refs.isWarden).value,
			wardenName: ReactDOM.findDOMNode(this.refs.wardenName).value,
			isAdmin		: ReactDOM.findDOMNode(this.refs.isAdmin).value
		})
		this.insertData();
	}

	render(){
		return (
			<Modal
          isOpen={this.state.detailOpen}
          onRequestClose={this.closeDetail}
          style={customStyles}>
				<div>
					<p>
						<span>username</span>
						<input ref="username" type="text" />
						{this.state.username}
					</p>
					<p>
						<span>password</span>
						<input ref="password" type="text" />
					</p>
					<p>
						<span>confirm password</span>
						<input ref="password2" type="text" />
					</p>
					<p>
						<span>email</span>
						<input ref="email" type="text" />
					</p>
					<p>
						<span>name</span>
						<input ref="name" type="text" />
					</p>
					<p>
						<span>Is this user a warden?</span>
						<input ref="isWarden" type="text" />
					</p>
					<p>
						<span>warden name</span>
						<input ref="wardenName" type="text" />
					</p>
					<p>
						<span>Is this user an admin?</span>
						<input ref="isAdmin" type="text" />
					</p>
						<button type="button" onClick={this.update}>Click Me!</button>
				</div>
			</Modal>
		);
	}
}

export default AddUserModal