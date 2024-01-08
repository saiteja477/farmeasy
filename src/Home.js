import React from 'react';
import "./Home.css";
import Product from './Product';
import { useStateValue } from './StateProvider';
import {useState,useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';


function Home(props) {
    const [{user}, dispatch] = useStateValue();
    
  return <div className='home'>
         <Row>
           <Col>
           <div className='home__leftsidebar'>
            <img src='https://images-na.ssl-images-amazon.com/images/I/41CZIqtaIuL._SX313_BO1,204,203,200_.jpg' />
           </div>
           </Col>
         </Row>
      <div className='home__container'>
          <h3 className='hoem__productheading'>Free Delivery On your first Order</h3>
         
          <div className='home__row'>
            <Row xs={3}>
          {props.articles && props.articles.map(article=>{
               return(       
                 <Col>  
            <Product id={article.id} 
            userName={user?.email}
            title={article.title} 
            price={article.price}
            image={article.image}
            rating={article.rating}
            />
             </Col>
    )
    })}
    </Row>
     </div>    
     </div>
     <Row xs={1}>
      <Col>
      <div className='home__rightsidebar'>
      <img className='home__sidebarimage' src='https://5.imimg.com/data5/FD/YU/MY-12382063/organic-compost-activator-500g-500x500.jpg' />
     </div>
     </Col>
     <Col>
      
     </Col>
    </Row>
  </div>
};

export default Home;
