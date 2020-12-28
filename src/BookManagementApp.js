/* eslint react/jsx-props-no-spreading: 0 */
// import Button from '@material-ui/core/Button';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
} from '@material-ui/core';

import BookList from './components/BookList';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.isRequired,
  value: PropTypes.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function BookManagementApp() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="book-mng-app">
      <h1>Book Management</h1>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item lg={10}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="書籍一覧" {...allyProps(0)} />
                <Tab label="著者" {...allyProps(1)} />
                <Tab label="シリーズ" {...allyProps(2)} />
                <Tab label="出版社" {...allyProps(3)} />
                <Tab label="レーベル" {...allyProps(4)} />
                <Tab label="媒体" {...allyProps(5)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <BookList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={4}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BookManagementApp;
