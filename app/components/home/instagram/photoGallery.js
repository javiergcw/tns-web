'use client'
import React, { useState, useEffect } from 'react';

const PhotoGallery = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = 'IGQWROTFQtbFVjZAFBOdXRMM0hySlRac2pSSTRlV3VLV3ZAmZA3VYYjRUT0hxQUhLMTdxRl9ZAMERIVFdNeXVwWlc2U1lFZAmJDaTMwYWJtOHBYUW9kNlpHYU9kbDc4UUEwTHBlSnNOTHFDdUFtOTZAFRXdPWmJLemRWY28ZD';
      const apiURL = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=80&access_token=${accessToken}`;

      try {
        const res = await fetch(apiURL);
        const { data } = await res.json();
        setMediaData(data.slice(0, 9)); // Solo guarda las primeras 9 imágenes
      } catch (error) {
        console.error("Error al obtener datos de Instagram:", error);
      }
    };

    fetchData();
  }, []);

  if (!mediaData || mediaData.length === 0) {
    return <div>No hay imágenes para mostrar</div>;
  }

  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    maxWidth: '100%',
    margin: 'auto',
  };

  // Nuevo estilo para el contenedor de la imagen
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Centra la imagen horizontalmente
    alignItems: 'center', // Centra la imagen verticalmente
    backgroundColor: 'white', // Fondo blanco para el contenedor
  };

  return (
    <div className="gallery" style={galleryStyle}>
      {mediaData.map((media, index) => (
        <a key={index} href={media.permalink} target="_blank" rel="noopener noreferrer" style={imageContainerStyle}>
          {/* Asegúrate de que la imagen se ajuste al contenedor sin perder su aspecto */}
          <img src={media.thumbnail_url || media.media_url} alt={media.caption || 'Foto de Instagram'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </a>
      ))}
    </div>
  );
};

export default PhotoGallery;
