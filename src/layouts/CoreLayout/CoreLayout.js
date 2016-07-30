import React from 'react'
import Sidebar from '../../components/Sidebar'
import Map from '../../components/Map'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={classes.root}>
    <div className={classes.sidebarContainer}>
        <Sidebar />
    </div>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
