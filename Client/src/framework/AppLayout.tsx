import React, {FC, useState} from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@material-ui/core';
import {AddLocation, Home, Menu} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';

const AppContainer = styled('div')({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'min-content auto',
  gridTemplateAreas: `
    "header"
    "content"
  `,
});

const Header = styled(AppBar)({
  gridArea: 'header',
});

const ContentContainer = styled('div')({
  gridArea: 'content',
  width: '100vw',
  height: 'calc(100vh - 56px)',
  overflow: 'auto',
});

export const AppLayout: FC = ({children}) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigate = (toPath: string) => {
    setMenuOpen(false);
    history.push(toPath);
  };

  return (
    <AppContainer>
      <Header variant="elevation" position="sticky">
        <Toolbar variant="dense">
          <IconButton edge="start"
                      color="inherit"
                      onClick={() => setMenuOpen(!menuOpen)}>
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            PWA Demo
          </Typography>
        </Toolbar>
      </Header>
      <ContentContainer>
        {children}
      </ContentContainer>
      <Drawer anchor="left"
              variant="temporary"
              open={menuOpen}
              onClose={() => setMenuOpen(false)}>
        <List>
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button onClick={() => navigate('/fence/add')}>
            <ListItemIcon><AddLocation/></ListItemIcon>
            <ListItemText>Add GeoFence</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </AppContainer>
  );
};

export default AppLayout;