import React, { Component } from 'react';
import AddUserModal from './AddUserModal.jsx';

class AdminHome extends Component {
	constructor(){
		super();
		this.state = {
			data: [],
			openEvent: undefined,
			detailOpen: false
		}
	}

	componentWillMount() {
		this.getData();
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

	detailOpen(event) {
		console.log("EVNET",event)
		this.setState({
			detailOpen: true,
			openEvent: event
		});
	}

	render(){
		return(
			<div>
			<CreateTable userData={this.state.data} />
			<p>
			<button type="button" onClick={this.detailOpen.bind(this, event)}>Add New Users</button>
			</p>
			<div>
				<AddUserModal event={this.state.openEvent} detailOpen={this.state.detailOpen}/>
			</div>
			</div>
		);
	}
}

const CreateTable = (props) => {

	var rows = [];
	props.userData.forEach(function(row, index){
		rows.push(<UserRow key={index} row={row} index={index} />)
	})

		return (
			<div>
				<table>
				<thead>
					<RowHead/>
				</thead>
				<tbody>
				{rows}
				</tbody>
				</table>
			</div>
			);
}

//getting a row object {}
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