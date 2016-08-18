import React, { Component } from 'react';
import AddUserModal from './AddUserModal.jsx';

class AdminHome extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			openEvent: undefined,
			showModal: false,
		}
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

	showModal(event) {
		this.setState({
			showModal: true,
			openEvent: event,
		});
	}

	render(){
		return(
			<div>
				<CreateTable userData={this.state.data}/>
				<button type="button" onClick={this.showModal.bind(this)}>Add New Users</button>
				<AddUserModal event={this.state.openEvent} showModal={this.state.showModal} data={this.state.data} updateData={this.updateData}/>
			</div>
		);
	}
}

const CreateTable = (props) => {
	const list = props.userData.map(function(row, index){
		return (<UserRow key={index} row={row} index={index} />)
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
		<td><button type="button">Edit</button></td>
		<td><button type="button">Delete</button></td>
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