import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, Badge, LinearProgress } from '@mui/material';

function App() {
  const [image, setImage] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [dogName, setDogName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prevDecision, setPrevDecision] = useState(null);

  const fetchDogName = async () => {
    const response = await fetch("https://nombre-de-perros-default-rtdb.firebaseio.com/perros/.json");
    const data = await response.json();
    const names = Object.keys(data);
    return names[Math.floor(Math.random() * names.length)];
  };

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }} >
      <img src="..\..\img\titulo.png" alt="" srcset="" />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {image && (
            <Box p={2}>
              <Card sx={{ maxWidth: 345, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia component="img" image={image} alt="Imagen de un perro" sx={{ maxWidth: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
                    {dogName}
                  </Typography>
                  <Typography variant="body1" component="p" sx={{ color: '#555', mb: 2 }}>
                    ¡Hola! Soy {dogName}. Me encanta jugar y correr. ¿Quieres salir a ladrar?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={isDisabled} variant="contained" color="success" onClick={handleAccept} sx={{ borderRadius: '20px', textTransform: 'none' }}>
                      Aceptar
                    </Button>
                    <Button disabled={isDisabled} variant="contained" color="error" onClick={handleReject} sx={{ borderRadius: '20px', textTransform: 'none' }}>
                      Rechazar
                    </Button>
                    <Button disabled={!prevDecision} variant="contained" onClick={handleUndo} sx={{ borderRadius: '20px', textTransform: 'none' }}>
                      Deshacer
                    </Button>
                  </Box>
                </CardContent>
              {isLoading && <LinearProgress />}
              </Card>
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          {rightImages.map((rightImage, index) => (
            <Box key={`rightImage-${index}`} p={9} mb={0} sx={{ position: 'relative' }}>
              <Card sx={{ maxWidth: 345, borderRadius: '20px', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia component="img" sx={{ maxWidth: '100%', height: 'auto', borderRadius: '20px 20px 0 0' }} image={rightImage.image} alt="Perro" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {rightImage.name}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green', color: 'white', borderRadius: '0 0 0 20px', padding: '4px 8px', fontWeight: 'bold', fontSize: '12px' }}>
                Aceptado
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={4}>
          {leftImages.map((leftImage, index) => (
            <Box key={`leftImage-${index}`} p={9} mb={0} sx={{ position: 'relative' }}>
              <Card sx={{ maxWidth: 400, borderRadius: 10, boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia component="img" sx={{ maxWidth: '100%', height: 'auto', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} image={leftImage.image} alt="Perro" />
                <CardContent sx={{ backgroundColor: '#f7f7f7' }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {leftImage.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#777' }}>
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
    </Box>
  );
}

export default App;