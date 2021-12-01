import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
// import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
var status;
class LoginUser extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;

    this.state = {
      email: "",
      password: "",
      loggedIn,
      token:''
    };
    this.onChange = this.onChange.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
  }

  // get req data in the link

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  SubmitForm(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    if (email !== "") {

    const data ={
      email:email,
      password:password
    }
    axios.post("http://localhost/testt/test/back/select.php",data)
    .then(res =>{
      if(res.status === 200 && res.data.jwt  ){
 console.log(res)
        let dataa=JSON.stringify(res.data.user);
        console.log(dataa)

        let jwt = res.data.jwt;
        localStorage.setItem("data",dataa);
        localStorage.setItem("access_token", jwt);
        this.setState({
          loggedIn: true,
        });
      }
    })
    .catch(err =>{
      console.log(err)
    })


   
    }
  }



  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/session" />;
    }
    return (
      <>
        <Col>
          <Header />
          <h2>
            Auto-layout for flexbox grid columns also means you can set the
            width
          </h2>
          <p>
            Atlassian is a leading provider of collaboration software for teams
            with products including JIRA, Confluence, HipChat, Bitbucket and
            Stash.
          </p>
        </Col>
        <Col>
          <Form onSubmit={this.SubmitForm} className="d-grid gap-2 mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={this.onChange}
                value={this.state.password}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Link to="/reg">Create Account !</Link>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </>
    );
  }
}
export default LoginUser;
