import React, { useState, useEffect } from 'react';

const PhotoGallery = () => {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = 'IGQWRNRWQyZAUs4cG5IMFhmRVFQeGNQSmxYZADR4M1J0M0lsMnphcm43ZA29ENEZAfcDVjcVpaMW43RWZAmX0w2WkdoNUdDTVJzaEtNLThTSWNfdExURkJzOHVWbktRTlljUXdBN1JGeUNJTGhMaWpIaTc3TGZAHTzZAsSHMZD';
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

  return (
    <div className="gallery" style={galleryStyle}>
      {mediaData.map((media, index) => (
        <a key={index} href={media.permalink} target="_blank" rel="noopener noreferrer">
          <img src={media.media_url} alt={media.caption || 'Foto de Instagram'} style={{ width: '100%', height: 'auto' }} />
        </a>
      ))}
    </div>
  );
};

export default PhotoGallery;
