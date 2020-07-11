import React, { useState } from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Ingredients from "../Ingredients/";
import Recipes from "../Recipes/";
import { useStyles } from "./style";

type Page = "recipes" | "ingredients";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("recipes");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePageChange = (page: Page) => {
    setPage(page);
  };

  const classes = useStyles();

  const children = () => {
    switch (page) {
      case "recipes":
        return <Recipes />;
      case "ingredients":
        return <Ingredients />;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {page}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon onClick={() => handlePageChange("recipes")}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handlePageChange("ingredients")}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ingredients" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>{children()}</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
