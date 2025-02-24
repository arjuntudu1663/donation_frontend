
import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField , Button, Paper, Chip, Divider } from '@mui/material';
import {Card, Row,Col, Container,Modal} from 'react-bootstrap'
import {LinkVercel} from '../Link';
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheck } from "react-icons/fa";
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { useParams } from 'react-router-dom';

const LinkHome = () => {
   
    const {link} = useParams()
    
    const [x,setX] = useState({
            id:"",
            completed:false,
            creator: "",
            currentAmount : "",
            link : "",
            targetAmount : 0,
            transactions: [],
            name : "",
            progress: 0,

    })


        const [donateFormModal,setDonateFormModal] = useState(false)
        const [currDonationId,setCurrDonationId] = useState(null)
        const [loading,setLoading] = useState(false)
        const [doneText,setDoneText] = useState(false)

    const [transaction,setTransaction] = useState({
          donorName:"",
          donorEmail:"",
          donorNumber:"",     
          theDonationId:"",
          amount:0,
          date:"",
          
        })
    
    const donating = async()=>{
       
        try{
          setLoading(true)
          const response = await axios.post(`${LinkVercel}/transcations/donating`,{...transaction,theDonationId:currDonationId});
          if(response.status === 200){
            setLoading(false);
            setTransaction((prev)=>{
              return {...prev, donorName:"",donorEmail:"", theDonationId:"",  amount:0, date:"",}
            })
            setDoneText(true)
            setCurrDonationId(null);
            window.location.reload();
          }
        }catch(e){
  
        }
  
      }
  

    useEffect(()=>{

          const getDonationByLink = async() =>{

             console.log("triggered")
            
             try{
                const response = await axios.post(`${LinkVercel}/donations/getDonationByLink`,{thelink:link})
                console.log(response)
                setX((prev)=>{
                  return {...prev,name:response.data.value.name,
                    targetAmount:response.data.value.targetAmount,
                    progress:response.data.value.progress,
                    months:response.data.value.months,
                    id:response.data.value._id
                  
                  }
                })
               
            }catch(e){

            }

          }

          getDonationByLink();

    },[])
     
  return (
    <>
    <div style={{width:"100%",display:"grid",placeItems:"center"}}>
        
        <div style={{width:"30%",display:"flex",marginTop:"10%"}}>
         <Button variant='contained' color='error' onClick={e=>window.location.href="/"}>Back</Button>
        </div>
         <p></p>
        <Card style={{width:"30%"}}>
                         <Card.Header style={{fontWeight:"bold",backgroundColor:"white",color:"#ff7146"}}>
                          
                           <div>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                
                              <p style={{fontSize:"25px"}}> {x.name}</p>
                              <p></p>
                              </div>
                         <p></p>
                          <Paper elevation={5} style={{display:"",padding:"15px",justifyContent:"space-between",alignItems:"center"}}>
                         <div style={{display:"flex",justifyContent:"space-between"}}>
                         Target Amount :  <h4 style={{color:"#ff7146"}}>{x.targetAmount}</h4>
                         </div>
                          <p></p>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          progress completed :   <CircularProgress  size="lg" determinate value={x.progress}>
                                                         <Typography>{parseInt(x.progress)}%</Typography>
                                                  </CircularProgress> 
                          </div>
                          </Paper>
                           </div>
                         <p></p>
                         </Card.Header>
                      
                       
                       <Card.Body style={{backgroundColor:"#ff7146",color:"white"}}>
                            <h1>Donate Towards Child's Education for {x.months}</h1>
                       </Card.Body>

                      <Card.Footer style={{padding:"15px"}}>
                        <Button onClick={(e)=>{
                          setDonateFormModal(true)
                          setCurrDonationId(x.id)
                        }} style={{padding:"15px",borderRadius:"40px",backgroundColor:"#ff7146",color:"white",fontWeight:"bold"}}>Donate</Button>
                        <Button variant='outlined' style={{padding:"15px",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",fontWeight:"bold",marginLeft:"15px",borderColor:"#ff7146"}}>view more</Button>
                      </Card.Footer>
       </Card>
        
        
        </div>
        
         <Modal show = {donateFormModal} onHide = {(e)=>{
          setDonateFormModal(!donateFormModal)
          setDoneText(false)
         }} >
            <Modal.Header closeButton>
            </Modal.Header>
                 <Modal.Body>
                     
                      <p style={{fontWeight:"bold"}}>Full Name </p>
                     <p></p>
                     <TextField value = {transaction.donorName} onChange={e=>setTransaction((prev)=>{
                      return {...prev,donorName:e.target.value}
                     })} style={{width:"100%"}}/>
                     <p></p>
                     <Row>
                       <Col lg = {6}>
                       <p style={{fontWeight:"bold"}} >Email Address </p>
                     <p></p>
                     <TextField  value = {transaction.donorEmail} onChange={e=>setTransaction((prev)=>{
                        return {...prev,donorEmail:e.target.value}
                       })} style={{width:"100%"}}/>
                       
                       </Col>
                       <Col lg = {6}>
                       <p style={{fontWeight:"bold"}}>Phone Number </p>
                     <p></p>
                     <TextField  value = {transaction.donorNumber} onChange={e=>setTransaction((prev)=>{
                      return {...prev,donorNumber:e.target.value}
                     })} style={{width:"100%"}}/>
                       </Col>
                     </Row>
                     <Divider/>
                     <p></p>
                     <p style={{fontWeight:"bold"}}>Donation Amount </p>
                     <p></p>
                     <TextField  value = {transaction.amount}  onChange={e=>setTransaction((prev)=>{
                      return {...prev,amount:parseInt(e.target.value)}
                     })}   type='number' style={{width:"100%"}}/>

                 </Modal.Body>
                 <Modal.Footer style={{display:"flex",justifyContent:"space-between"}}>
                 <Button onClick={donating} style={{padding:"15px",borderRadius:"40px",backgroundColor:"#ff7146",color:"white",fontWeight:"bold"}}>{loading?"Donating":"Donate"} </Button>
                    <div>  {
                      loading?<ClipLoader
                     
                      loading={loading}
                      
                      size={50}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    :<>{doneText?<Button variant='outlined' style={{padding:"15px",borderColor:"#ff7146",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",fontWeight:"bold"}}>Done <FaCheck/></Button>:<></>}</>
                      }
                    </div>
                 </Modal.Footer>
            
         </Modal>
        </>
  )
}

export default LinkHome