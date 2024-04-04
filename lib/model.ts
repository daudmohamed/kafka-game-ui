export type Team = {
  id: string;
  name: string;
  score: number;
  hexColor: string;
  answers: Answer[];
  highestAnswerId: number
};

export type Answer = {
  position: number;
  category: string;
  totalScore: number;
  totalAnswers: number;
  hasError: boolean;
};
