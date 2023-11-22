import { Card as MuiCard, CardMedia } from '@mui/material';

type CardProps = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
};

export function Card(props: CardProps) {
  const { id, imageUrl, isFlipped, onClick } = props;
  return (
    <MuiCard onClick={() => onClick(id)} raised={isFlipped}>
      {isFlipped && <CardMedia component="img" height="140" image={imageUrl} alt={`Card ${id}`} />}
    </MuiCard>
  );
}
