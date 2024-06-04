import Particles from 'react-tsparticles';
import { useCallback, useEffect, useState } from 'react';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { Theme } from '@mui/material';

type MyParticlesProps = {
  theme: Theme;
};

function MyParticles({ theme }: MyParticlesProps) {
  const [particleContainer, setParticleContainer] = useState<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    console.log('Particles engine initialized');
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    setParticleContainer(container);
  }, []);

  useEffect(() => {
    // Effect to change the theme of particles when the theme changes
    if (particleContainer) {
      particleContainer.loadTheme(theme.palette.mode);
    }
  }, [theme, particleContainer]);

  const particlesOptions:object = {
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: theme.palette.primary.main,
        opacity: 0,
      },
      links: {
        color: theme.palette.text.primary,
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 2,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{...particlesOptions}}
    />
  );
}

export default MyParticles;
