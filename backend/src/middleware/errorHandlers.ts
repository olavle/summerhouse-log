import { NextFunction, Request, Response } from 'express';

export const errorLogger = (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.error(error);
  next(error);
};

export const errorResponder = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(
    'hello from errorResponder with error:',
    error,
    'the error message:',
    error.message,
    'and error name:',
    error.name
  );
  if (error.message === 'parse-fail') {
    console.log('Data parser failed');
    res.status(400).json({
      message: 'Problem with input'
    });
  }
  if (error.message === 'no-user' || error.message === 'no-password') {
    console.log('error.name:', error.name);
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
  if (error.name === 'InvalidTokenError') {
    res.status(401).json({
      message: 'Please login',
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
  res.status(500);
  next(error);
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Unkwon endpoint',
  });
};
