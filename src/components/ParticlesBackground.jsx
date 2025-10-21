// src/components/ParticlesBackground.jsx
import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Lightweight particles engine

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent", // Background body mein set hai
                },
            },
            fullScreen: { 
                enable: true, 
                zIndex: -1 // Particle background ko sabse peeche rakho
            },
            particles: {
                number: {
                    value: 80, // Kam particles for subtle effect
                },
                color: {
                    value: "#00FFFF", // Neon Blue color
                },
                links: {
                    color: "#00FFFF",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    outMode: "out",
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: 2,
                },
                opacity: {
                    value: 0.5,
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse", // Mouse ke paas aane par particles door jaayenge
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
        }),
        [],
    );

    return <Particles init={particlesInit} options={options} />;
};

export default ParticlesBackground;