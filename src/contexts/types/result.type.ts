export interface Result {}

export interface ImmediateRecallResult extends Result {
  ir_rt_first: number;
  ir_rt_second: number | null;
  ir_score: number; // between 0 - 2
}

export interface DelayedRecallResult extends Result {
  dr_rt: number;
  dr_score: number; // between 0 - 5
}

export interface DigitSymbolMatchingResult extends Result {
  dsm_rt: number;
  dsm_correct: boolean;
  dsm_response: number; // between 1 - 3
}

export interface ChoiceReactionTimeResult extends Result {
  crt_rt: number;
  crt_correct: boolean;
  crt_response: "left" | "right";
  crt_dwell: number;
}

export interface SpatialMemoryResult extends Result {
  sm_rt: number;
  sm_correct: boolean;
}

export interface VisualPairedAssociatesResult extends Result {
  vp_rt: number;
  vp_correct: boolean;
  vp_response: number; // image file name
}
