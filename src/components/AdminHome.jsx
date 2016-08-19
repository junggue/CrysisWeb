import React, { Component } from 'react';
import AddUserModal from './AddUserModal.jsx';
import EditUserModal from './EditUserModal.jsx';

class AdminHome extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			openEvent: undefined,
			openEditEvent: undefined,
			showAddModal: false,
			showEditModal: false,
			rowToEdit: {}
		}
		this.closeEditModal=this.closeEditModal.bind(this);
		this.closeAddModal=this.closeAddModal.bind(this);
		this.storeTheRow=this.storeTheRow.bind(this);
		this.updateEditModal=this.updateEditModal.bind(this);
		this.updateAddModal=this.updateAddModal.bind(this);
		this.deleteData=this.deleteData.bind(this);
		this.updateData= this.updateData.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentWillMount() {
		this.getData();
	}

	updateData(newData){
		this.setState({data:this.state.data.concat([newData])});
	}

	getData(){
		var url = 'http://localhost:3000/api/user';
		var config = {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ5YW5nanVuZyIsImlhdCI6MTQ3MDc3ODQzMX0.76_6xJ2GNkSDv-TnJuSbn-CezwK9a2yLRwgRUUR4PcE'
			}
		}
		return fetch(url, config)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				this.setState({data: result})
			})
	}

	deleteData(index){
		var url = 'http://localhost:3000/api/user?id=' + index;
		var config = {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ5YW5nanVuZyIsImlhdCI6MTQ3MDc3ODQzMX0.76_6xJ2GNkSDv-TnJuSbn-CezwK9a2yLRwgRUUR4PcE'
			}
		}
		return fetch(url, config)
			.then(()=>{this.getData()});
	}

	updateAddModal(event) {
		this.setState({
			showAddModal: true,
			openEvent: event
		});
	}
	// major logic stays in the parent component
	closeAddModal(event) {
		this.setState({
			showAddModal: false,
			openEvent: event
		});
	}

	updateEditModal(event) {
		console.log("EVENT",event);
		this.setState({
			showEditModal: true,
			openEditEvent: event
		},()=> console.log(this.state.showAddModal));
	}

	closeEditModal(event) {
		console.log("EVENT",event);
		this.setState({
			showEditModal: false,
			openEditEvent: event
		},()=> console.log(this.state.showAddModal));
	}

	storeTheRow(obj){
		//Asynch even though setState worked, that doesn't mean the current one work......??? so weird
		this.setState({rowToEdit:obj});
		console.log(this.state.rowToEdit);
	}

	updateRow(editedData){

	}

	render(){
		return(
			<div>
				<CreateTable userData={this.state.data} storeTheRow={this.storeTheRow} updateEditModal={this.updateEditModal} deleteData={this.deleteData} />
				<button type="button" onClick={this.updateAddModal}>Add New Users</button>
				<AddUserModal event={this.state.openEvent} showAddModal={this.state.showAddModal} data={this.state.data} updateData={this.updateData} closeAddModal={this.closeAddModal}/>
				<EditUserModal event={this.state.openEditEvent} showEditModal={this.state.showEditModal} rowToEdit={this.state.rowToEdit} getData={this.getData} closeEditModal={this.closeEditModal}/>
			</div>
		);
	}
}

const CreateTable = (props) => {
	var list = props.userData.map(function(row, index){
		return (<UserRow key={index} row={row} index={index} storeTheRow={props.storeTheRow} updateEditModal={props.updateEditModal} deleteData={props.deleteData} />)
	})
	return (
		<div>
			<table>
				<thead>
					<RowHead/>
				</thead>
				<tbody>
					{list}
				</tbody>
			</table>
		</div>
		);
}

const UserRow = (props) => {
	return(
	<tr>
		<td>{props.index}</td>
		<td>{props.row.username}</td>
		<td>{props.row.email}</td>
		<td>{props.row.name}</td>
		<td>{props.row.isWarden.toString()}</td>
		<td>{props.row.wardenName}</td>
		<td>{props.row.isAdmin.toString()}</td>
		<td>{props.row.status}</td>
		<td><button
		type="button"
		onClick={()=>{
			props.storeTheRow(props.row);
			props.updateEditModal();
		}}>Edit</button></td>
		<td><button 
		type="button" 
		onClick={()=>{
			var result = confirm("Are you sure you want to delete this?");
			if(result){
				props.deleteData(props.row.id);
			}
		}}>Delete</button></td>
	</tr>
	);
}

const RowHead = () => {
	return (
		<tr>
			<th>number</th>
			<th>username</th>
			<th>email</th>
			<th>name</th>
			<th>isWarden</th>
			<th>wardenName</th>
			<th>isAdmin</th>
			<th>status</th>
		</tr>
	);
}

export default AdminHome