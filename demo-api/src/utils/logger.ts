import exp from 'constants';
import { Request, Response } from 'express';

export interface LoggerOptions {
  method?: boolean;
  url?: boolean;
  headers?: boolean;
  body?: boolean;
  baseUrl?: boolean;
  originalUrl?: boolean;
  path?: boolean;
  query?: boolean;
  params?: boolean;
  referer?: boolean;
}

export const logger = (req: Request, res: Response, options: LoggerOptions) => {
  let log = '';
  log += `${req.method} ${req.url}\n`;
  
  if(options.method) log += `Method: ${req.method}\n`;
  if(options.url) log += `URL: ${req.url}\n`;
  if(options.headers) log += `Headers: ${req.headers}\n`;
  if(options.body) log += `Body: ${req.body}\n`;
  if(options.baseUrl) log += `BaseUrl: ${req.baseUrl}\n`;
  if(options.originalUrl) log += `OriginalUrl: ${req.originalUrl}\n`;
  if(options.path) log += `Path: ${req.path}\n`;
  if(options.query) log += `Query: ${req.query}\n`;
  if(options.params) log += `Params: ${req.params}\n`;
  if(options.referer) log += `Referrer: ${req.headers.referer}\n`;
  
  return log;
}
