import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';

function Dashbord() {
const [emps, setemps] = useState([]);
const [copyorig, setcopyorig] = useState([]);
const [searchresults, setsearchresults] = useState([]);
const [copyorigsearch, setcopyorigsearch] = useState([]);
const [sortType, setsortType] = useState('default')


const [query, setquery] = useState("");
const [searchstatus, setsearchstatus] = useState(false);

const navigate = useNavigate();
const [admin, setadmin] = useState("");
const [count, setCount] = useState(1);
const [username, setusername] = useState("");
const [email, setemail] = useState("");
const [contact, setcontact] = useState("");
const [desig, setdesig] = useState("HR");
const [empgender, setempgender] = useState("");
const [empcourse, setempcourse] = useState([]);

const [editName, seteditname] = useState("");
const [editEmail, seteditemail] = useState("");
const [editcontact, seteditcontact] = useState("");
const [editdesig, seteditdesig] = useState("");
const [editgender, seteditgender] = useState("");
const [editcourse, seteditcourse] = useState([]);
const [editimage, seteditimage] = useState("");
const [editid, seteditid] =useState("");

var editname = editName.trim();
var editemail = editEmail.replaceAll(" ", "").toLowerCase().trim();

var UserName = username.trim();
var Email = email.replaceAll(" ", "").toLowerCase().trim();
var MobileNo = contact;
var Designation = desig;
var Gender = empgender;
var Course = empcourse;


useEffect(()=> {
  const fetchData = (async() => {
      try{
        const res = await axios.get('http://localhost:3000/getemp');
        setemps(res.data)
        setCount(res.data.length);
       }catch(err){
                console.log(err)
         }
       })
      fetchData();

 const check = () => {
  const username = JSON.parse(localStorage.getItem('username'));
  if(username){
    setadmin(username);
  }else{
    setadmin("Admin");
  }

  if(count > 0){
    document.querySelector('.welcomediv').style.display = "none"
  }
  else{
    document.querySelector('.welcomediv').style.display = "flex"
  }
 }
 check();
 if (editid) {
  console.log('Current editid:', editid);
}

if (searchresults.length > 0) {
  console.log('Updated search results state:', searchresults);
}

setcopyorig(emps);
if (copyorigsearch.length === 0) {
  setcopyorigsearch(searchresults);
}
}, [count, editid, searchresults, copyorigsearch]);

const handleHomeclick = () =>{
  window.location.reload();
}
const handleLogoutClick = () =>{
  navigate('/')
}
const handleCreatClick = () => {
  document.querySelector('.welcomediv').style.display = "none"
  document.querySelector('.createemployeediv').style.display = "flex"
  document.querySelector('.gridcontainer').style.display = "none"
}

const handleDeleteClick = async({_id}) =>{
  try {
    const deleteemp = await axios.delete(`http://localhost:3000/deleteemp/${_id}`);
    window.location.reload();
    alert('employee deleted successfully');

}catch(err){
  console.log(err);
}
}

const handleEditClick = async({_id}) => {
  document.querySelector('.updateemployeediv').style.display = "flex"
  document.querySelector('.gridcontainer').style.display = "none"
  seteditid(_id);
  try{
    const editemp = await axios.get(`http://localhost:3000/editemp/${_id}`)
    const editdata = editemp.data;
    seteditname(editdata.UserName);
    seteditemail(editdata.Email);
    seteditcontact(editdata.MobileNo);
    seteditdesig(editdata.Designation);
    seteditgender(editdata.Gender);
    seteditcourse(editdata.Course);
    seteditimage(editdata.Image);
    console.log(editdata);
    console.log(editid);
  }catch(err){
    console.log(err);
  }
}

const handleCreateSubmit = async(e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('profile', e.target.profile.files[0]);
  formData.append('UserName', UserName);
  formData.append('Email', Email);
  formData.append('MobileNo', MobileNo);
  formData.append('Designation', Designation);
  formData.append('Gender', Gender);
  formData.append('Course', Course);
    if((username === '')||(email === '')|| (contact === '')|| (desig === '')|| (empgender === '')|| (empcourse === '')){
      alert("All fields must be field")
    }else if((contact.length > 10) || (contact.length < 10)){
      alert("Mobile No must be 10 Digits")
    }
    else{
        try {
          const response = await axios.post(`http://localhost:3000/upload/${count}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
        });
        if(response.data.alreadyexist){
          alert("already email exits!!")
         }else{
          console.log('Response:', response.data);
          window.location.reload();
          alert("employee created successfully")
         }
         } catch (error) {
        console.error('Error:', error);
        }
    }
}
const handleEditUpdate = async(e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('profile', e.target.profile.files[0]);
  formData.append('UserName', editname);
  formData.append('Email', editemail);
  formData.append('MobileNo', editcontact);
  formData.append('Designation', editdesig);
  formData.append('Gender', editgender);
  formData.append('Course', editcourse);
    if((editname === '')||(editemail === '')|| (editcontact === '')|| (editdesig === '')|| (editgender === '')|| (editcourse === '')){
      alert("All fields must be field")
    }
    else{
        try {
          const response = await axios.post(`http://localhost:3000/update/${editid}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
        });
        if(response.data.alreadyexist){
          alert("already email exits!!")
         }else{
          console.log('Response:', response.data);
          window.location.reload();
          alert("employee updated successfully")
         }
         } catch (error) {
        console.error('Error:', error);
        }
    }
}

