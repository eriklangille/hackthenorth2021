import React from 'react'
import style from '../styles/photoItem.module.scss'

const PhotoItem = (props) => {
  return (
    <div style={props.style} className={style.PhotoItem}>
      <div>
        <img className={style.Photo} src={props.Photo} alt={props.Message}/>
        <span className={style.Date}><p className={style.DateText}>{props.Date}</p></span>
      </div>
      <div className={style.TextBlock}>
        <h1 className={style.Message}>
          {props.Text}
        </h1>
        <h2 className={style.Author}>
          {props.Author}
        </h2>
      </div>
    </div>
  )
}

export default PhotoItem