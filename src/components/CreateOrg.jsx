import React from 'react';
import ReactDOM from 'react-dom';

class CreateOrg extends React.Component {
  constructor(){
    super();
    this.state = {
      orgName: '',
      orgPassword: ''
    }
    this.update = this.update.bind(this)
  }

  update() {
    var url =
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        orgName: this.state.orgName,
        orgPassword: this.state.orgPassword
      })
    })
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
