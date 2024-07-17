// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>Volver a la página de inicio</a>
      </Link>
    </div>
  );
}
