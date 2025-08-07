import yaml from 'js-yaml';
import { Asset } from 'expo-asset';

export type BadgeType = 'star' | 'trophy' | 'leaf' | 'fire' | 'gem';
export type AchievementType = 'economy' | 'sports' | 'gardening' | 'marketing' | 'arts';

export interface GradeFetchingMethod {
  name: AchievementType;
  method: string;
  args: string[];
}

export interface Achievement {
  name: AchievementType;
  grade?: number;
  description: string;
}

export interface Profile {
  id: string;
  name: string;
  image: string;
  achievements: Achievement[];
}

export interface AppData {
  grade_fetching_methods: GradeFetchingMethod[];
  profiles: Profile[];
  achievement_badges: Record<AchievementType, BadgeType>;
}

export class ProfileRepository {
  async fetchAppData(): Promise<AppData | null> {
    try {
      // For now, we'll use the hardcoded data but in a more maintainable way
      // In a real app, you could use Expo's asset system or fetch from a remote API
      const yamlData = `
grade_fetching_methods:
  - name: economy
    method: fetchEconomyGrade
    args:
      - id
  - name: sports
    method: fetchSportsGrade
    args:
      - id
  - name: gardening
    method: fetchGardeningGrade
    args:
      - id
  - name: marketing
    method: fetchMarketingGrade
    args:
      - id
  - name: arts
    method: fetchArtsGrade
    args:
      - id

profiles:
  - id: '1'
    name: 'Sophia Chen'
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
    achievements:
      - name: economy
        grade: 7
        description: >
          Sophia demonstrou habilidades excepcionais em gestão financeira e análise econômica.
          Ela gerenciou com sucesso diversos portfólios de investimento e forneceu orientação
          financeira estratégica para startups.
      - name: sports
        grade: 8
        description: >
          Sophia é uma atleta talentosa que competiu em nível regional na natação.
          Ela mantém um estilo de vida ativo e gosta de treinar equipes esportivas juvenis.
      - name: gardening
        grade: 6
        description: >
          Sophia tem mão verde e mantém um belo jardim orgânico. Ela cultiva
          seus próprios vegetais e ervas, e compartilha seu conhecimento com a comunidade.
      - name: marketing
        grade: 9
        description: >
          Sophia liderou campanhas de marketing bem-sucedidas para várias empresas, aumentando
          o reconhecimento de marca e gerando crescimento significativo de receita por meio de estratégias inovadoras.
      - name: arts
        grade: 7
        description: >
          Sophia é uma talentosa pintora e fotógrafa. Seu trabalho foi exibido
          em galerias locais e ela participa regularmente de eventos artísticos comunitários.

  - id: '2'
    name: 'Liam Zhang'
    image: 'https://randomuser.me/api/portraits/men/33.jpg'
    achievements:
      - name: economy
        grade: 8
        description: >
          Liam tem uma sólida formação em economia e trabalhou como analista financeiro
          para grandes corporações, especializando-se em tendências de mercado e estratégias de investimento.
      - name: marketing
        grade: 9
        description: >
          Liam se destaca em marketing digital e ajudou diversas empresas a aumentarem
          sua presença online e o engajamento dos clientes por meio de campanhas baseadas em dados.
      - name: gardening
        grade: 5
        description: >
          Liam gosta de jardinagem urbana e transformou a varanda de seu apartamento
          em um mini-jardim vibrante com ervas, flores e pequenos vegetais.

  - id: '3'
    name: 'Ava Kumar'
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
    achievements:
      - name: sports
        grade: 9
        description: >
          Ava é uma corredora dedicada e instrutora de yoga. Ela completou diversas
          maratonas e ajuda outras pessoas a atingirem seus objetivos de fitness com treinamentos personalizados.
      - name: arts
        grade: 8
        description: >
          Ava é uma musicista habilidosa que toca vários instrumentos e compõe suas próprias músicas.
          Ela se apresenta regularmente em locais locais e ensina música para crianças.
      - name: marketing
        grade: 7
        description: >
          Ava é especializada em marketing de mídia social e criação de conteúdo. Ela construiu
          comunidades online sólidas e ajudou marcas a se conectarem de forma autêntica com seu público.
      - name: gardening
        grade: 6
        description: >
          Ava pratica técnicas de jardinagem sustentável e foca em plantas nativas
          que apoiam os ecossistemas locais e a vida selvagem.

achievement_badges:
  economy: star
  sports: trophy
  gardening: leaf
  marketing: fire
  arts: gem
`;

      const parsed = yaml.load(yamlData) as AppData;
      return parsed;
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return null;
    }
  }

  async fetchAllProfiles(): Promise<Profile[]> {
    try {
      const data = await this.fetchAppData();
      return data?.profiles || [];
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return [];
    }
  }

  async fetchGradeFetchingMethods(): Promise<GradeFetchingMethod[]> {
    try {
      const data = await this.fetchAppData();
      return data?.grade_fetching_methods || [];
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return [];
    }
  }

  async fetchAchievementBadges(): Promise<Record<AchievementType, BadgeType>> {
    try {
      const data = await this.fetchAppData();
      return data?.achievement_badges || {
        economy: 'star',
        sports: 'trophy',
        gardening: 'leaf',
        marketing: 'fire',
        arts: 'gem',
      };
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return {
        economy: 'star',
        sports: 'trophy',
        gardening: 'leaf',
        marketing: 'fire',
        arts: 'gem',
      };
    }
  }
}
