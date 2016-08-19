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

class EditUserModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showEditModal: props.showEditModal,
			event: props.event,
			data: props.data,
			username: '',
			password: '',
			email: '',
			name: '',
			isWarden: '',
			wardenName: '',
			isAdmin: ''
		}
		this.editData = this.editData.bind(this);
		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

	//update after rendering? or before?
	componentWillReceiveProps(nextProps){
    this.setState({
      showEditModal: nextProps.showEditModal,
      event: nextProps.event,
      username: nextProps.rowToEdit.username,
      password: nextProps.rowToEdit.password,
			email: nextProps.rowToEdit.email,
			name: nextProps.rowToEdit.name,
			isWarden: nextProps.rowToEdit.isWarden,
			wardenName: nextProps.rowToEdit.wardenName,
			isAdmin: nextProps.rowToEdit.isAdmin
    });
  }

  openModal() {
    this.setState({
      showEditModal: true
    });
  }

  closeModal() {
    this.setState({
      showEditModal: false
    });
  }

	editData(){
		var url = 'http://localhost:3000/api/user?id=' + this.props.rowToEdit.id;
		var config = {
			method: "PUT",
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
				// this.props.updateData(result);
				console.log(result)
				this.props.getData();
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
          isOpen={this.state.showEditModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
				<div>
					<p>
						<span>username</span>
						<input type="text" defaultValue={this.state.username} onChange={this.updateUserName.bind(this)}/>
					</p>
					<p>
						<span>password</span>
						<input type="text" defaultValue={this.state.password} onChange={this.updatePassword.bind(this)}/>
					</p>
					<p>
						<span>confirm password</span>
						<input type="text" />
					</p>
					<p>
						<span>email</span>
						<input type="text" defaultValue={this.state.email} onChange={this.updateEmail.bind(this)}/>
					</p>
					<p>
						<span>name</span>
						<input type="text" defaultValue={this.state.name} onChange={this.updateName.bind(this)}/>
					</p>
					<p>
						<span>Is this user a warden?</span>
						<input type="text" defaultValue={this.state.isWarden} onChange={this.updateIsWarden.bind(this)}/>
					</p>
					<p>
						<span>warden name</span>
						<input type="text" defaultValue={this.state.wardenName} onChange={this.updateWardenName.bind(this)}/>
					</p>
					<p>
						<span>Is this user an admin?</span>
						<input type="text" defaultValue={this.state.isAdmin} onChange={this.updateIsAdmin.bind(this)}/>
					</p>
						<button 
						type="button" 
						onClick={()=>{
							this.editData();
							console.log("IN MODAL",this.props.rowToEdit);
						}}>Edit</button>
						<button type="button" onClick={this.props.closeEditModal}>Cancel</button>
				</div>
			</Modal>
		);
	}
}

export default EditUserModal