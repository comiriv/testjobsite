import React, { useCallback} from 'react'
import {Container} from 'react-bootstrap';
import DashboardTable from '../DashboardTable/DashboardTable';
import './CompanyDashboard.css';


const CompanyDashboard = ({companies,setCompanies}) => {

  console.log(companies);

  const orderByDefault = "name";
  const orderDefault = "asc";
  const tablename = "Company";
  const formLink = "/CompanyForm/";
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    {
      field: 'description',
      headerName: 'Description',
      width: 280,
    }
  ];

  const deleteCompany = useCallback((id,companies) => {

    //Fetch call to create new Company
    fetch("/companies/"+id,{
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
      console.log("----------Deleted Companies------")
      console.log(data);
      console.log("-------------------Companies--------------");
      console.log(companies);
      let newCompanies = companies.filter((entry) => {return entry.id != id})
      setCompanies(newCompanies);
    })
    .catch((err) => {
      console.log(err);
      //setCompanies([companyFormData,...companies]);
      //navigate("/CompanyDashboard");
    });

  },[]);

  
 return (
    <Container className="companydashboard">
        <DashboardTable 
            tablename={tablename} 
            columns={columns}
            rows={companies}
            orderByDefault={orderByDefault} 
            orderDefault={orderDefault}
            formLink={formLink}
            deleteFunction={deleteCompany}
        />
    </Container>
 )
}

export default CompanyDashboard