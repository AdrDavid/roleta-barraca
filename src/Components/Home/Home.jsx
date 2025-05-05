import React, { useState, useEffect } from 'react'
import './Home.css'
import Roleta3 from '../Roleta3/Roleta3'
export default function Home() {
    const [iniciar, setIniciar] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [descontoResposta, setDescontoResposta] = useState();
    return (
        <div className='containerAll'>

            {/* <Formulario iniciar={iniciar} setIniciar={setIniciar} rotation={rotation} setRotation={setRotation} descontoResposta={descontoResposta} setDescontoResposta={setDescontoResposta} /> */}
            <Roleta3 iniciar={iniciar} setIniciar={setIniciar} rotation={rotation} setRotation={setRotation} descontoResposta={descontoResposta} />

        </div>
    )
}
