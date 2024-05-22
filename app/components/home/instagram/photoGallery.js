'use client'
import React, { useState, useEffect } from 'react';

const PhotoGallery = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchMediaData = async () => {
      const accessToken = 'IGQWRPdWZAJeGEwMFR0dHEyNWlsREotSDR0akEwRDdOSG16bVFpeGdaUkwwang3MnpFbHM4TmlkQUJUaFgtY3pxc0dINllVTTdwOTBGNEtseVNvZAjFENFpONHZAWS2VfQ1Y1b3dlV2tvbTl4WFY5YktmaU5ZAZAW1oM2MZD';
      const apiURL = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=80&access_token=${accessToken}`;

      let attempts = 0;
      let data = [];
      let error;

      while (attempts < 3) {
        try {
          const res = await fetch(apiURL);
          const result = await res.json();
          if (result && result.data) {
            data = result.data;
            break;
          } else {
            throw new Error('Datos de Instagram no válidos');
          }
        } catch (err) {
          error = err;
          attempts += 1;
        }
      }

      if (attempts === 3 && !data.length) {
        console.error("Error al obtener datos de Instagram después de 3 intentos:", error);
        setError("Error al obtener datos de Instagram. Por favor, inténtelo de nuevo más tarde.");
      } else {
        setMediaData(data.slice(0, 9));
      }
    };

    fetchMediaData();
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
