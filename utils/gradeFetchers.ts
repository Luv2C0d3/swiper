import { AchievementType } from './dataLoader';

// Interface for grade fetching result
export interface GradeFetchResult {
  grade: number;
  message: string;
}

// Stub functions for grade fetching with custom messages
export const fetchEconomyGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'economy' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 7,
    message: "Buscando dados da Universidade de Kualung"
  });
};

export const fetchSportsGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'sports' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 8,
    message: "Buscando critérios de avaliação do Colégio Tutulum"
  });
};

export const fetchGardeningGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'gardening' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 6,
    message: "Buscando dados de horticultura do Instituto Green Thumb"
  });
};

export const fetchMarketingGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'marketing' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 9,
    message: "Buscando métricas de campanha da Academia de Marketing Digital"
  });
};

export const fetchArtsGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'arts' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 7,
    message: "Buscando análise de portfólio da Universidade de Artes Criativas"
  });
};

// Map of achievement types to their corresponding fetch functions
export const gradeFetchers: Record<AchievementType, (id: string) => Promise<GradeFetchResult>> = {
  economy: fetchEconomyGrade,
  sports: fetchSportsGrade,
  gardening: fetchGardeningGrade,
  marketing: fetchMarketingGrade,
  arts: fetchArtsGrade,
};
