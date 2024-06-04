// standard particle config using the theme colors

import { Theme } from '@mui/material';

export const particlesConfig: object = {
  background: {
    color: {
      value: 'inherit',
    },
  },
  fpsLimit: 60,
  interactivity: {
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
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      trail: {
        delay: 0.005,
        quantity: 5,
        particles: {
          color: (theme: Theme) => theme.palette.primary.main,
          shape: {
            type: 'circle',
          },
          size: 5,
        },
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: (theme: Theme) => theme.palette.primary.main,
    },
    links: {
      color: (theme: Theme) => theme.palette.primary.main,
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      outModes: {
        default: 'out',
      },
      random: true,
      speed: 2,
      straight: false,
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
