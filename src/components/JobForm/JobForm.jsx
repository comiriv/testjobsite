import React from 'react';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container,Row,Col} from 'react-bootstrap';
import { useParams,useNavigate} from 'react-router-dom';
import './JobForm.css';



const JobForm = ({jobs,companies,setJobs,getJobs}) => {

  let navigate = useNavigate();

  const [jobFormData,setFormData] = useState({
    "title":"",
    "description":"",
    "minSalary":"",
    "maxSalary":"",
    "location":""
  });

  const [validated, setValidated] = useState(false);

  let handleChange = (e) => {
    let {name,value} = e.target;
    if(name === "companyId"){
      value = Number(value);
    }
    setFormData(
      {...jobFormData,
        [name]:value
      }
    )
  }

  useEffect(() => {

    if(jobid){
      console.log("jobid: "+jobid);
      fetch("/jobs/"+jobid)
      .then((response) => response.json())
      .then((data) => {
        console.log("-----Job Data for Form------");
        console.log(data);
        setFormData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    
  },[]);

  let handleCancel = (e) => {
    navigate("/JobDashboard");
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(jobFormData);

    //Update Job Information
    /*let jobFormData = {"title":e.target[0].value,
               "description":e.target[1].value,
               "minSalary":e.target[2].value,
               "maxSalary":e.target[3].value,
               "location":e.target[4].value,
               "companyId":Number(e.target[5].value)
    }
    console.log(job);*/

    //Add functionality to update jobs database

    ///////////////////////////////////////////
    //navigate("/");

    //Add functionality to update jobs database
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      
      if(jobid){
        console.log("Submitted Edit Form");

        const submitData = {
          "title":jobFormData.title,
          "description":jobFormData.description,
          "minSalary":jobFormData.minSalary,
          "maxSalary":jobFormData.maxSalary,
          "location":jobFormData.location
        }

        console.log(submitData);

        //Fetch call to edit existing Company
        //Fetch call to create new Company
        fetch("/jobs/"+jobid,{
          method:"PUT",
          body:JSON.stringify(submitData),
          headers:{
            "Content-type":"application/json; charset=UTF-8",
          }
        })
        .then((response) => {
          console.log("---------Job Edit Form Response------");
          console.log(response);
          if(response.status === 200){
            return response;
          }
        })
        .then((data) => {
          console.log("----------Update Job with ID:"+jobid+"------")
          var newJobs = jobs.map((job) => {
            if(job.id==jobid){
              job.name = jobFormData.name;
              job.description = jobFormData.description;
            }
            return job;
          });
          setJobs([...jobs,data]);
          navigate("/JobDashboard");
        })
        .catch((err) => {
          console.log(err);
          //setCompanies([companyFormData,...companies]);
          //navigate("/CompanyDashboard");
        });

      }
      else{
        console.log("Submitted New Form");
        const submitData = {
          "title":jobFormData.title,
          "description":jobFormData.description,
          "minSalary":jobFormData.minSalary,
          "maxSalary":jobFormData.maxSalary,
          "location":jobFormData.location,
          "companyId":jobFormData.companyId
        }

        //Fetch call to create new Company
        fetch("/jobs",{
          method:"POST",
          body:JSON.stringify(submitData),
          headers:{
            "Content-type":"application/json; charset=UTF-8",
          }
        })
        .then((response) => {
          console.log("---------Response------");
          console.log(response);
          if(response.status == 201){
            return response.json();
          }
        })
        .then((data) => {
          console.log("----------Added New Jobs------");
          getJobs();
          navigate("/JobDashboard");
        })
        .catch((err) => {
          console.log(err);
          //setCompanies([companyFormData,...companies]);
          //navigate("/CompanyDashboard");
        });

      }

    }

  }

  let {jobid} = useParams();
  return (
    <Container className="jobform">
      <h4>Job Form</h4>
      <Form noValidate id="jobform" validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={jobFormData.title} onChange={handleChange} placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" value={jobFormData.description} onChange={handleChange} placeholder="Enter Description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMinSalary">
          <Form.Label>Minimum Salary</Form.Label>
          <Form.Control name="minSalary" onChange={handleChange} value={jobFormData.minSalary} placeholder="Enter minSalary" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMaxSalary">
          <Form.Label>Maximum Salary</Form.Label>
          <Form.Control name="maxSalary" onChange={handleChange} value={jobFormData.maxSalary} placeholder="Enter maxSalary" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" onChange={handleChange} value={jobFormData.location} placeholder="Enter location" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCompany">
          <Form.Label>Company</Form.Label>
          {!jobid ? 
          <Form.Select name="companyId" onChange={handleChange} value={jobFormData.companyId} aria-label="Default select example">
              {companies.length > 0 ? companies.map((company) => {
                  return (<option value={company.id}>{company.name}</option>)
                }) : <option value="0">(None)</option>
              }
          </Form.Select> : <div>{jobFormData.company ? jobFormData.company.name : ""}</div>
          }
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default JobForm