import React,{useCallback} from 'react'
import {Container} from 'react-bootstrap';
import DashboardTable from '../DashboardTable/DashboardTable';
import './JobDashboard.css';

const JobDashboard = ({jobs,setJobs,companies}) => {

  const orderByDefault = "title";
  const orderDefault = "asc";
  const tablename = "Job";
  const formLink = "/JobForm/";
  
  const columns = [
    { field: 'title', 
      headerName: 'title', 
      width: 180 
    },
    {
      field: 'description',
      headerName: 'description',
      width: 280,
    },
    {
      field: 'minSalary',
      headerName: 'minSalary',
      width: 150,
    },
    {
      field: 'maxSalary',
      headerName: 'maxSalary',
      width: 150,
    },
    {
      field: 'location',
      headerName: 'location',
      width: 150,
    },
    {
      field: 'company',
      headerName: 'company',
      width: 150,
    }
  ];

  const deleteJob = useCallback((id,jobs) => {

    //Fetch call to create new Company
    fetch("/jobs/"+id,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json; charset=UTF-8",
      }
    })
    .then((response) => {
      console.log("---------Response------");
      console.log(response);
      if(response.status == 201){
        return response;
      }
    })
    .then((data) => {
      console.log("----------Deleted Jobs------")
      console.log(data);
      console.log("-------------------Jobs--------------");
      console.log(jobs);
      let newJobs = jobs.filter((entry) => {return entry.id != id})
      setJobs(newJobs);
    })
    .catch((err) => {
      console.log(err);
      //setCompanies([companyFormData,...companies]);
      //navigate("/CompanyDashboard");
    });

  },[]);

  
 return (
    <Container className="jobdashboard">
        <DashboardTable 
            tablename={tablename} 
            columns={columns}
            rows={jobs}
            orderByDefault={orderByDefault} 
            orderDefault={orderDefault}
            formLink={formLink}
            deleteFunction={deleteJob}
        />
    </Container>
 )

}

export default JobDashboard