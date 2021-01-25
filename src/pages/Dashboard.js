import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles({
  card: {
    width: 340,
    marginRight: 20,
    padding: "0.5rem 1rem",
    paddingBottom: "3rem",
    cursor: 'pointer'
  },
  heading: {
    paddingBottom: "1rem",
  },
});
const Dashboard = () => {
  const history = useHistory();

  const classes = useStyle();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {/* <p>Dasboard</p> */}
      <Box display="flex" flexWrap={true} style={{ marginTop: "5rem" }} >
        <Card className={classes.card} onClick={() => history.push('/pipeline')}>
          <Typography variant="h4" className={classes.heading}>
            Integrate
          </Typography>
          <Typography component="p">
            Ingest and integrate data from sources using pipeline.Integrates
            with Wrangler Rules Engine and Metadata aggregator
          </Typography>
        </Card>
        <Card className={classes.card} onClick={() => history.push('/rule')}>
          <Typography variant="h4" className={classes.heading}>
            Role Engine
          </Typography>
          <Typography component="p">
            Buisness Data Tranforms and check the codified for user
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.heading}>
            Discover and Govern
          </Typography>
          <Typography component="p">
            Discovers data using metadata and wrangler.Perform root cause impact
            analysis using lineage
          </Typography>
        </Card>
      </Box>
      <Box display="flex" flexWrap={true} style={{ marginTop: "1rem" }}>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.heading}>
            Monitor
          </Typography>
          <Typography component="p">
            Centrally Manage Applications for better operations
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.heading}>
            Administrator
          </Typography>
          <Typography component="p">
            Manage System prefrence and Settings{" "}
          </Typography>
        </Card>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.heading}>
            Dashboard
          </Typography>
          <Typography component="p">
            At a glance view of capital stats
          </Typography>
        </Card>
      </Box>
    </div>
  );
};

export default Dashboard;
