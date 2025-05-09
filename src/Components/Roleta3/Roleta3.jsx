import React, { useState, useEffect } from 'react';
import './Roleta3.css';
import seta from "../../assets/seta.png";

// Configuração dos prêmios com índice único e pesos
const PREMIOS = [
    { index: 0, nome: "Shot de Vodka", peso: 930 },
    { index: 1, nome: "Chopp", peso: 30 },
    { index: 2, nome: "Shot de Vodka", peso: 930 },
    { index: 3, nome: "Caipirinha", peso: 15 },
    { index: 4, nome: "Shot de Vodka", peso: 930 },
    { index: 5, nome: "Copao de Whisky", peso: 5 },
    { index: 6, nome: "Shot de Vodka", peso: 930 },
    { index: 7, nome: "Copão", peso: 20 }
];

const anglePerSegment = 360 / PREMIOS.length;

// Sorteio ponderado baseado nos pesos
function getWeightedRandom() {
    const totalWeight = PREMIOS.reduce((sum, p) => sum + p.peso, 0);
    let random = Math.random() * totalWeight;

    for (const premio of PREMIOS) {
        if (random < premio.peso) return premio;
        random -= premio.peso;
    }

    return PREMIOS[0]; // fallback (muito raro)
}

export default function Roleta3({ iniciar, setIniciar, rotation, setRotation }) {
    const [resultado, setResultado] = useState(null);
    const [modal, setModal] = useState(false);
    const [res, setRes] = useState();

    function Girar() {
        const premioSorteado = getWeightedRandom();

        // Pega o índice único (garante correspondência exata)
        const indexPremio = premioSorteado.index;
        const anguloDestino = indexPremio * anglePerSegment;

        // Gira com várias voltas extras
        const voltasExtras = 360 * (Math.floor(Math.random() * 3) + 5);
        const anguloRotacao = voltasExtras - anguloDestino;

        setResultado({
            premio: premioSorteado,
            posicao: indexPremio + 1
        });

        setTimeout(() => {
            setRes(premioSorteado);
            setModal(true);
        }, 5100);

        setRotation(prev => prev + anguloRotacao);
    }

    const enviaForms = (e) => {
        e.preventDefault();
        setIniciar(true);
    };

    useEffect(() => {
        if (iniciar) {
            Girar();
            setIniciar(false);
        }
    }, [iniciar, setIniciar]);

    return (
        <>
            <div className="containerRoleta">
                <img className='indicador' src={seta} alt="Indicador" />

                <div className='roleta' style={{ transform: `rotate(${rotation - 24}deg)` }}>
                    {PREMIOS.map((premio, index) => {
                        const angle = index * anglePerSegment;
                        const x = 50 + 40 * Math.cos((angle - 66) * (Math.PI / 180));
                        const y = 50 + 40 * Math.sin((angle - 66) * (Math.PI / 180));

                        return (
                            <div
                                key={premio.index}
                                className="premio"
                                style={{
                                    position: 'absolute',
                                    top: `${y}%`,
                                    left: `${x}%`,
                                    transform: `translate(-50%, -50%) rotate(${angle + 24}deg)`
                                }}
                            >
                                {premio.nome}
                            </div>
                        );
                    })}
                </div>

                <button className="botao-central" onClick={enviaForms}>
                    Girar
                </button>
            </div>

            {/* Modal de resultado (implemente se quiser mostrar o prêmio sorteado) */}
            {/* {modal && res && (
                <div className="modal-resultado">
                    <p>Você ganhou: <strong>{res.nome}</strong>!</p>
                    <button onClick={() => setModal(false)}>Fechar</button>
                </div>
            )} */}
        </>
    );
}
