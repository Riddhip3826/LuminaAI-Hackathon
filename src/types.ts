export interface CsvRow {
  Date: string;
  Channel: string;
  Spend: string;
  Revenue: string;
  ROAS: string;
}

export interface AiInsights {
  trends: string[];
  insights: string[];
  predictions: {
    expectedRevenueIncrease: string;
    forecastConfidence: number;
    revenueRange: string;
    roasRange: string;
  };
  healthScore: number;
  executiveSummary?: {
    overallHealth: string;
    biggestOpportunity: string;
    biggestRisk: string;
    nextMonthGrowth: string;
    recommendedAction: string;
  };
  channelIntelligence?: Array<{
    channelName: string;
    score: number;
    contribution: string;
    roasStability: string;
    riskLevel: string;
    aiRecommendation: string;
  }>;
  timelinePredictions?: {
    next7Days: string;
    next30Days: string;
    next60Days: string;
    next90Days: string;
    riskForecast: string;
    revenueProbability: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AppState {
  user: User | null;
  csvData: CsvRow[] | null;
  insights: AiInsights | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
