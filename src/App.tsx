import React, { useState, useEffect, useCallback } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Container, Typography, Paper, Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GameBoard } from './GameBoard';
import { SizeSelector } from './SizeSelector';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: '3rem',
      color: '#90caf9',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      color: '#f48fb1',
    },
  },
});

type CardType = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function App(): ReactJSXElement {
  const [size, setSize] = useState(4);
  const [cards, setCards] = useState<CardType[]>([]);
  const [matchedPairs, setNumberOfMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isChecking, setIsChecking] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const generateCards = useCallback(async () => {
    const totalPairs = (size * size) / 2;
    const newCards: CardType[] = [];
    const response = await fetch(`https://picsum.photos/v2/list?page=2&limit=${totalPairs}`);
    const images: PicsumImage[] = await response.json();

    for (let i = 0; i < totalPairs; i++) {
      const id = Math.floor(Math.random() * 1000);
      const imageUrl: string = images[i].download_url;

      newCards.push({ id: id * 2, imageUrl, isFlipped: false, isMatched: false });
      newCards.push({ id: id * 2 + 1, imageUrl, isFlipped: false, isMatched: false });
    }

    newCards.sort(() => Math.random() - 0.5);

    setCards(newCards);
    setNumberOfMatchedPairs(0);
    setMoves(0);
  }, [size]);

  useEffect(() => {
    const setupGame = () => {
      generateCards().catch((error) => {
        console.error('Failed to generate cards:', error);
      });
    };

    setupGame();
  }, [generateCards]);

  const handleGameWin = () => {
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (matchedPairs === (size * size) / 2) {
      handleGameWin();
    }
  }, [matchedPairs, size]);

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const checkForMatch = (newFlippedCards: CardType[]) => {
    let matches = matchedPairs;
    let newCards = [...cards];

    if (newFlippedCards[0].imageUrl === newFlippedCards[1].imageUrl) {
      matches++;
      newCards = newCards.map((card) =>
        newFlippedCards.find((fc) => fc.id === card.id) ? { ...card, isMatched: true, isFlipped: true } : card,
      );
      setNumberOfMatchedPairs(matches);
    } else {
      newCards = newCards.map((card) =>
        newFlippedCards.find((fc) => fc.id === card.id) ? { ...card, isFlipped: false } : card,
      );
    }

    setCards(newCards);
    setMoves(moves + 1);
    setIsChecking(false);
  };
  const handleCardClick = (id: number): void => {
    if (isChecking) return;

    const cardToFlip = cards.find((card) => card.id === id);
    if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) {
      return;
    }

    const newCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card));
    setCards(newCards);

    const newFlippedCards = newCards.filter((card) => card.isFlipped && !card.isMatched);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);

      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  const startGame = useCallback(
    async (selectedSize: number) => {
      setSize(selectedSize);
      try {
        await generateCards();
      } catch (error) {
        console.error('Failed to generate cards:', error);
      }
    },
    [setSize, generateCards],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides a consistent baseline style */}
      <Paper
        sx={{ minHeight: '100vh', py: 5, background: 'linear-gradient(45deg, #303f9f 30%, #3f51b5 90%)' }}
        elevation={5}
      >
        <Container maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Memory Game
          </Typography>
          <Box mb={4} display="flex" flexDirection="column" alignItems="center">
            <SizeSelector onStart={startGame} />
          </Box>
          <GameBoard size={size} cards={cards} onCardClick={handleCardClick} />
          <Typography variant="h6" component="p" align="center" mt={4}>
            Moves: {moves} | Matched Pairs: {matchedPairs}
          </Typography>
        </Container>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Congratulations! You have won the game in {moves} moves!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
