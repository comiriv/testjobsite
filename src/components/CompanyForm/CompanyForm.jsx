import React from 'react';
import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container,Row,Col} from 'react-bootstrap';
import { useParams,useNavigate} from 'react-router-dom';
import './CompanyForm.css';



const CompanyForm = ({companies,setCompanies}) => {

  let navigate = useNavigate();
  let {companyid} = useParams();

  const [companyFormData,setCompanyFormData] = useState({
    "name":"",
    "description":""
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {

    if(companyid){
      fetch("/companies/"+companyid)
      .then((response) => response.json())
      .then((data) => {
        console.log("-----Company Data for Form------");
        console.log(data);
        setCompanyFormData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    
  },[]);

  let handleChange = (e) => {
    let {name,value} = e.target;
    setCompanyFormData(
      {...companyFormData,
        [name]:value
      }
    )
  }

  let handleCancel = (e) => {
    navigate("/CompanyDashboard");
  }

  let handleSubmit = (e) => {
    
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
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      
      if(companyid){
        console.log("Submitted Edit Form");

        //Fetch call to edit existing Company
        //Fetch call to create new Company
        fetch("/companies/"+companyid,{
          method:"PUT",
          body:JSON.stringify(companyFormData),
          headers:{
            "Content-type":"application/json; charset=UTF-8",
          }
        })
        .then((response) => {
          console.log("---------Response------");
          console.log(response);
          if(response.status === 200){
            return response;
          }
        })
        .then((data) => {
          console.log("----------Update Company with ID:"+companyid+"------")
          console.log(data);
          
          var newCompanies = companies.map((company) => {
            if(company.id==companyid){
              company.name = companyFormData.name;
              company.description = companyFormData.description;
            }
            return company;
          });

          console.log("-----------New Companies------------");
          console.log(newCompanies);
          setCompanies(newCompanies);
          navigate("/CompanyDashboard");
        })
        .catch((err) => {
          console.log(err);
          //setCompanies([companyFormData,...companies]);
          //navigate("/CompanyDashboard");
        });

      }
      else{
        console.log("Submitted New Form");

        //Fetch call to create new Company
        fetch("/companies",{
          method:"POST",
          body:JSON.stringify(companyFormData),
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
          console.log("----------Added New Company------")
          console.log(data);
          setCompanies([...companies,data]);
          navigate("/CompanyDashboard");
        })
        .catch((err) => {
          console.log(err);
          //setCompanies([companyFormData,...companies]);
          //navigate("/CompanyDashboard");
        });

      }

    }
    



    ///////////////////////////////////////////
    
  }

  
  return (
    <Container className="companyform">
      <h4>Company Form: {companyid}</h4>
      <Form noValidate id="companyform" validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control required name="name" type="text" value={companyFormData.name} onChange={handleChange} placeholder="Enter name" />
          <Form.Control.Feedback type="invalid">Enter name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control required as="textarea" rows="3" value={companyFormData.description} name="description" onChange={handleChange} placeholder="Enter Description" />
          <Form.Control.Feedback type="invalid">Enter description</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="danger" type="cancel" onClick={handleCancel}>Cancel</Button>
      </Form>
    </Container>
  )
}

export default CompanyForm