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
			showModal: props.showAddModal,
			event: props.event,
			data: props.data,
			username: '',
			password: '',
			email: '',
			name: '',
			isWarden: false,
			wardenName: '',
			isAdmin: false
		}
		this.insertData = this.insertData.bind(this);
		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

	componentWillReceiveProps(nextProps){
    this.setState({
      showModal: nextProps.showAddModal,
      event: nextProps.event
    });
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
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
		return fetch(url, config)
			.then((data) => {
				return data.json();
			})
			.then((result) => {
				this.props.updateData(result);
				this.closeModal();
			});
	}

	updateUserName(e){
		this.setState({
			username	: e.target.value
		})
	}
	updatePassword(e){
		this.setState({
			password	: e.target.value
		})
	}

	updateEmail(e){
		this.setState({
			email			: e.target.value
		})
	}

	updateName(e){
		this.setState({
			name			: e.target.value
		})
	}

	updateIsWarden(e){
		this.setState({
			isWarden	: e.target.value
		})
	}

	updateWardenName(e){
		this.setState({
			wardenName: e.target.value
		})
	}

	updateIsAdmin(e){
		this.setState({
			isAdmin		: e.target.value
		})
	}

	render(){

		return (
			<Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
				<div>
					<p>
						<div>username</div>
						<input type="text" onChange={this.updateUserName.bind(this)}/>
					</p>
					<p>
						<div>password</div>
						<input type="password" onChange={this.updatePassword.bind(this)}/>
					</p>
					<p>
						<div>confirm password</div>
						<input type="password" />
					</p>
					<p>
						<div>email</div>
						<input type="text" onChange={this.updateEmail.bind(this)}/>
					</p>
					<p>
						<div>name</div>
						<input type="text" onChange={this.updateName.bind(this)}/>
					</p>
					<p>
						<div>warden name</div>
						<input type="text" onChange={this.updateWardenName.bind(this)}/>
					</p>
					<p>
						<span>Is this user a warden?</span>
						<select defaultValue={false} onChange={this.updateIsWarden.bind(this)}>
						  <option value="true">True</option>
						  <option value="false">False</option>
						</select>
					</p>
					<p>
						<span>Is this user an admin?</span>
						<select defaultValue={false} onChange={this.updateIsWarden.bind(this)}>
						  <option value="true">True</option>
						  <option value="false">False</option>
						</select>
					</p>
						<button type="button" onClick={this.insertData}>Add</button>
						<button type="button" onClick={this.props.closeAddModal}>Cancel</button>
				</div>
			</Modal>
		);
	}
}

export default AddUserModal