import React, { useState, useEffect } from 'react';

const PhotoGallery = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Tu código para buscar datos aquí...
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
