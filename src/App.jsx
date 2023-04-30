import { useQuery } from 'react-query'
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, Badge, LinearProgress } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import { LoremIpsum } from 'lorem-ipsum';
import { Avatar } from '@mui/material';
import { Collapse } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import BlockIcon from '@mui/icons-material/Block';
import UndoIcon from '@mui/icons-material/Undo';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CenterFocusStrong } from '@mui/icons-material';




function App() {
  const [image, setImage] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [dogName, setDogName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prevDecision, setPrevDecision] = useState(null);
  const [showText, setShowText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const fetchDogName = async () => {
    const response = await fetch("https://nombre-de-perros-default-rtdb.firebaseio.com/perros/.json");
    const data = await response.json();
    const names = Object.keys(data);
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateText = (count) => {
    const lorem = new LoremIpsum();
    return lorem.generateParagraphs(count);
  };

  const text = generateText(1);

  const fetchNewImage = () => {
    setIsDisabled(true);
    setIsLoading(true);
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(async data => {
        setIsDisabled(false);
        setIsLoading(false);
        setImage(data.message);
        setIsAccepted(false);
        setDogName(await fetchDogName());
      });
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setRightImages(prevState => [{ name: dogName, image }, ...prevState]);
    setPrevDecision('accept');
    fetchNewImage();
  }

  const handleReject = () => {
    setIsAccepted(false);
    setLeftImages(prevState => [{ name: dogName, image }, ...prevState]);
    setPrevDecision('reject');
    fetchNewImage();
  }

  const handleUndo = () => {
    if (prevDecision === 'accept') {
      setRightImages(prevState => prevState.slice(1));
      setLeftImages(prevState => [{ name: rightImages[0].name, image: rightImages[0].image }, ...prevState]);
    } else if (prevDecision === 'reject') {
      setLeftImages(prevState => prevState.slice(1));
      setRightImages(prevState => [{ name: leftImages[0].name, image: leftImages[0].image }, ...prevState]);
    }
    setPrevDecision(null);
  }

  useEffect(() => {
    fetchNewImage();
  }, []);

  const handleButtonClick = () => {
    setIsVisible(prevState => !prevState);
    setShowText(!showText);
  }

  return (
    <Grid container spacing={2} >
      <Grid
        item xs={12}
        p={5}
         >
        <AppBar
          className="appbar"
          color="transparent"
          position="fixed">
          <Toolbar >
            <Avatar
              alt="Remy Sharp"
              src="/img/titulo.png"
              sx={{ width: 56, height: 56 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}>
              <b><big> &nbsp; TinDogs</big></b>
            </Typography>
            <IconButton
              disabled={isDisabled}
              sx={{ borderRadius: '50%', color: 'white', width: 64, height: 64 }}>
              <HomeIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid
        item xs={12} xl={4}
        
        sx={{ maxHeight: '800px' }} >
        {image && (
          <Box
            p={2}>
            <Card sx={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia
                component="img"
                image={image}
                alt="Imagen de un perro"
                sx={{ pl: 10 , height: 400, width: 450, borderRadius: '40px 40px 40px 40px ', objectFit: 'cover' }} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
                  {dogName}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: '#555', mb: 2 }}>
                  ¡Hola! Soy {dogName}. {text}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Tooltip title="Aceptar">
                    <IconButton
                      disabled={isDisabled}
                      onClick={handleAccept}
                      sx={{ borderRadius: '50%', color: '#2189f7', width: 64, height: 64 }}>
                      <FavoriteIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Rechazar">
                    <IconButton
                      disabled={isDisabled}
                      onClick={handleReject}
                      sx={{ borderRadius: '20px', color: 'red', width: 64, height: 64 }}>
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deshacer">
                    <IconButton
                      disabled={!prevDecision}
                      variant="contained"
                      onClick={handleUndo}
                      sx={{ borderRadius: '20px', color: 'green', width: 64, height: 64 }}>
                      <UndoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
              {isLoading && <LinearProgress />}
            </Card>
          </Box>
        )}
      </Grid>
      <Grid
        item xl={4} xs={6}
        
        sx={{ overflowY: 'scroll', maxHeight: 800 }}>
        {rightImages.map((rightImage, index) => (
          <Box
            key={`rightImage-${index}`}
            p={9}
            mb={0}
            sx={{ position: 'relative' }}>
            <Card
              sx={{ maxWidth: 345, borderRadius: '20px', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                sx={{ maxWidth: '100%', height: 'auto', borderRadius: '20px 20px 0 0' }}
                image={rightImage.image} alt="Perro" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 'bold' }}>
                  {rightImage.name}
                </Typography>
                <IconButton onClick={handleButtonClick}>
                  {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <Collapse in={showText}>
                  {text}
                </Collapse>
              </CardContent>
            </Card>
            <Box sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green', color: 'white', borderRadius: '0 0 0 20px', padding: '4px 8px', fontWeight: 'bold', fontSize: '12px' }}>
              Aceptado
            </Box>
          </Box>
        ))}
      </Grid>
      <Grid
        item xl={4} xs={6}
        
        sx={{ overflowY: 'scroll', maxHeight: 800 }}>
        {leftImages.map((leftImage, index) => (
          <Box
            key={`leftImage-${index}`}
            p={9}
            mb={0}
            sx={{ position: 'relative' }}>
            <Card
              sx={{ maxWidth: 345, borderRadius: '20px', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                sx={{ maxWidth: '100%', height: 'auto', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} image={leftImage.image} alt="Perro" />
              <CardContent sx={{ backgroundColor: '#f7f7f7' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold', color: '#333' }}>
                  {leftImage.name}
                </Typography>
                <IconButton onClick={handleButtonClick}>
                  {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <Collapse in={showText}>
                  {text}
                </Collapse>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: '#777' }}>
                  {leftImage.description}
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', borderRadius: '0 0 0 20px', padding: '4px 8px', fontWeight: 'bold', fontSize: '12px' }}>
              Rechazado
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>


  );
}

export default App;