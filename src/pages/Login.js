
import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField , Button, Paper, Chip, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {Card, Row,Col, Container,Modal} from 'react-bootstrap'
import {LinkVercel} from '../Link';
import ClipLoader from "react-spinners/ClipLoader";
import { FaCheck } from "react-icons/fa";
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { RxCross1 } from "react-icons/rx";


const Login = () => {

    const navigate = useNavigate();
    const [flag,setFlag] = useState("login")
   
    const [bringLogin,setBringLogin] = useState(false)
    const [allDonations,setAllDonations] = useState([])

    const [modalDetails,setModalDetails] = useState(false)
    const [detailsCurrDonation,setDetailCurrDonation] = useState({
      name:"",transactions:[],targetAmount:0,progress:0,completed:"",remaning:0
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

    const [loginDetails,setLoginDetails] = useState({
      username:"",
      password :""
    })
    const [registerDetails,setRegisterDetails] = useState({
      username:"",
      password :"",
      re_password:""
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


    const register_org = async function(){
        
        try{
            if(registerDetails.password === registerDetails.re_password){
            
                const response = await axios.post(`${LinkVercel}/user/register`,{username:registerDetails.username,password:registerDetails.password});
                
                if(response.data.flag){
                    setFlag("login")
                }
      
            }
        }catch(e){

        }
  
    }
  
    const login_org = async function(){
          
      
             
        try{
            
            const response = await axios.post(`${LinkVercel}/user/login`,{username:loginDetails.username,password:loginDetails.password});
             if(response.data.flag){
                
                navigate("/home",{state:{"profile":response.data.value}})
                localStorage.setItem("profileId",response.data.value._id)

             }
        }catch(e){

        }
             
  
        
         
    }
    
    
    const detailsShow =  async (id) => {
      setModalDetails(true)
      try{
        const response = await axios.post(`${LinkVercel}/donations/getDonation`,{donationId:id})
        console.log(response)
        setDetailCurrDonation((prev)=>{
          return {...prev, name:response.data.value.name,
            transactions:response.data.value.transactions,
            targetAmount:parseInt(response.data.value.targetAmount),
            progress:parseInt(response.data.value.progress),
            completed:response.data.value.completed,
            remaning: parseInt(response.data.value.targetAmount - ((response.data.value.progress*response.data.value.targetAmount)/100))
          }
        })
      }catch(e){

      }
      
  
       
    }

    let element ; 

    switch(flag){
        
      case "login":
        element = <Card style={{padding:"15px"}}>
         
         <Card.Header style={{display:"flex",justifyContent:"space-between",color:"#ff7146"}}>  <h1>Login</h1> <Button onClick={e=>setBringLogin(false)}><RxCross1 color='#ff7146' size={30}/></Button> </Card.Header>
         <Card.Body>
        <TextField  onChange={e=>setLoginDetails((prev)=>{
          return {...prev,username:e.target.value}
        })} id="filled-basic" label="username" variant="filled" style={{width:"100%"}} />
   
       <p></p>
       <TextField onChange={e=>setLoginDetails((prev)=>{
          return {...prev,password:e.target.value}
        })} id="filled-basic" label="password" variant="filled" style={{width:"100%"}} />
        <p></p>
         </Card.Body>
        <Card.Footer>
        
        <Button onClick={login_org} variant='contained' style={{padding:"15px",borderRadius:"40px",backgroundColor:"#ff7146",color:"white",fontWeight:"bold",marginLeft:"",width:"100%"}}>Login</Button>
        <p></p>
        <Button variant='link'  onClick={e=>setFlag("register")}>Don't Have A Account?</Button>
        <p></p>
       
        </Card.Footer>
         </Card>
         break;
  
      case "register":
  
      element=<Card style={{padding:"15px"}}>
       <Card.Header style={{display:"flex",justifyContent:"space-between"}}>  <h1>Register</h1>  <Button onClick={e=>setBringLogin(false)}><RxCross1 color='#ff7146' size={30}/></Button> </Card.Header>
        <p></p>
        <TextField onChange={e=>setRegisterDetails((prev)=>{
          return {...prev,username:e.target.value}
        })} id="filled-basic" label="username" variant="filled" style={{width:"100%"}} />
      <p></p>
      <TextField onChange={e=>setRegisterDetails((prev)=>{
          return {...prev,password:e.target.value}
        })} id="filled-basic" label="password" variant="filled" style={{width:"100%"}} />
      <p></p>
      <TextField onChange={e=>setRegisterDetails((prev)=>{
          return {...prev,re_password:e.target.value}
        })} id="filled-basic" label="re_password" variant="filled" style={{width:"100%"}} />
      <p></p>
      <Card.Footer>
      <Button onClick={register_org} variant='outlined' style={{padding:"15px",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",borderColor:"#ff7146",fontWeight:"bold",marginLeft:"",width:"100%"}}>Register</Button>
      <p></p>
      <Button variant='link' onClick={e=>setFlag("login")}>Already Have A Account?</Button>
   
    
      
       
      </Card.Footer>
  
       </Card>
       break;
         
   
  
    }
 
    useEffect(()=>{
      
      const allDonations = async()=>{ 
          try{
            const response = await axios.get(`${LinkVercel}/donations/allDonations`)
            setAllDonations(response.data.value)
          }catch(e){

          }
      }
    allDonations();
    },[])

  return (
    <div style={{width:"100%",display:"grid",placeItems:"center"}}>
          <div style={{width:"100%",padding:"30px",backgroundColor:"#ff7146"}}>
             <Container style={{display:"flex",justifyContent:"space-between",backgroundColor:"#ff7146"}}>
             <div><h1 style={{fontWeight:"bold",color:"white"}}>DonateHere</h1></div>
          
          <Button onClick={e=>setBringLogin(!bringLogin)} style={{padding:"15px",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",fontWeight:"bold"}}>Login</Button>
             </Container>
          </div>
      

       
         <Container style={{width:"100%",height:"100%",padding:""}}>

                <Row>
                   {
                    allDonations.map((x)=>{
                      return  <Col lg = {4} style={{padding:"30px"}}>
                      <Card>
                         <Card.Header style={{fontWeight:"bold",backgroundColor:"white",color:"#ff7146"}}>
                        
                           <div>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                
                              <p style={{fontSize:"25px"}}> {x.name?x.name:<></>}</p>
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
                            <h1>Donate With Us</h1>
                       </Card.Body>

                      <Card.Footer style={{padding:"15px"}}>
                        <Button onClick={(e)=>{
                          setDonateFormModal(true)
                          setCurrDonationId(x._id)
                        }} disabled = {x.completed} style={{padding:"15px",borderRadius:"40px",backgroundColor:"#ff7146",color:"white",fontWeight:"bold"}}>{x.completed?"Completed":"Donate"}</Button>
                        <Button onClick={e=>detailsShow(x._id)}  variant='outlined' style={{padding:"15px",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",fontWeight:"bold",marginLeft:"15px",borderColor:"#ff7146"}}>view more</Button>
                      </Card.Footer>
                      </Card>
                      </Col>
                    })
                   }
                </Row>

         </Container>

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

         <Modal show = {bringLogin}>
              
              <Modal.Body>
              {element}
              </Modal.Body>

         </Modal>

         <Modal onHide={e=>setModalDetails(false)} show = {modalDetails}>
              <Modal.Header closeButton>
              <h5 style={{fontWeight:"100"}}> Name -   <span style={{fontWeight:"bold",color:"#ff7146"}}>{detailsCurrDonation.name}</span></h5>
              </Modal.Header>
                 <Modal.Body>
                  <h5 style={{fontWeight:"100"}}> Target Amount -   <span style={{fontWeight:"bold",color:"#ff7146"}}>{detailsCurrDonation.targetAmount}</span></h5>
                    <p></p>
                 
                    <h5 style={{fontWeight:"100"}}> Remaining Amount-   <span style={{fontWeight:"bold",color:"#ff7146"}}>{detailsCurrDonation.remaning}</span></h5>
                   <p></p>

                    <Accordion>
                      <AccordionSummary> Payers  </AccordionSummary>
                        <AccordionDetails>
                          {
                            detailsCurrDonation.transactions.map((x)=>{
                              return <Card style={{padding:"15px",marginBottom:"15px"}}> <h5 style={{fontWeight:"100",color:"#ff7146"}}> {x.donorName} -  <span style={{fontWeight:"bold"}}>{x.amount}</span></h5></Card>
                            })
                          }
                        </AccordionDetails>
                    
                    </Accordion>
                 

                 </Modal.Body>

              
         </Modal>
        
    </div>
  )
}

export default Login