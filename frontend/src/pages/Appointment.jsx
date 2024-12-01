import React, { useContext,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment =()=>{

  const {docId} =useParams()
  const {doctors} = useContext(AppContext)
  const [doctInfo,setDoctInfo] = useState(null)
 
  useEffect(() => { const fetchDocInfo = async () => { 
    console.log(doctors)
    console.log("doctor id :: "+docId)
    if (doctors) 
      { 
        const docInfo = doctors.find(doc => doc._id === docId); 
        console.log('Fetched docInfo:', docInfo); 
        setDoctInfo(docInfo);
      } 
      else 
      { 
        console.error('Doctors data is not available.'); 
      } 
    }; 
    fetchDocInfo(); 
  }, [doctors, docId]);


  return(
    <div>

    </div>
  )

}

export default Appointment