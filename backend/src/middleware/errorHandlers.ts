import { NextFunction, Request, Response } from 'express';

export const errorLogger = (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.error('ErrorLogger:', error);
  next(error);
};

export const errorResponder = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.message === 'parse-fail') {
    console.log('Data parser failed');
    res.status(400).json({
      error: 'Problem with input',
    });
  }
  if (error.message === 'no-user' || error.message === 'no-password') {
    console.log('Failed login attempt from:', req.socket.remoteAddress);
    res.status(400).json({
      error: 'Incorrect credentials',
    });
  }
  if (error.message.includes('duplicate')) {
    res.status(400).json({
      error: 'The username already exists',
    });
  }
  if (error.name === 'InvalidTokenError' || error.message === 'no-token') {
    res.status(401).json({
      error: 'Please login',
    });
  }
  if (error.message === 'db-error') {
    console.log('There was an error with the database');
    res.status(400).json({
      error: 'Database error',
    });
  }
  if (error.message === 'admin-error') {
    res.status(401).json({
      error: 'User is not admin for this house',
    });
  }
  if (error.message === 'no-userToAdd') {
    res.status(400).json({
      error: 'No such user',
    });
  }
  if (error.message === 'no-house') {
    res.status(400).json({
      error: 'No such house',
    });
  } else {
    next(error);
  }
};

export const generalError = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    message: 'Unknown error',
  });
  next(error);
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Unkwon endpoint',
  });
};
