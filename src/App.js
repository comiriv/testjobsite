import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route,Outlet} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import CompanyForm from './components/CompanyForm/CompanyForm';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard';
import JobForm from './components/JobForm/JobForm';
import JobDashboard from './components/JobDashboard/JobDashboard';

//npm install react-router-dom
//npm install react-bootstrap bootstrap
//npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

function App() {

  /*let [companies,setCompanies] = useState([
    {"id":1,"name":"Capital One","description":"International Banking Company"},
    {"id":2,"name":"SAIC","description":"Billion Dollar Government Contractor"}
  ]);*/

  let [companies,setCompanies] = useState([]);
  let [jobs,setJobs] = useState([]);

  const getCompanies = async () => {

    fetch("/companies")
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        return response.json();
      }
    })
    .then((data) => {
      console.log("-----Company Data App.js------");
      console.log(data);
      setCompanies(data);
    })
    .catch((err) => {
      console.log(err);
    });


  }

  const getJobs = async () => {

    fetch("/jobs")
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        return response.json();
      }
    })
    .then((data) => {
      console.log("-----Job Data App.js------");
      console.log(data);
      let mapped_data = data.map((job) => {
        if(job.company && job.company.name){
          job.company = job.company.name;
        }
        return job;
      })
      setJobs(mapped_data);
    })
    .catch((err) => {
      console.log(err);
    });


  }

  useEffect(() => {

    getCompanies();
    getJobs();

  },[]);

  

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Outlet/>}>
          <Route path="/CompanyForm/" element={<CompanyForm companies={companies} setCompanies={setCompanies}/>}/>
          <Route path="/CompanyForm/:companyid" element={<CompanyForm companies={companies} setCompanies={setCompanies}/>}/>
          <Route path="/CompanyDashboard" element={<CompanyDashboard companies={companies} setCompanies={setCompanies}/>}/>
          <Route path="/JobDashboard" element={<JobDashboard jobs={jobs} companies={companies} setJobs={setJobs}/>}/>
          <Route path="/JobForm/" element={<JobForm jobs={jobs} companies={companies} setJobs={setJobs} getJobs={getJobs}/>}/>
          <Route path="/JobForm/:jobid" element={<JobForm jobs={jobs} companies={companies} setJobs={setJobs}/>}/>
          <Route path="/Home" element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
