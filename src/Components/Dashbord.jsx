import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

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
  document.querySelector('.createemployeediv').style.display = "flex"
}


  return (
    <div className='dashboardPageContainer'>
    {/* //*********************************************** navtop part */}
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
          <div className='searchdiv'>
            <ul>
              <li><button className='searchIcon'><FaSearch className='fasearch_icon'/></button></li>
              <li><input className='searchInput'  type="text" placeholder='Enter search Keyword'/></li>
              <li>
                <select name="searchfilters" id="filters" className='searchoptions'>
                  <option value="Name">Name</option>
                  <option value="Email">Email</option>
                  <option value="Contact">Contact</option>
                </select>
              </li>
            </ul>
          </div>

{/* //*********************************************** create part */}
          <div className='createemployeediv'>
            <form>
                <table className='createTable'>
                <thead className='tablehead'><tr><td colSpan={3}>Create Employee</td></tr></thead>
                  <tbody className='createtablebody'>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Name </td>
                          <td>:</td>
                          <td><input type="text" className="createinputs" placeholder='Enter your name'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Email </td>
                          <td>:</td>
                          <td><input type="email" className="createinputs" placeholder='Enter your email'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Mobile No </td>
                          <td>:</td>
                          <td><input type="contact" className="createinputs" placeholder='Enter your number' maxLength = {10}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Designation </td>
                          <td>:</td>
                          <td>
                            <select name="designation" id="designation" className='createselect'>
                              <option value="HR">HR</option>
                              <option value="Manager">Manager</option>
                              <option value="sales">sales</option>
                            </select>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Gender </td>
                          <td>:</td>
                          <td className='genderradio'>
                            <div className='optionitems'>
                               <input type="radio"/><label htmlFor="male">MALE</label>   
                            </div>
                            <div className='optionitems'>
                               <input type="radio"/><label htmlFor="female">FEMALE</label>
                            </div>
                            
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Course </td>
                          <td>:</td>
                          <td className='coursecheckbox'>
                              <div className='optionitems'>
                                <input type="checkbox"/> <label htmlFor="MCA">MCA </label>
                              </div>
                              <div className='optionitems'>
                                <input type="checkbox"/> <label htmlFor="BCA">BCA </label>
                              </div>
                              <div className='optionitems'>
                                  <input type="checkbox"/> <label htmlFor="BSC">BSC </label>
                              </div>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Img Upload </td>
                          <td>:</td>
                          <td className='filetd'><input className="loadfile" type="file" accept='.png, .jpg'/></td>
                      </tr>


                      <tr className='createtablerow createbtnrow'>
                          <td colSpan={3}><button className='submitbtn'>Sumbit</button></td>
                      </tr>
                  </tbody>
              </table>
            </form>
          </div>

{/* //*********************************************** update part */}
          <div className='updateemployeediv'>
            <form>
                <table className='createTable'>
                <thead className='tablehead'><tr><td colSpan={3}>Update Employee</td></tr></thead>
                  <tbody className='createtablebody'>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Name </td>
                          <td>:</td>
                          <td><input type="text" className="createinputs" placeholder='Enter your name'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Email </td>
                          <td>:</td>
                          <td><input type="email" className="createinputs" placeholder='Enter your email'/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Mobile No </td>
                          <td>:</td>
                          <td><input type="contact" className="createinputs" placeholder='Enter your number' maxLength = {10}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Designation </td>
                          <td>:</td>
                          <td>
                            <select name="designation" id="designation" className='createselect'>
                              <option value="HR">HR</option>
                              <option value="Manager">Manager</option>
                              <option value="sales">sales</option>
                            </select>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Gender </td>
                          <td>:</td>
                          <td className='genderradio'>
                            <div className='optionitems'>
                               <input type="radio"/><label htmlFor="male">MALE</label>   
                            </div>
                            <div className='optionitems'>
                               <input type="radio"/><label htmlFor="female">FEMALE</label>
                            </div>
                            
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Course </td>
                          <td>:</td>
                          <td className='coursecheckbox'>
                              <div className='optionitems'>
                                <input type="checkbox"/> <label htmlFor="MCA">MCA </label>
                              </div>
                              <div className='optionitems'>
                                <input type="checkbox"/> <label htmlFor="BCA">BCA </label>
                              </div>
                              <div className='optionitems'>
                                  <input type="checkbox"/> <label htmlFor="BSC">BSC </label>
                              </div>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Img Upload </td>
                          <td>:</td>
                          <td className='filetd'>
                          <div className='imagefile'>
                            <img src="" alt="img" />
                          </div>
                          <input className="loadfile" type="file" accept='.png, .jpg'/>
                          </td>
                      </tr>


                      <tr className='createtablerow createbtnrow'>
                          <td colSpan={3}><button className='submitbtn'>Update</button></td>
                      </tr>
                  </tbody>
              </table>
            </form>
          </div>

{/* //*********************************************** welcome part */}
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
