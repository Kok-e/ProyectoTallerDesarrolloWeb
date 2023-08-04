import React, { useState } from 'react';
import { AppBar, Box, Container, Grid, Typography, Toolbar, TextField, TextareaAutosize, Button, Select, MenuItem } from '@mui/material';

const RegistroPerroForm = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);
  const [sexo, setSexo] = useState('');
  const [previewFoto, setPreviewFoto] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleFotoChange = (event) => {
    const selectedFile = event.target.files[0];
    setFoto(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewFoto(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Foto:', foto);
    console.log('Sexo:', sexo);

  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}>
      <AppBar position="static">
      </AppBar>
      <Container maxWidth="sm">
        <Grid container spacing={4} sx={{ borderRadius: '20px', border: '1px solid #ccc', p: 8 }}>
          <Grid item xs={8}>
            <form onSubmit={handleSubmit}>
              <TextField  label="Nombre" value={nombre} onChange={handleNombreChange} />
              <TextareaAutosize  rows={4} placeholder="Descripción" value={descripcion} onChange={handleDescripcionChange} sx={{ mt: 2 }} />
              <input type="file" onChange={handleFotoChange} sx={{ mt: 2 }} />
              {previewFoto && (
                <img src={previewFoto} alt="Imagen seleccionada" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
              )}
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>Registrar Perro</Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegistroPerroForm;
