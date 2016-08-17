import React from 'react';
import ReactDOM from 'react-dom';

class CreateOrg extends Component {
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
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        orgName: this.state.orgName,
        orgPassword: this.state.orgPassword
      })
    })
  }

  update(e) {
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
        </p>
        <p>
          <span>Password</span>
          <input ref="orgPassword" type="password" />
        </p>
        <p>
          <span>Confirm Password</span>
          <input ref="orgPassword" type="password" />
        </p>
        <button type="button" onClick={this.update}>Submit</button>
      </div>
    );
  }
}

export default CreateOrg
