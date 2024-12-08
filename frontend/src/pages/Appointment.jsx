import React, { useContext,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment =()=>{

  const {docID} =useParams()
  const {doctors} = useContext(AppContext)
  const [doctInfo,setDoctInfo] = useState(null)
 
  useEffect(() => { const fetchDocInfo = async () => { 
    console.log(doctors)
    console.log("doctor id :: "+docID)
    if (doctors) 
      { 
        const docInfo = doctors.find(doc => doc._id === docID); 
        console.log('Fetched docInfo:', docInfo); 
        setDoctInfo(docInfo);
        
      } 
      else 
      { 
        console.error('Doctors data is not available.'); 
      } 
    }; 
    fetchDocInfo(); 
  }, [doctors, docID]);


  return(
    <div>
       { console.log(doctInfo)}
        <div>
            {/* <img src={doctInfo.image} alt="" /> */}
        </div>
    </div>
  )

}

export default Appointment