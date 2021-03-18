import React from "react";
import axios from 'axios';

export {AddEvent,DeleteEvent,UpdateEvent}
function AddEvent(user,title,startDate, endDate,location,description,outfit) {



  const body = {user:user,title:title,startDate:startDate, endDate:endDate,location:location,description:description,outfit:outfit}
  axios.post('http://localhost:8080/events/add2',body).then(rep => {
    console.log(rep.data);
  }).catch(error =>{
    console.log(error)
  })

}
function DeleteEvent(_id) {

  axios.get('http://localhost:8080/events/delete/'+_id).then(rep => {
    console.log(rep.data);
  }).catch(error =>{
    console.log(error)
  })

}
function UpdateEvent(_id,title,startDate,endDate,location,description,outfit) {



  const body = {_id:_id,title:title,startDate:startDate, endDate:endDate,location:location,description:description,outfit:outfit}
  axios.post('http://localhost:8080/events/update',body).then(rep => {
    console.log(rep.data);
  }).catch(error =>{
    console.log(error)
  })

}