const handlechecbox = (e) => {
 const value = e.target.value;

 if(e.target.checked){
   setempcourse([...empcourse, value]);
 }else{
  setempcourse(empcourse.filter(item => item !== value));
 }
}

const edithandlecheckbox = (e) => {
  const value = e.target.value.trim();

  let currentCourses = Array.isArray(editcourse) ? editcourse : [];
  if (e.target.checked) {
    if (!currentCourses.includes(value)) {
      seteditcourse([...currentCourses, value]);
    }
  } else {
    seteditcourse(currentCourses.filter(course => course !== value));
  }
  console.log(currentCourses);
};

 const handlecreatecontact = (e) =>{
  const value = e.target.value;
 if(value.length <= 10 && /^\d*$/.test(value)) {
  setcontact(value);
}
}

 const handleeditphone =(e)=>{
 const value = e.target.value;
 if(value.length <= 10 && /^\d*$/.test(value)) {
  seteditcontact(value);
}
 }

 const handlesearch =async(e)=>{
  e.preventDefault();
  if (query.trim().length === 0) {
    alert("Please enter at least one character to search");
    return;
  }
  try {
    const response = await axios.get('http://localhost:3000/search', {
      params: { query }
    });
    setsearchresults(response.data);
    console.log('API Response:', response.data);
    setsearchstatus(true);
    } catch (err) {
    console.log(err);
    } 
 };

 const handleSortToggle = (field) => {
  let headfield = field;

  if(!searchstatus){
    let sortedemp;
  if(sortType === 'default'){
    if(headfield === 'name'){
      sortedemp = [...emps].sort((a, b) => a.UserName.localeCompare(b.UserName));
    }else if(headfield === 'email'){
      sortedemp = [...emps].sort((a, b) => a.Email.localeCompare(b.Email));
    }else if(headfield === 'id'){
        sortedemp = [...emps].sort((a, b) => a.ID - b.ID);
    }else{
      sortedemp = [...emps].sort((a, b) => new Date(a.empDate) - new Date(b.empDate));
    }
    setsortType('asc');
  }else if (sortType === 'asc') {
    if(headfield === 'name'){
      sortedemp = [...emps].sort((a, b) => b.UserName.localeCompare(a.UserName));
    }else if(headfield === 'email'){
      sortedemp = [...emps].sort((a, b) => b.Email.localeCompare(a.Email));
    }else if(headfield === 'id'){
      sortedemp = [...emps].sort((a, b) => b.ID - a.ID);
    }else{
      sortedemp = [...emps].sort((a, b) => new Date(b.empDate) - new Date(a.empDate));
    }
    setsortType('desc');
  }else {
    sortedemp = [...copyorig];
  setsortType('default');
  }

setemps(sortedemp);
  }else{
    let searchsortedemp;
  if(sortType === 'default'){
    if(headfield === 'name'){
      searchsortedemp = [...searchresults].sort((a, b) => a.UserName.localeCompare(b.UserName));
    }else if(headfield === 'email'){
      searchsortedemp = [...searchresults].sort((a, b) => a.Email.localeCompare(b.Email));
    }else if(headfield === 'id'){
      searchsortedemp = [...searchresults].sort((a, b) => a.ID - b.ID);
    }else{
      searchsortedemp = [...searchresults].sort((a, b) => new Date(a.empDate) - new Date(b.empDate));
    }
    setsortType('asc');
  }else if (sortType === 'asc') {
    if(headfield === 'name'){
      searchsortedemp = [...searchresults].sort((a, b) => b.UserName.localeCompare(a.UserName));
    }else if(headfield === 'email'){
      searchsortedemp = [...searchresults].sort((a, b) => b.Email.localeCompare(a.Email));
    }else if(headfield === 'id'){
      searchsortedemp = [...searchresults].sort((a, b) => b.ID - a.ID);
    }else{
      searchsortedemp = [...searchresults].sort((a, b) => new Date(b.empDate) - new Date(a.empDate));
    }
    setsortType('desc');
  }else {
    searchsortedemp = [...copyorigsearch];
  setsortType('default');
  }

setsearchresults(searchsortedemp);
  }
  
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
          


{/* //*********************************************** employee list part */}
        <div className='gridcontainer'>
          <div className='searchdiv griditem1'>
            <ul>
              <li>
                <button onClick={handlesearch} className='searchIcon'><FaSearch className='fasearch_icon'/></button>
              </li>
              <li>
                <input className='searchInput' value={query} type="text" placeholder='search by name, email, desig or id' onChange={(e)=>setquery(e.target.value)}/>
              </li>
            </ul>
          </div>
          <div className='griditem2 griditem gridid gridhead headsort' onClick={()=>handleSortToggle('id')}>ID {sortType === 'default'? 'd': sortType === 'asc'? 'A':'D'}</div>
          <div className='griditem3 griditem gridhead'>Image</div>
          <div className='griditem4 griditem gridhead headsort' onClick={()=>handleSortToggle('name')}>Name {sortType === 'default'? 'd': sortType === 'asc'? 'A':'D'}</div>
          <div className='griditem5 griditem gridhead headsort' onClick={()=>handleSortToggle('email')}>Email {sortType === 'default'? 'd': sortType === 'asc'? 'A':'D'}</div>
          <div className='griditem6 griditem gridhead'>Mobile No</div>
          <div className='griditem7 griditem gridhead'>Designtion</div>
          <div className='griditem8 griditem gridhead'>Gender</div>
          <div className='griditem9 griditem gridhead'>Course</div>
          <div className='griditem10 griditem gridhead headsort'onClick={()=>handleSortToggle('date')}>Date {sortType === 'default'? 'd': sortType === 'asc'? 'A':'D'}</div>
          <div className='griditem11 griditem gridhead'>Action</div>

          {/* **************************************************************mapfunction */}
          {
            searchstatus ? searchresults.map((result, index) => (
            <React.Fragment key={index}>
              <div className='griditem griddiv gridid'>
                <p className='gridid'>{result.ID}</p>
              </div>
              <div className='griditem griddiv gridimage'>
                <img className="imageprofile" src={result.Image} alt="img" />
              </div>
              <div className='griditem griddiv'>
                <p className='gridname'>{result.UserName}</p>
              </div>
              <div className='griditem griddiv'>
                <a href={`mailto:${result.Email}`}>{result.Email}</a>
              </div>
              <div className='griditem griddiv'>
                <p className='gridcontact'>{result.MobileNo}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='griddesignation'>{result.Designation}</p>  
              </div>
              <div className='griditem griddiv'>
                <p className='gridgender'>{result.Gender}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='gridcourse'>{result.Course}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='griddate'>{result.empDate}</p>
              </div>
              <div className='griditem griddiv'>
                <span className='gridaction actionEdit' onClick={()=>handleEditClick(result)}>Edit </span>
                <span>-</span>
                <span className='gridaction actionDelete' onClick={()=>handleDeleteClick(result)}>Delete </span>
              </div>
            </React.Fragment>
            )) : 
            
            emps.map((emp, index)=>(
            <React.Fragment key={index}>
              <div className='griditem griddiv gridid'>
                <p className='gridid'>{emp.ID}</p>
              </div>
              <div className='griditem griddiv gridimage'>
                <img className="imageprofile" src={emp.Image} alt="img" />
              </div>
              <div className='griditem griddiv'>
                <p className='gridname'>{emp.UserName}</p>
              </div>
              <div className='griditem griddiv'>
                <a href={`mailto:${emp.Email}`}>{emp.Email}</a>
              </div>
              <div className='griditem griddiv'>
                <p className='gridcontact'>{emp.MobileNo}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='griddesignation'>{emp.Designation}</p>  
              </div>
              <div className='griditem griddiv'>
                <p className='gridgender'>{emp.Gender}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='gridcourse'>{emp.Course}</p>
              </div>
              <div className='griditem griddiv'>
                <p className='griddate'>{emp.empDate}</p>
              </div>
              <div className='griditem griddiv'>
                <span className='gridaction actionEdit' onClick={()=>handleEditClick(emp)}>Edit </span>
                <span>-</span>
                <span className='gridaction actionDelete' onClick={()=>handleDeleteClick(emp)}>Delete </span>
              </div>
            </React.Fragment>
            ))
          }
          
        </div>


{/* //*********************************************** create part */}
          <div className='createemployeediv'>
            <form onSubmit={handleCreateSubmit} encType="multipart/form-data">
                <table className='createTable'>
                <thead className='tablehead'><tr><td colSpan={3}>Create Employee</td></tr></thead>
                  <tbody className='createtablebody'>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Name </td>
                          <td>:</td>
                          <td><input type="text" className="createinputs" placeholder='Enter your name' value={username} onChange={(e)=>setusername(e.target.value)}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Email </td>
                          <td>:</td>
                          <td><input type="email" className="createinputs" placeholder='Enter your email' value={email} onChange={(e)=>setemail(e.target.value)}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Mobile No </td>
                          <td>:</td>
                          <td><input type="number" className="createinputs contactinput" placeholder='Enter your number' value={contact} onChange={handlecreatecontact}/></td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Designation </td>
                          <td>:</td>
                          <td>
                            <select name="designation" id="designation" className='createselect' defaultValue={desig} onChange={(e)=>setdesig(e.target.value)}>
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
                               <input type="radio" name='gender' value={"Male"} onClick={(e)=>setempgender(e.target.value)}/><span> MALE</span>   
                            </div>
                            <div className='optionitems'>
                               <input type="radio" name='gender' value={"Female"} onClick={(e)=>setempgender(e.target.value)}/><span> FEMALE</span>
                            </div>
                            
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Course </td>
                          <td>:</td>
                          <td className='coursecheckbox'>
                              <div className='optionitems'>
                                <input type="checkbox" name='course' value={'MCA'} onChange={handlechecbox}/> <span> MCA</span>
                              </div>
                              <div className='optionitems'>
                                <input type="checkbox" name='course' value={'BCA'} onChange={handlechecbox}/> <span> BCA</span>
                              </div>
                              <div className='optionitems'>
                                  <input type="checkbox" name='course' value={'BSC'} onChange={handlechecbox}/> <span> BSC</span>
                              </div>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Img Upload </td>
                          <td>:</td>
                          <td className='filetd'>
                            <input type="file" name="profile" className="loadfile" accept='.png, .jpg'/>
                          </td>
                      </tr>


                      <tr className='createtablerow createbtnrow'>
                          <td colSpan={3}>
                          <button className='submitbtn' type="submit">Sumbit</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </form>
          </div>

{/* //*********************************************** update part */}
          <div className='updateemployeediv'>
            <form onSubmit={handleEditUpdate} encType="multipart/form-data">
                <table className='createTable'>
                <thead className='tablehead'><tr><td colSpan={3}>Update Employee</td></tr></thead>
                  <tbody className='createtablebody'>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Name </td>
                          <td>:</td>
                          <td>
                            <input type="text" className="createinputs" placeholder='Enter your name'
                              value={editname} onChange={(e)=>seteditname(e.target.value)}
                            />
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Email </td>
                          <td>:</td>
                          <td>
                          <input type="email" className="createinputs" placeholder='Enter your email' value={editemail} onChange={(e)=>seteditemail(e.target.value)}/>
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Mobile No </td>
                          <td>:</td>
                          <td>
                          <input type="number" className="createinputs contactinput" placeholder='Enter your number' value={editcontact} onChange={handleeditphone} />
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Designation </td>
                          <td>:</td>
                          <td>
                            <select name="designation" id="designation" className='createselect' value={editdesig} onChange={(e)=>seteditdesig(e.target.value)}>
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
                               <input type="radio" name='gender' value={"Male"} checked={editgender === "Male" ? true : false} onChange={(e)=>seteditgender(e.target.value)}/><span> MALE</span>   
                            </div>
                            <div className='optionitems'>
                               <input type="radio" name='gender' value={"Female"} checked={editgender === "Female" ? true : false} onChange={(e)=>seteditgender(e.target.value)}/><span> FEMALE</span>
                            </div>
                            
                          </td>
                      </tr>
                      <tr className='createtablerow'>
                        <td className='leftlabel'>Course </td>
                        <td>:</td>
                        <td className='coursecheckbox'>
                          <div className='optionitems'>
                            <input type="checkbox" name='course' value={"MCA"} checked={editcourse.includes("MCA")} onChange={edithandlecheckbox}/> 
                            <span> MCA</span>
                          </div>
                          <div className='optionitems'>
                            <input type="checkbox" name='course' value={"BCA"} checked={editcourse.includes("BCA")} onChange={edithandlecheckbox}/> 
                            <span> BCA</span>
                          </div>
                          <div className='optionitems'>
                            <input type="checkbox" name='course' value={"BSC"} checked={editcourse.includes("BSC")} onChange={edithandlecheckbox}/> 
                            <span> BSC</span>
                          </div>
                        </td>
                      </tr>
                      <tr className='createtablerow'>
                          <td className='leftlabel'>Img Upload </td>
                          <td>:</td>
                          <td className='filetd'>
                          <div className='imagefile'>
                            <img className="imageprofile" src={editimage} alt="img" />
                          </div>
                            <input className="loadfile" type="file" name="profile" accept='.png, .jpg'/>
                          </td>
                      </tr>


                      <tr className='createtablerow createbtnrow'>
                          <td colSpan={3}>
                            <button className='submitbtn' type="submit">Update</button>
                          </td>
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
