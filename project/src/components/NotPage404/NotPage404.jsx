import React from "react";
import { Link } from "react-router-dom";
// import styles from './NotPage404.module.scss'

function NotPage404() {
  return (
    <>
      <h1>
        Something wrong!
      </h1>
      <Link to='/'>
        Go to main
      </Link>
    </>
  )
}

export default NotPage404;
