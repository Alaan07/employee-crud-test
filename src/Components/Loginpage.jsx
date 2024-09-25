import React from 'react'
import { useNavigate } from 'react-router-dom'


function Loginpage() {
    const navigate = useNavigate();

    const handleLoginClick = () =>{
        navigate('/dashboard');
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
                    <td><input type="email" className="inputbox" placeholder='Enter your username'/></td>
                </tr>
                <tr className='tablerow'>
                    <td>Password </td>
                    <td>:</td>
                    <td><input type="password" className="inputbox" placeholder='Enter your password'/></td>
                </tr>
                <tr className='tablerow btnrow'>
                    <td colSpan={3} ><button onClick={handleLoginClick} className='loginbtn'>Login</button></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Loginpage
