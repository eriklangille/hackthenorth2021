import React, { useState, useEffect } from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PhotoItem from '../../components/photoItem';
import './photo.scss'

const newPhoto = (photo, text, author, date) => {
  return {Key: Math.random(0, 100000), Photo: photo, Text: text, Author: author, Date: date}
}

const defPhoto = (text) => {
  return newPhoto("./photo1.jpg", `Hi ${text}! Beautiful evening. Love you always ❤`, "From your son Michael", "Aug 29, 2021")
}

let firstLoad = false

const Photo = () => {
  const [photos, setPhotos] = useState([])
  const [xy, setXY] = useState({x: 0, y:0})
  const [mouseDown, setMouseDown] = useState(false)
  const [debounce, setDebounce] = useState(false)
  const [mouseXY, setMouseXY] = useState({x: 0, y:0})

  const handleMouseMove = (event) => {
    setXY({
      x: event.clientX,
      y: event.clientY,
    })
    if (mouseDown && !debounce) {
      // console.log(`X: ${xy.x} Y: ${xy.y} X0: ${mouseXY.x}`)
    }
    if (!debounce && mouseDown) {
      if (xy.x - mouseXY.x >= 60)
      {
        setPhotos([defPhoto("Mother"), ...photos.slice(0,-1)]);
        setDebounce(true)
      }
      if (xy.x - mouseXY.x <= -60) {
        setPhotos([...photos.slice(1), defPhoto("Mother")]);
        setDebounce(true)
      }
    }
  }

  const handleMouseDown = (event) => {
    setMouseXY({x: event.clientX, y: event.clientY});
    setMouseDown(true);
  }

  const handleMouseUp = () => {
    setMouseDown(false);
    setDebounce(false);
  }

  useEffect(() => {
    setPhotos([defPhoto("Mom"), defPhoto("ats"), defPhoto("dad"), defPhoto("Mother"), defPhoto("Mother")])
  }, [])

  return (
    <div className="photoAlbum"
    onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
    onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
    onMouseUp={() => handleMouseUp()}
  onTouchStart={touchStartEvent => handleMouseDown(touchStartEvent.touches[0])}
  onTouchMove={touchMoveEvent => handleMouseMove(touchMoveEvent.touches[0])}
  onTouchEnd={() => handleMouseUp()}
    >
      <TransitionGroup component={null} appear={firstLoad}>
      {photos.map((info) => 
      <CSSTransition key={info.Key} timeout={500} classNames={firstLoad ? "" : "Photos"}>
        <PhotoItem Key={info.Key} Photo={info.Photo} Text={info.Text} Author={info.Author} Date={info.Date} />
      </CSSTransition>
      )}
      </TransitionGroup>
      {/* <PhotoItem Photo="./photo1.jpg" Text="Hi mom! Beautiful evening. Love you always ❤" Date="Aug 29, 2021" Author="From your son Michael" /> */}
    </div>
  );
}

export default Photo