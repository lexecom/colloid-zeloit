/**
 * Production-safe logging utility
 * Only logs in development environment
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    if (isDev) {
      console.error(...args);
    } else {
      // In production, only log basic error info without sensitive data
      if (args[0] && typeof args[0] === 'string') {
        console.error(args[0]);
      }
    }
  },
  
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args);
    }
  },
  
  // Always log critical errors even in production (but sanitized)
  critical: (message: string, error?: any) => {
    console.error('Critical error:', message);
    if (isDev && error) {
      console.error('Error details:', error);
    }
  }
};

export default logger;
