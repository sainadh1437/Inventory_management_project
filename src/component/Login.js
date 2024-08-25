import React, { useState } from "react"; // Import React and useState for state management
import axios from "axios";  // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; //Import useNavigate for navigation
import '../css/Login.css';  // Import the Login CSS file for styling

export default function Login(props) { // Define and export the Login component
    const navigate = useNavigate(); // Initialize navigate for redirecting the user
    const [username, setUsername] = useState(''); // Initialize state for username input
    const [password, setPassword] = useState(''); // Initialize state for password input
    const postData = (e) => {   // Function to handle form submission
        e.preventDefault(); // Prevent the default form submission behavior

        if (!username && !password) {   //If username&password empty raises an alert message
            alert("Username and password fields cannot be empty.");
            return;
        }
        if (!username) {  //If username empty raises an alert message
            alert("Username cannot be empty.");
            return;
        }
        if (!password) {    //If password empty raises an alert message
            alert("Password cannot be empty.");
            return;
        }
        axios.post(`http://${props.apiKey}/login`,  //Post the login data to server
            {
            username,
            password
        }).then(() => {
            navigate('/dashboard');     //If data is valid redirect to dashboard page
            setTimeout(() => {
                alert("You are logged in successfully"); //Displays an alert message
            }, 300);

        }).catch((error) => {       //If data is invalid it catches an error
            console.error("There was an error!", error);
            alert("Invalid Credentials")    //Displays an alert message
        });
    }
    return (

        <div class="body">
            <div class="wrapper">
                <form action="">
                    <h1> Admin Login</h1>
                    <div class="input-box">
                        <input  type="text" id="uname" placeholder="Enter your Username"  onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div class="input-box">
                        <input  type="password" id="password" placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="button"> 
                        <a type="submit" href="#" onClick={postData}>Login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
