export interface ResponseVideoFormat {
  itag: number;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  initRange: { start: string; end: string };
  indexRange: { start: string; end: string };
  lastModified: string;
  contentLength: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  averageBitrate: number;
  approxDurationMs: string;
  signatureCipher: string;

  url?: string;

  colorInfo?: {
    primaries: string;
    transferCharacteristics: string;
    matrixCoefficients: string;
  };
}
