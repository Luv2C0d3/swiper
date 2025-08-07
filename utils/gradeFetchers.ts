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
    message: "Fetching data from Kualung University"
  });
};

export const fetchSportsGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'sports' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 8,
    message: "Fetching grading criteria from Tutulum College"
  });
};

export const fetchGardeningGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'gardening' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 6,
    message: "Fetching horticulture data from Green Thumb Institute"
  });
};

export const fetchMarketingGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'marketing' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 9,
    message: "Fetching campaign metrics from Digital Marketing Academy"
  });
};

export const fetchArtsGrade = (id: string): Promise<GradeFetchResult> => {
  console.log(`fetching 'arts' grade for profile with id '${id}'`);
  return Promise.resolve({
    grade: 7,
    message: "Fetching portfolio review from Creative Arts University"
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
