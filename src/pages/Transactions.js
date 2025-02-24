import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LinkVercel } from '../Link'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { IoIosArrowDropdown } from "react-icons/io";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Tab } from 'react-bootstrap';

const Transactions = () => {

    const [myDonations,setMyDonations] = useState([])

  useEffect(()=>{
     
    const getTransactions = async()=>{
        
        try{
            const response = await axios.post(`${LinkVercel}/transcations/getTransactions`,{ownerId:localStorage.getItem("profileId")})
            console.log(response)
            setMyDonations(response.data.value)
        }catch(e){

        }

    }

    getTransactions();

  },[])

  return (
    <div style={{display:"gird",placeItems:"center"}}>
            
            <Container style={{marginTop:"15px"}} >
            {
            myDonations.map((x)=>{
              return <Accordion>
                  <AccordionSummary style={{fontWeight:"100",fontSize:"20px",display:"flex",justifyContent:"space-between"}}  expandIcon ={<IoIosArrowDropdown/>}>
                    <p>Name - <span style={{fontWeight:"bold",color:"#ff7146"}}>{x.name}</span></p>
                    <p style={{marginLeft:"",fontWeight:"100"}}>  Target Amount - <span style={{fontWeight:"bold",color:"#ff7146"}}>{x.targetAmount}</span></p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table>
                       <TableHead>
                          <TableRow>
                              <TableCell>
                                 Name
                              </TableCell>
                              <TableCell>
                                 Amount
                              </TableCell>
                              <TableCell>
                                 Email
                              </TableCell>
                              <TableCell>
                                 Phone Number
                              </TableCell>
                          </TableRow>
                       </TableHead>
                       <TableBody>
                           
                           {
                             x.transactions.map((y)=>{
                               
                               return <TableRow>
                                  
                                  <TableCell>
                                    {y.donorName}
                                  </TableCell>
                                  <TableCell>
                                    {y.amount}
                                  </TableCell>
                                  <TableCell>
                                    {y.donorEmail}
                                  </TableCell>
                                  <TableCell>
                                    {y.donorNumber}
                                  </TableCell>

                               </TableRow>

                             })
                           }

                       </TableBody>
                    </Table>
                     
                  </AccordionDetails>
              </Accordion>
            })
          }


            </Container>
           
    </div>
  )
}

export default Transactions