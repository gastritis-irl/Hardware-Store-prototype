import { Container, Grid } from '@mui/material';
import { Card } from './Card';

type GameBoardProps = {
  size: number;
  cards: CardMedia[];
  onCardClick: (id: number) => void;
};

type CardMedia = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function GameBoard({ size, cards, onCardClick }: GameBoardProps) {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card) => (
          <Grid item key={card.id} xs={12 / size}>
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              isFlipped={card.isFlipped}
              onClick={() => onCardClick(card.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
