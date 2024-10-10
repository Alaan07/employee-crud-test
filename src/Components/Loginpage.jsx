import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Loginpage() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");



    const handleLoginClick = async(e) =>{
      e.preventDefault();
      console.log(username, password);
      
      if((username === '') || (password === '')){
        alert("All fields must be filed");
      return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/login', { username, password });
        const validData = response.data.invalid;
        const isauth = response.data.userauth
        console.log(validData);
        console.log(isauth);


        if(validData){
          alert("Invalid Credentials")
        }else{
          localStorage.setItem('username', JSON.stringify(username));
          alert("Login successfull")
          navigate('/dashboard', {state:{userauth: isauth}});
        }

    } catch (err){
      console.log(err);
    }
      setusername("");
      setpassword("");
    }
      
    
  

  return (
    <div className='loginPageContainer'>
        <div className='logodiv'>
            <h2 className='logo'>Logo</h2>
        </div>
      <div className='loginBox'>
        <table className='loginTable'>
            <thead className='tablehead'><tr><td colSpan={3}>Login Page</td></tr></thead>
            <tbody className='tablebody'>
                <tr className='tablerow'>
                    <td>User Name </td>
                    <td>:</td>
                    <td><input type="text" className="inputbox" placeholder='Enter your username' value={username} onChange={(e)=>setusername(e.target.value)}/></td>
                </tr>
                <tr className='tablerow'>
                    <td>Password </td>
                    <td>:</td>
                    <td><input type="password" className="inputbox" placeholder='Enter your password' value={password} onChange={(e)=>setpassword(e.target.value)}/></td>
                </tr>
                <tr className='tablerow btnrow'>
                    <td colSpan={3} ><button onClick={handleLoginClick} className='loginbtn'>Login</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )}

export default Loginpage
