import React, { useState, useEffect } from "react";
// import './Sliderpopup.scss'
import Slider from "react-slick";
import LeftArrow from '../../assets/icons/leftarrow.svg';
import RightArrow from '../../assets/icons/rightarrow.svg';
import BookmarksImg1 from "../../assets/images/bookmarkscarousal1.png";
import BookmarksImg2 from "../../assets/images/bookmarkscarousal2.png";
import BookmarksImg3 from "../../assets/images/bookmarkscarousal3.png";
import BookmarksImg4 from "../../assets/images/bookmarkscarousal4.png";
 
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="offers-blur">
      <img src={RightArrow} alt="vector"
        id="next-arrow"
        className={className}
        style={{ ...style, background: "transparent" }}
        onClick={onClick}  
      />
    </div> 
  ); 
}

function SamplePreviousArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="offers-blur">
      <img src={LeftArrow} alt="vector"
        id="previous-arrow"
        className={className}
        style={{ ...style, background: "transparent" }}
        onClick={onClick}  
      />
    </div>
  );
}

function Sliderpopup(props) {
  console.log(props.images,"multi images");
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: false,
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    arrows: true, 
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
      let ele = document.getElementById('previous-arrow-offers');
      if(ele){
        if (index < 1) {
          ele.style.display = 'none';
        } else {
          ele.style.display = 'block';
        }
      }
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePreviousArrow />
  }; 
  const handleImageClick = (imageUrl) => {
    props.handleImageClick(imageUrl);
  } 

  return (
   <div className="slider-section"> 
      <div className="slider-content"> 
        <Slider {...settings}>
        {props.images?.map((image)=>{
              return (<div className="sliderspace-content"><img src={image.url} alt="bookmarksImg1" onClick={()=>handleImageClick(image.url)} /></div>)
          })}
          {/* <div className="sliderspace-content"><img src={BookmarksImg1} alt="bookmarksImg1" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg2} alt="bookmarksImg2" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg4} alt="bookmarksImg3" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg1} alt="bookmarksImg4" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg2} alt="bookmarksImg1" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg4} alt="bookmarksImg2" /></div>
          <div className="sliderspace-content"><img src={BookmarksImg1} alt="bookmarksImg3" /></div> */}
        </Slider>         
        <div>
      </div>
     </div>
   </div>
  );
}
    
export default Sliderpopup; 