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
			showModal: props.showModal,
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
      showModal: nextProps.showModal,
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
				// let array = this.state.data;
				// array.push(result);
				// this.setState({data:array});
				this.props.updateData(result)
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

	// onClick(e) {
 //      insertData();
 //      this.state.getData();
 //   }


	render(){

		return (
			<Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
				<div>
					<p>
						<span>username</span>
						<input type="text" onChange={this.updateUserName.bind(this)}/>
					</p>
					<p>
						<span>password</span>
						<input type="text" onChange={this.updatePassword.bind(this)}/>
					</p>
					<p>
						<span>confirm password</span>
						<input type="text" />
					</p>
					<p>
						<span>email</span>
						<input type="text" onChange={this.updateEmail.bind(this)}/>
					</p>
					<p>
						<span>name</span>
						<input type="text" onChange={this.updateName.bind(this)}/>
					</p>
					<p>
						<span>Is this user a warden?</span>
						<input type="text" onChange={this.updateIsWarden.bind(this)}/>
					</p>
					<p>
						<span>warden name</span>
						<input type="text" onChange={this.updateWardenName.bind(this)}/>
					</p>
					<p>
						<span>Is this user an admin?</span>
						<input type="text" onChange={this.updateIsAdmin.bind(this)}/>
					</p>
						<button type="button" onClick={this.insertData}>Add</button>
						<button type="button" onClick={this.closeModal}>Cancel</button>
				</div>
			</Modal>
		);
	}
}

export default AddUserModal




// import React, { Component } from 'react';
// import AddUserModal from './AddUserModal.jsx';

// class AdminHome extends Component {
// 	constructor(){
// 		super();
// 		this.state = {
// 			data: [],
// 			openEvent: undefined,
// 			showModal: false
// 		}
// 		this.updateData= this.updateData.bind(this);
// 		this.getData = this.getData.bind(this);
// 	}

// 	componentWillMount() {
// 		this.getData();
// 	}

// 	//overwrite data: [a,b,c,d,e,f,g]
// 	// => data: [new]
// 	updateData(newData){
// 		this.setState({data: this.state.data.concat([newData])});
// 	}

// 	getData(){
// 		var url = 'http://localhost:3000/api/user';
// 		var config = {
// 			method: "GET",
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ5YW5nanVuZyIsImlhdCI6MTQ3MDc3ODQzMX0.76_6xJ2GNkSDv-TnJuSbn-CezwK9a2yLRwgRUUR4PcE'
// 			}
// 		}
// 		return fetch(url, config)
// 			.then((res) => {
// 				return res.json();
// 			})
// 			.then((result) => {
// 				console.log("before store the data")
// 				this.setState({data: result})
// 			})
// 	}

// 	// empty the rows [<UserRow />, <UserRow />, <UserRow />, <UserRow />] 
// 	showModal(event) {
// 		this.setState({
// 			showModal: true,
// 			openEvent: event
// 		});
// 	}

// 	//1. populateUserRowComponent
// 	//2. render
// 	//3. update row component

// 	populateUserRowComponent(){
// 		this.userData.forEach(function(row, index){
// 			this.rows.push(<UserRow key={this.rows.length} row={row} index={this.rows.length} />)
// 		})
// 	}

// 	resetRows(){
// 		// this.setState({rows:[]});
// 	}

// 	// onClick(){

// 	// }

// 	render(){
// 		return(
// 			<div>
// 			<CreateTable userData={this.state.data}/>
// 			<p>
// 			<button type="button" onClick={this.showModal.bind(this)}>Add New Users</button>
// 			</p>
// 			<div>
// 				<AddUserModal event={this.state.openEvent} showModal={this.state.showModal} data={this.state.data} updateData={this.updateData}/>
// 			</div>
// 			</div>
// 		);
// 	}
// }


// // userData: [2:0, 3:1]
// // rows : [1:0, 4:1, 2:2: ]

// // const CreateTable = (props) => {

// //no error
// 	// props.userData.forEach(function(row, index){
// 	// 	console.log("index:", index)
// 	// 	props.rows.push(<UserRow key={props.rows.length} row={row} index={props.rows.length} />)
// 	// 	props.rows[index].key
// 	// })


// //cause error that has duplicate key
// // props.userData.forEach(function(row, index){
// // 		console.log("userData index:", index)
// // 		props.rows.push(<UserRow key={index} row={row} index={index} />)
// // 		console.log("rows:", props.rows[index])
// // 	})

// const CreateTable = (props) => {

// 	const list = props.userData.map(function(row, index){
// 		return (<UserRow key={index} row={row} index={index} />)
// 	})

// 	return (
// 		<div>
// 			<table>
// 				<thead>
// 					<RowHead/>
// 				</thead>
// 				<tbody>
// 					{list}
// 				</tbody>
// 			</table>
// 		</div>
// 		);
// }

// //getting a row object {}
// const UserRow = (props) => {
// 	return(
// 	<tr>
// 		<td>{props.index}</td>
// 		<td>{props.row.username}</td>
// 		<td>{props.row.email}</td>
// 		<td>{props.row.name}</td>
// 		<td>{props.row.isWarden.toString()}</td>
// 		<td>{props.row.wardenName}</td>
// 		<td>{props.row.isAdmin.toString()}</td>
// 		<td>{props.row.status}</td>
// 		<td><button type="button">Edit</button></td>
// 		<td><button type="button">Delete</button></td>
// 	</tr>
// 	);
// }

// const RowHead = () => {
// 	return (
// 		<tr>
// 			<th>number</th>
// 			<th>username</th>
// 			<th>email</th>
// 			<th>name</th>
// 			<th>isWarden</th>
// 			<th>wardenName</th>
// 			<th>isAdmin</th>
// 			<th>status</th>
// 		</tr>
// 	);
// }

// export default AdminHome

