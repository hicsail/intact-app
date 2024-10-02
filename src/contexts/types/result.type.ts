export interface ImmediateRecallResult {
  ir_rt_first: number;
  ir_rt_second: number | null;
  ir_score: number; // between 0 - 2
}

export interface DelayedRecallResult {
  dr_rt: number;
  dr_score: number; // between 0 - 5
}

export interface DigitSymbolMatchingResult {
  dsm_rt: number;
  dsm_correct: boolean;
  dsm_response: number; // between 1 - 3
}

export interface ChoiceReactionTimeResult {
  crt_rt: number;
  crt_correct: boolean;
  crt_response: "left" | "right";
  crt_dwell: number;
}

export interface SpatialMemoryResult {
  sm_rt: number;
  sm_correct: boolean;
}

export interface VisualPairedAssociatesResult {
  vpa_rt: number;
  vpa_correct: boolean;
  vpa_response: string; // image file name
}
