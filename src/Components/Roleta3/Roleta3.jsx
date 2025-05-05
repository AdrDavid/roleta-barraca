import React, { useState, useEffect } from 'react';
import './Roleta3.css';
import seta from "../../assets/seta.png";

// Configuração dos prêmios e seus pesos
const PREMIOS = [
    { id: 1, nome: "Prêmio 01", peso: 8 },  // Maior chance
    { id: 2, nome: "Prêmio 02", peso: 7 },
    { id: 3, nome: "Prêmio 03", peso: 6 },
    { id: 4, nome: "Prêmio 04", peso: 5 },
    { id: 5, nome: "Prêmio 05", peso: 4 },
    { id: 6, nome: "Prêmio 06", peso: 3 },
    { id: 7, nome: "Prêmio 07", peso: 2 },
    { id: 8, nome: "Prêmio 08", peso: 1 }   // Menor chance
];

// Função para sortear um prêmio ponderado
function getWeightedRandom() {
    // Calcula o total de pesos
    const totalWeight = PREMIOS.reduce((sum, premio) => sum + premio.peso, 0);

    // Gera um número aleatório dentro do intervalo
    let random = Math.random() * totalWeight;

    // Encontra o prêmio correspondente ao peso sorteado
    for (const premio of PREMIOS) {
        if (random < premio.peso) return premio;
        random -= premio.peso;
    }

    // Caso raro (retorna o primeiro prêmio)
    return PREMIOS[0];
}

export default function Roleta3({ iniciar, setIniciar, rotation, setRotation }) {
    const [resultado, setResultado] = useState(null);
    const [modal, setModal] = useState(false);
    const [posicaoEscolhida, setPosicaoEscolhida] = useState(null);
    const [res, setRes] = useState();

    const anglePerSegment = 360 / 8;

    function Girar() {
        // Escolhe uma posição aleatória para ser o resultado
        const posicaoAleatoria = Math.floor(Math.random() * 8) + 1;
        setPosicaoEscolhida(posicaoAleatoria);

        // Sorteia um prêmio ponderado
        const premioSorteado = getWeightedRandom();

        // Configura o resultado
        setResultado({
            premio: premioSorteado,
            posicao: posicaoAleatoria
        });

        setTimeout(() => {
            setRes(premioSorteado);
            setModal(true);
        }, 5100);

        const anguloDestino = (posicaoAleatoria - 1) * anglePerSegment;
        const voltasExtras = 360 * (Math.floor(Math.random() * 5) + 5);
        const anguloRotacao = voltasExtras - anguloDestino;

        setRotation(prevRotation => prevRotation + anguloRotacao);
    }

    const enviaForms = (e) => {
        e.preventDefault();
        setIniciar(true);
    }

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
                                key={premio.id}
                                className="premio"
                                style={{
                                    position: 'absolute',
                                    top: `${y}%`,
                                    left: `${x}%`,
                                    transform: `translate(-50%, -50%) rotate(${angle + 24}deg)`,
                                }}
                            >
                                {premio.nome}
                            </div>
                        );
                    })}
                </div>

                {/* Botão central substituindo o input */}
                <button className="botao-central" onClick={enviaForms}>
                    Girar
                </button>
            </div>

            {/* Modal de resultado (mantido igual) */}

        </>
    );
}