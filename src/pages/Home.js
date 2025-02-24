import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { LinkVercel } from '../Link';
import { Chip , TextField} from '@mui/material';
import Dashboard from './Dashboard';
import { Container, Modal } from 'react-bootstrap';
import Transactions from './Transactions';
import { RiMenuFold3Line } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Home = () => {

    const [screen,setScreen] = useState("dashboard")
    const location = useLocation();
    const [drawerFlag,setDrawerFlag] = useState(false)
    const [modalFlag,setModalFlag] = useState(false)
    let element ;

    const [profile,setProfile] = useState({
        username:"",
        name:"",
        donations:[],
        panNumber:""
    })

    const [link,setLink] = useState(null);

   

    const [dontationData,setDonationData] = useState({
  
                name:"",
                creator:location.state.profile,
                targetAmount:0,
                currentAmount:0,
                months:0,
                progress:0,
                transactions:[],
                completed:false,
                
                 
              
    })

    switch(screen){
         case "dashboard":
            element = <h1><Dashboard/></h1>
            break;
        case "transactions":
            element = <h1><Transactions/></h1>
            break;
    }


    const createDonation = async() => {
         
        try{
            const response = await axios.post(`${LinkVercel}/donations/create`,{...dontationData,link:link})
            if(response.status === 200){
                setModalFlag(false)
                setDonationData((prev)=>{
                    return {...prev,name:"",targetAmount:0}
                })
                setLink(null)
            }
        }catch(e){

        }

    }
   
    const generateLink = () => {
         
 
        setLink(Math.random().toString(36).slice(2, 100))

    }

   useState(()=>{
      console.log(location.state.profile,"<======= curr profile")
    const getProfile = async()=>{ 
        try{
            const response = await axios.post(`${LinkVercel}/user/getProfile`,{id:location.state.profile._id})
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

    getProfile();

   },[])

  return (
    <>
    <div style={{backgroundColor:"#dedede",height:"100vh",padding:""}}>
        
           <div style={{width:"100%",backgroundColor:"white"}}>
           <Container>
                <div style={{width:"100%",position:"",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"white",padding:"15px",zIndex:1}}>
            
            <div>
                <Button onClick={e=>setDrawerFlag(true)}><RiMenuFold3Line color='#ff7146' size={50}/></Button>  
            
            
                <Button onClick={(e)=>{ return setModalFlag(true) }} variant='outlined' style={{padding:"15px",borderRadius:"40px",backgroundColor:"white",color:"#ff7146",fontWeight:"bold",marginLeft:"15px",borderColor:"#ff7146"}}>Create Dontations</Button>
            
            
                </div>

            <div style={{display:"",gap:"15px"}}>
                     <div style={{display:"flex",alignItems:"center"}}>
                     <h2 style={{fontWeight:"100"}}>{profile.username.toUpperCase()}</h2><Button color='error' onClick={e=>window.location.href = "/"}><RiLogoutCircleRLine size={30} color='error'/></Button>
                     </div>
                    <p></p>
                    <Button style={{backgroundColor:"#ff7146",color:"white",borderRadius:"15px",padding:"10px"}} variant='outlined' color='success'>Fundraiser</Button>  

            </div>

            </div>
         </Container>
           </div>
        
         {element}
   
   
    </div>
    <Drawer open = {drawerFlag}>
      
       <div style={{width:"250px"}}>

       <List style={{marginTop:"200px"}}>
    <ListItem  >
         <ListItemButton style={{backgroundColor:"#ff7146",color:"white",borderRadius:"15px",padding:"30px"}} onClick={(e)=>{    
         setScreen("dashboard") 
         setDrawerFlag(false)}}
             >

<p style={{fontWeight:"bold"}}>Dashboard</p>
           <ListItemText   />
         </ListItemButton>
       </ListItem>

       <ListItem  >
         <ListItemButton style={{backgroundColor:"#ff7146",color:"white",borderRadius:"15px",padding:"30px"}} onClick={(e)=>{    
         setScreen("transactions") 
         setDrawerFlag(false)}}
             >
                 
               <p style={{fontWeight:"bold"}}>Transactions</p>
           <ListItemText   />
         </ListItemButton>
       </ListItem>
   </List>

       </div>
 
 
    </Drawer>

    <Modal onHide={e=>setModalFlag(false)} show = {modalFlag} >
          <Modal.Header closeButton>
                  Donations
          </Modal.Header>
          <Modal.Body>
                
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"bold"}}>
                
                Dontation Name - <TextField style={{width:"60%"}} value={dontationData.name} onChange={e=>setDonationData((prev)=>{
                    return {...prev,name:e.target.value}
                })} placeholder='name'/>
                
            </div>
               
               <p></p>
               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                 
                 <div style={{fontWeight:"bold"}}>Target Amount - </div> <TextField type='number' value={dontationData.targetAmount} style={{width:"60%"}} onChange={e=>setDonationData((prev)=>{
                    return {...prev,targetAmount:e.target.value}
                })}  placeholder='Amount'/>
          
           </div>
            <p></p>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                 
                 <div> <Button onClick={generateLink} variant='outlined' style={{padding:"15px",borderRadius:"45px",color:"#ff7146",borderColor:"#ff7146"}}>Generate Link</Button></div> <TextField value = {link} style={{width:"60%"}} placeholder='link'/>
          
           </div>
          
               
          </Modal.Body>
          <Modal.Footer>
            <Button variant='conatined' onClick={createDonation} style={{padding:"15px",borderRadius:"40px",backgroundColor:"#ff7146",width:"100%",color:"white",fontWeight:"bold",marginLeft:"15px",borderColor:"#ff7146"}}>Create</Button>
          </Modal.Footer>
    </Modal>
    </>
  )
}

export default Home