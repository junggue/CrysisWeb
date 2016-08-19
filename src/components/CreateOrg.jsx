import React from 'react';
import ReactDOM from 'react-dom';

class CreateOrg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orgName: '',
      orgPassword: ''
    }
    this.update = this.update.bind(this)
  }

  insertData() {
    var url = 'http://localhost:3000/api/organization';
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        orgName: this.state.orgName,
        orgPassword: this.state.orgPassword
      })
    })
  }

  update(e) {
    console.log(e.target.value)
    this.setState({
      orgName: ReactDOM.findDOMNode(this.refs.orgName).value,
      orgPassword: ReactDOM.findDOMNode(this.refs.orgPassword).value
    })
    this.insertData();
  }

  render() {
    return (
      <div>
        <p>
          <span>Organization Name</span>
          <input ref="orgName" type="text" />
          {this.state.orgName}
        </p>
        <p>
          <span>Password</span>
          <input ref="orgPassword" type="password" />
          {this.state.orgPassword}
        </p>
        <button type="button" onClick={this.update}>Submit</button>
      </div>
    );
  }
}

export default CreateOrg
