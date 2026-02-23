import { nanoid } from 'nanoid';

export function createNode(type: string, position = { x: 300, y: 200 }) {
  const id = nanoid();

  const base = {
    id,
    type,
    position,
    data: {},
  };

  switch (type) {
    case 'person':
      return {
        ...base,
        data: {
          name: 'Person B',
          birthDate: '',
          birthTime: '',
          birthPlace: '',
        },
      };

    case 'finalResults':
      return {
        ...base,
        data: {
          summary: {
            alignmentScore: 0,
            volatility: 'Low',
            dominantAspect: '—',
            dominantHouse: '—',
            activeWindow: '—',
            supportLabel: '—',
            frictionLabel: '—',
          },
        },
      };

    default:
      return base;
  }
}
