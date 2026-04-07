import type { Response } from 'express';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class MissingConfigurationError extends HttpError {
  constructor(message: string) {
    super(503, message);
    this.name = 'MissingConfigurationError';
  }
}

export function sendError(response: Response, error: unknown) {
  if (error instanceof HttpError) {
    response.status(error.status).json({ error: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: 'Unexpected server error.' });
}
