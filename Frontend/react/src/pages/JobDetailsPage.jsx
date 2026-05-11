import { useParams, useLocation } from 'react-router-dom';
// import {useEffect, useState} from 'react';


function JobDetailsPage(){
const {id} = useParams()
const location = useLocation()
const job = location.state

if(!job){
    return (
       <>
       <div> </div>
       </> 
    )
}


return (
<>
<div>
    <h1>Dettaglio lavoro</h1>
    
    <p>Job ID: {id}</p>

</div>

</>

)

}

export default JobDetailsPage