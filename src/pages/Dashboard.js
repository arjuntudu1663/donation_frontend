import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { LinkVercel } from '../Link'
import { useLocation } from 'react-router-dom'
import {Row,Col, Card,Container} from 'react-bootstrap'
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { TextField,Button ,Paper} from '@mui/material'
import { IoStarSharp } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { RiMenuFold3Line } from "react-icons/ri";
import copy from 'copy-to-clipboard';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { RiFolderSharedFill } from "react-icons/ri";

const Dashboard = ({id}) => {

  const location = useLocation();
  
   const [profile,setProfile] = useState({
          username:"",
          name:"",
          donations:[],
          panNumber:""
      })
      const message = "Hello! Check out this awesome content!";
      const url = "http://localhost:3000/home";
 
   
    const [donations,setDonations] = useState([]);


    const copyLink = function(text){
      copy(text)
      alert(`${text} (copied)`)
    }
  
      useEffect(()=>{
             
    const getProfile = async()=>{ 
      try{
          const response = await axios.post(`${LinkVercel}/user/getProfile`,{id:localStorage.getItem("profileId")})
          console.log(response,"<== get profile response")

          if(response.data.flag){
              
              setProfile((prev)=>{
                  return {...prev,username:response.data.value.username,
                      panNumber:response.data.value.panNumber,
                      donations:response.data.value.donations
                  }
              })
          }

      }catch(e){

      }
     }

     const getDonations = async () => {
           
      try{
         
        const response = await axios.post(`${LinkVercel}/donations/getDonations`,{ownerId:localStorage.getItem("profileId")});
        console.log(response,"<=== all donations")
        setDonations(response.data.value)

      }catch(e){

      }
       
     }

  getProfile();
  getDonations();
      },[])

  return (
    <div>
      
      <div style={{padding:"50px"}}>
                    
                    <div style={{width:"100%",height:"100%",position:"relative",marginTop:""}}>
                              
                                <div style={{position:"absolute",zIndex:"1",width:"100%",height:"100%",display:"grid",placeItems:"center"}}>
                                    
                                    <div style={{height:"50px"}}>
                                    <h1 style={{color:"red",fontSize:"50px"}}>{profile.username}</h1>
                                    <p style={{color:"white",fontSize:"30px",fontWeight:"bold"}}>Initial Push is the toughest!Go through the learning modules,or reach out to your fundraising manager to level up</p>
                                    </div>
                                
                                </div>
                                 <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <div></div>
                                   
    
                                 </div>
                                 <p></p>
                                <img style={{width:"100%",height:"70vh",objectFit:"cover",position:"absoulte",opacity:"0.6",borderRadius:"20px"}} src = {"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D"}/>
                                
                    </div>
    
                    <div style={{width:"100%",display:"grid",placeItems:"center"}}>

                    <Container style={{marginTop:"180px"}}>
                               
                   
                               
                               {
                              
                              donations.map((x)=>{
                              return <Row style={{height:"100%",width:"100%",backgroundColor:"",border:"1px solid",borderColor:"#ff7146",marginBottom:"30px",borderRadius:"15px"}}>
                               <Col lg = {6} sm = {12} style = {{padding:"50px"}}>
                                         
                                    <CircularProgress  size='lg' determinate value={x.progress}>
                                      <Typography>{parseInt(x.progress)}%</Typography>
                                    </CircularProgress>      
                                      <p></p>
                                     <h1 style={{fontWeight:"100"}}>Target Amount - <span style={{fontWeight:"bold",color:"#ff7146"}}>{x.targetAmount}</span></h1>
                                          
                                          
                                        
                              </Col>

                              <Col lg = {6} sm ={12} style={{padding:"",display:"grid",placeItems:"center"}}>

                              <h1 style={{fontWeight:"100"}}>Level Acheived:<span style={{fontWeight:"bold",color:"#ff7146"}}>Star</span></h1>
                              <hr></hr>
                              <div >
                                <Button style={{fontWeight:"bold",backgroundColor:"#ff7146",color:"white",padding:"15px"}}><IoStarSharp size={30} color='white'/>Rewards</Button>
                                <Button style={{fontWeight:"bold",backgroundColor:"#ff7146",color:"white",marginLeft:"15px",padding:"15px"}} onClick={e=>copyLink(`https://donation-backend-ten.vercel.app/${x.link}`)}><FaRegCopy size={30} color='white'/>Copy Donation Link</Button>
                                <WhatsappShareButton
                                    url={`https://donation-backend-ten.vercel.app/${x.link}`} // Ensure the URL is passed
                                    title={message} // Optional: Use a custom message
                                    separator=" " // Optional: to separate the title from the URL in the message
                                  >
                                   <Button style={{fontWeight:"bold",backgroundColor:"white",borderColor:"#ff7146",color:"#ff7146",padding:"15px"}} variant='outlined'><IoStarSharp size={30} color='white'/><RiFolderSharedFill color='#ff7146' size={30} style={{marginRight:"5px"}} />Share On Whatsapp</Button>
                               </WhatsappShareButton>
                              </div>
                              </Col>
                             
                               <p></p>
                              </Row>       
                              
                          })
                          }
                            
                            
                  </Container>

                    </div>

                 
    
       </div>

            
    </div>
  )
}

export default Dashboard