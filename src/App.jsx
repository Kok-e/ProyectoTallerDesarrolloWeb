import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';


function App() {
  const [image, setImage] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [dogName, setDogName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevDecision, setPrevDecision] = useState(null);


  const generateDogName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const fetchNewImage = () => {
    setIsDisabled(true);
    setLoading(true);
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setIsDisabled(false);
        setLoading(false);
        setImage(data.message);
        setIsAccepted(false);
        setDogName(generateDogName());
      });
  }

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
    <Box >
      <img src="..\..\img\titulo.png" alt="" srcset="" />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {leftImages.map((leftImage, index) => (
            <Box key={`leftImage-${index}`} p={9} mb={0}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia component="img" sx={{ maxWidth: '100%', height: 'auto' }} image={leftImage.image} alt="Perro" />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {leftImage.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
        <Grid item xs={4}>
          {image && (
            <Box p={2}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" image={image} alt="Perro" sx={{ maxWidth: '100%', height: 'auto' }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dogName}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{ mt: 2 }}>
                <Button disabled={isDisabled} variant="contained" color="success" onClick={handleAccept} sx={{ mr: 8 }}>
                  Aceptar
                </Button>
                {loading && <Typography>Cargando...</Typography>}
                <Button disabled={isDisabled} variant="contained" color="error" onClick={handleReject} sx={{ mr: 8 }}>
                  Rechazar
                </Button>
                {loading && <Typography>Cargando...</Typography>}
                <Button disabled={!prevDecision} variant="contained" onClick={handleUndo}>
                  Deshacer
                </Button>
              </Box>
            </Box>

          )}
        </Grid>
        <Grid item xs={4}>
          {rightImages.map((rightImage, index) => (
            <Box key={`rightImage-${index}`} p={9} mb={0}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" sx={{ maxWidth: '100%', height: 'auto' }} image={rightImage.image} alt="Perro" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {rightImage.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;