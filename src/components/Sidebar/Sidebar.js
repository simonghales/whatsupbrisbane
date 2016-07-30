import React from 'react'
import classes from './Sidebar.scss'

export const Sidebar = () => (
    <div className={classes.root}>
      <div className={classes.intro}>
        <h1 className={classes.title}>What's Up Brisbane</h1>
        <p className={classes.desc}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cupiditate delectus deserunt.
        </p>
      </div>
      <form className={classes.form}>
        <div className={classes.input}>
          <label>
            <h3>Starting Location</h3>
            <input type="text" />
          </label>
        </div>
        <div className={classes.input}>
          <label>
            <h3>Accepted Distance Radius</h3>
            <input type="text" />
          </label>
        </div>
        <div className={classes.input}>
          <label>
            <h3>Starting Time</h3>
            <input type="text" />
          </label>
        </div>
        <div className={classes.input}>
          <label>
            <h3>End Time</h3>
            <input type="text" />
          </label>
        </div>
        <div className={classes.submit}>
          <button className={classes.btn}>Find Events</button>
        </div>
      </form>
    </div>
)

export default Sidebar
