import React, { Component } from 'react';
import { 
  Button, Modal, Form, FormGroup, FormControl, ControlLabel,
  Col
} from 'react-bootstrap';

class AuthModal extends React.Component {
  render() {
    console.log(this.props);
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <h4>Login</h4>
            <Form horizontal>
              <FormGroup controlId="username">
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="username" />
                </Col>
              </FormGroup>
            
              <FormGroup controlId="password">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" />
                </Col>
              </FormGroup>
            
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={this.props.handleAuth}>Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
    );
  }
}

export default AuthModal;