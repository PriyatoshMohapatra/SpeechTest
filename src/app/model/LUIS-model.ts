export interface TopScoringIntent {
    intent: string;
    score: number;
}

export interface Intent {
    intent: string;
    score: number;
}

export interface Entity {
    entity: string;
    type: string;
    startIndex: number;
    endIndex: number;
    score: number;
}

export interface RootModel {
    query: string;
    topScoringIntent: TopScoringIntent;
    intents: Intent[];
    entities: Entity[];
}

