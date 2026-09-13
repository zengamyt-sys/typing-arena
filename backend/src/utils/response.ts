import { Response } from 'express';
import { SuccessResponse, ErrorResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
  } as SuccessResponse<T>);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  code?: string
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
  } as ErrorResponse);
};
