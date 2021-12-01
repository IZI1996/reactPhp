import axios from "axios";
import React,{Component} from "react";
import {Link } from 'react-router-dom'
import {Redirect} from "react-router-dom"



 class Session extends Component{
    constructor(props) {
        super(props)
        const token=localStorage.getItem("access_token");

     let loggedIn =true;
     if(token == null){
         loggedIn = false;
     }
     this.state={
         loggedIn,
         username:""
     }
     }
     componentDidMount(){

         const config ={
            
                 Authorization:localStorage.getItem("access_token")
             
         }

        
         //      axios.get('http://localhost/testt/test/back/select.php').then(
    //          res=>{
    //   console.log(res);

    //          },
    //          err=>{
    //              console.log(err)
    //          }
    //      )
    }

     
    render()  {
        const dataa=localStorage.getItem("data");
        const datauser = dataa.split(/[,,"]/);

        var username=datauser[3];
        console.log(username)
       
        if (this.state.loggedIn === false){
            return <Redirect to="/Login"/>
          }
        return(
            <div>
                 
                 <div></div>

                <h1> welcome {username} To your count </h1>
                <Link  to="/logout">logout</Link>

            </div>
        )
    }
}
export default Session;