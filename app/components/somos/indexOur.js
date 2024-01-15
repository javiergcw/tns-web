import RazonDeSeR from './razon_ser'
import MisionVision from './mision_vision'
import Historia from './historia'
import Valores from './valores'
import Cultura from './cultura'
import Filosofia from './filosofia'
import Formacion from './formacion'
import Promueve from './promueve'
import Bilingue from './bilingue'
import Navbar from "@/app/components/home/navbar";


export default function AsiSomos() {
    return (
      <div className='contenedor_principal pt-20'>
         <Navbar />
        <RazonDeSeR/>
        <MisionVision/>
        <Historia/>
        <Valores/>
        <Cultura/>
        <Filosofia/>
        <Formacion/>
        <Promueve/>
        <Bilingue/>
    </div>
    );
  }