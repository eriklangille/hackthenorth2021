import React, { useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhotoItem from '../../components/photoItem';
import './photo.scss'
import { userId } from '../../Utils/ids';
import { getPhotoUrls } from '../../Utils/photo';
import { useHistory } from 'react-router-dom';

const newPhoto = (photo, text, author, date) => {
  return { Key: Math.random(0, 100000), Photo: photo, Text: text, Author: author, Date: date }
}

const defPhoto = (text = "Mom", image = "./photo1.jpg", date = "2021-09-19T07:31:26.990Z") => {
  let useimage = image || "./photo1.jpg"
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  let infodate = new Date(date || "2021-09-12T07:31:26.990Z");

  let stringDate = infodate.toLocaleDateString("en-US", options);
  return newPhoto(useimage, `Hi ${text}! Beautiful evening. Love you always ❤`, "From your son Michael", stringDate)
}

let firstLoad = false

const Photo = () => {
  const history = useHistory()
  const [photos, setPhotos] = useState([])
  const [photoData, setPhotoData] = useState([])
  const [photoNumbers, setPhotoNumbers] = useState([0, 4])
  const [xy, setXY] = useState({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = useState(false)
  const [debounce, setDebounce] = useState(false)
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 })

  const updatePhotoNumber = (numbers, diff) => {
    let new_nums = [...numbers]
    for (let i = 0; i < new_nums.length; i++) {
      new_nums[i] += diff;
      if (new_nums[i] < 0) {
        new_nums[i] = photoData.length - 1
      }
      else if (new_nums[i] >= photoData.length) {
        new_nums[i] = 0
      }
    }
    console.log(new_nums)
    setPhotoNumbers(new_nums)
  }

  const handleMouseMove = (event) => {
    setXY({
      x: event.clientX,
      y: event.clientY,
    })
    if (mouseDown && !debounce) {
      // console.log(`X: ${xy.x} Y: ${xy.y} X0: ${mouseXY.x}`)
    }
    if (!debounce && mouseDown) {
      if (xy.x - mouseXY.x >= 60) {
        updatePhotoNumber(photoNumbers, -1)
        setPhotos([defPhoto("Mother", photoData[photoNumbers[0]]?.urlString), ...photos.slice(0, -1)]);
        setDebounce(true)
      }
      if (xy.x - mouseXY.x <= -60) {
        updatePhotoNumber(photoNumbers, 1)
        setPhotos([...photos.slice(1), defPhoto("Mother", photoData[photoNumbers[0]]?.urlString)]);
        setDebounce(true)
      }
    }
  }

  const handleMouseDown = (event) => {
    setMouseXY({ x: event.clientX, y: event.clientY });
    setMouseDown(true);
  }

  const handleMouseUp = () => {
    setMouseDown(false);
    setDebounce(false);
  }

  useEffect(() => {
    async function fetchData() {
      let photoData = await getPhotoUrls(userId)
      setPhotoData(photoData)
      console.log(`DATA: ${photoData}`)
      console.table(photoData)
      setPhotos([defPhoto("Mom", photoData[0]?.urlString), defPhoto("Mom", photoData[1]?.urlString), defPhoto("Mom", photoData[2]?.urlString), defPhoto("Mother", photoData[3]?.urlString), defPhoto("Mother", photoData[4]?.urlString)])
    }
    fetchData();
  }, [])

  return (
    <div>
      <button onClick={() => history.push("/")} className="photo__backbutton">
        <img src="../arrow-left-circle.svg" width="50px" height="50px" />
      </button>
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
    </div>
  );
}

export default Photo