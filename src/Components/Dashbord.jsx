import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Dashbord() {
const navigate = useNavigate();
const [admin, setadmin] = useState("Hukum Gupta");
const [count, setCount] = useState(0);


useEffect(()=> {
 const check = () => {
  if(count > 0){
    document.querySelector('.welcomediv').style.display = "none"
  }
  else{
     document.querySelector('.welcomediv').style.display = "flex"
  }
 }
 check();
}, [count])

const handleHomeclick = () =>{
  window.location.reload();
}
const handleLogoutClick = () =>{
  navigate('/')
}
const handleCreatClick = () => {
  document.querySelector('.welcomediv').style.display = "none"
}



  return (
    <div className='dashboardPageContainer'>
    <div className='topdiv'>
        <div className='logodiv'>
            <h2 className='logo'>Logo</h2>
        </div>
        <div className='navdiv'>
          <nav className='navbar'>
            <div>
              <ul>
                <li className='navitem homebtn' onClick={handleHomeclick}>Home</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className='navitem normaltxt'>Employee List</li>
              </ul>
            </div>
            <div>
              <ul className='logoutsection'>
                <li>{admin} - </li>
                <li className='navitem logoutbtn' onClick={handleLogoutClick}>Logout</li>
              </ul>
            </div>
          </nav>
        </div> 
      </div>
      <div className='dasdboardBox'>
        <div className='dashbordbody'>
          <div className='countandcreate'>
            <ul>
              <li>Total Count : {count}</li>
              <li><button className='createbtn' onClick={handleCreatClick}>Create Employee</button></li>
            </ul>
          </div>


          <div className='createemployeediv'>
            <form>
                <table className='createTable'>
                  <tbody className='createtablebody'>
                      <tr className='createtablerow'>
                          <td>Name </td>
                          <td>:</td>
                          <td><input type="text" className="inputbox" placeholder='Enter your name'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Email </td>
                          <td>:</td>
                          <td><input type="email" className="inputbox" placeholder='Enter your email'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Mobile No </td>
                          <td>:</td>
                          <td><input type="number" className="inputbox" placeholder='Enter your number' maxLength = {10}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Designation </td>
                          <td>:</td>
                          <td>
                            <select name="designation" id="designation">
                              <option value="HR">HR</option>
                              <option value="Manager">Manager</option>
                              <option value="sales">sales</option>
                            </select>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Gender </td>
                          <td>:</td>
                          <td>
                            <input type="radio"/><label htmlFor="male">male</label> 
                            <input type="radio"/><label htmlFor="female">female</label>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Course </td>
                          <td>:</td>
                          <td>
                            <input type="checkbox"/> <label htmlFor="MCA">MCA </label>
                            <input type="checkbox"/> <label htmlFor="BCA">BCA </label>
                            <input type="checkbox"/> <label htmlFor="BSC">BSC </label>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td>Img Upload </td>
                          <td>:</td>
                          <td><input type="file" accept='.png, .jpg'/></td>
                      </tr>


                      <tr className='createtablerow createbtnrow'>
                          <td colSpan={3}><button className='submitbtn'>Sumbit</button></td>
                      </tr>
                  </tbody>
              </table>
            </form>
          </div>


          <div className='welcomediv'>
              <h1 className='welcomeheading'>Welcome to Admin Pannel</h1>
              <p>no Employee</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbord
