import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import './SoilTesting.css'

function Soiltesting() {
  return (
    <div className='soiltesting'>
      <div className='first__div'></div>
      <div className='second__div'></div>
      <div className='soiltesting__form'>
      <h1>Enter Details</h1>
      
       <input className='form__input' type='text' placeholder='Enter Name' required />
       <input className='form__input' type='text' placeholder='Village name' />
       <input className='form__input' type='text' placeholder='City' />
       <input className='form__input' type='text' placeholder='Pincode' />
       <textarea className='form__address' name="comment" form="usrform" placeholder='Description'></textarea>
       <input className='form__file' type='file'/><text>Upload previous test Report(if any)</text>
       <br />
       <Button>Book Slot</Button>

      </div>
    </div>
  )
}

export default Soiltesting