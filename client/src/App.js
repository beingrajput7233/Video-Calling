import React from 'react'
// import { Typography, AppBar } from '@material-ui/core';
// import AppBar from '@material-ui/core';
// import { Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
import Videoplayer from './components/Videoplayer';
import Notifications from './components/Notifications';
import Options from './components/Options';

const App = () => {
  return (
    <div>
      
      {/* <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar> */}
      Video chat


      {/* videoplayer */}
      <Videoplayer />
      {/* options->notifications */}
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}


export default App;
