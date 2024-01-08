import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Content.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Content() {

  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());

  const endDate = new Date("02/21/2022");
    var text;
  const getSlots=()=>{
    if((startDate.getDate()==endDate.getDate()) && (startDate.getMonth()==endDate.getMonth())  ){
     document.getElementById('text').innerHTML = "Available"; 
     document.getElementById('text').style.color = "green";
     history.push('/soiltesting')
  }else{
    document.getElementById('text').innerHTML  = "Not Available";
    document.getElementById('text').style.color = "red";
  }
}

const expert=()=>{
  window.alert("This feature is not available now")
}



  return (
    <div className='content' >
      <Carousel className='content__carousel'>
        <Carousel.Item interval={1500} className='firstCorousal'>
          <img  
            className="d-block w-100"
src="https://wallpaperaccess.com/full/1164298.jpg"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500} className='secondCorousal'>
          <img
            className="d-block w-100"
src="https://c0.wallpaperflare.com/preview/562/182/454/india-pollachi-agriculture-village.jpg"
            alt="Image Two"
          />
        </Carousel.Item>
      </Carousel>
      <div className='content__foreground'>
      <Row xs={3}>
        <Col>
      <div className='content__orders'>
        <h4 className='content__orders__heading'>Up to 50% Off On Below Products</h4>
        <Row xs={2}>
          <Col>
          <Link to="/home">
        <div className='order__one'>  
        </div>
        </Link>
        <p className='order__one__p'>Fertilizers</p>
        </Col>
        <Col>
        <div className='order__two'>
        </div>
        <p className='order__two__p'>
          Pesticides
        </p>
        </Col>
        <Col>
        <div className='order__three'>  
        </div>
        <p className='order__three__p'>Insecticides</p>
        </Col>
        <Col>
        <div className='order__four'>
        </div>
        <p className='order__four__p'>
          Bio Fertilizers
        </p>
        </Col>
        </Row>
      </div>
      </Col>
      <Col>
      <div className='content__test'>
        <h4 className='content__test__heading'>Test Your Soil</h4>
        <DatePicker className='test__datepicker' selected={startDate}  onChange={(date) => setStartDate(date)} />
        <p id='text'></p>
        <button className='content__test__button' onClick={getSlots}>Book slot for soil testing</button>
        
      </div>
      </Col>
      <Col>
      <div className='content__expert'>
        <Button className='expert__button' onClick={expert}>Connect with experts</Button>
      </div>
      </Col>
     </Row>
      </div>
    </div>
  );
}

export default Content;