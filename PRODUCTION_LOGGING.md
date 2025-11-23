# 🔒 Production-Safe Logging Guide

## Overview

This project implements production-safe logging that automatically hides sensitive debug information in production while maintaining useful error tracking.

## 📁 Logger Utility

**Location**: `src/lib/utils/logger.ts`

The logger utility provides several logging levels:

```typescript
import logger from '@/lib/utils/logger';

// Development only - hidden in production
logger.log('Debug info:', data);
logger.info('Info message');
logger.debug('Debug details');
logger.warn('Warning message');

// Error logging - sanitized in production
logger.error('Error occurred:', error);

// Critical errors - always logged (sanitized)
logger.critical('Critical system error', error);
```

## 🔧 How It Works

### Development Environment
- **All logs visible**: Complete debug information, errors with stack traces
- **Full context**: Request bodies, response data, internal calculations
- **Emojis and formatting**: Easy to read console output

### Production Environment
- **Debug logs hidden**: No console.log, console.info, console.debug output
- **Error logs sanitized**: Only essential error messages, no sensitive data
- **Critical errors tracked**: System errors still logged for monitoring
- **Performance optimized**: No unnecessary console operations

## 🌍 Environment Detection

The logger automatically detects the environment using `process.env.NODE_ENV`:

```typescript
const isDev = process.env.NODE_ENV === 'development';
```

## 📊 What Gets Logged Where

### Development (`NODE_ENV=development`)
```
✅ API request bodies
✅ Marketing parameters  
✅ Price calculations
✅ Webhook attempts
✅ Google Sheets updates
✅ Error stack traces
✅ Success confirmations
```

### Production (`NODE_ENV=production`)
```
❌ API request bodies (hidden)
❌ Marketing parameters (hidden)
❌ Price calculations (hidden)
❌ Webhook debug info (hidden)
❌ Detailed error traces (hidden)
✅ Critical system errors (sanitized)
✅ Webhook failures (basic message only)
```

## 🔐 Security Benefits

1. **No Sensitive Data Leakage**: Customer info, API keys, internal data stays hidden
2. **Clean Production Logs**: Only essential information in production
3. **Better Performance**: No unnecessary console operations
4. **Compliance Ready**: Meets privacy requirements for customer data
5. **Easy Debugging**: Full information available in development

## 📝 Usage Examples

### ✅ Good Usage

```typescript
// Safe - automatically hidden in production
logger.log('Processing order:', orderId);

// Safe - error handling with proper sanitization
logger.error('Webhook failed:', error);

// Safe - critical errors always logged (sanitized)
logger.critical('Database connection failed', dbError);
```

### ❌ Avoid These

```typescript
// Don't use console.log directly
console.log('Customer data:', customerInfo); // ❌

// Don't log sensitive info even with logger
logger.log('API Key:', process.env.SECRET_KEY); // ❌

// Don't include PII in production logs
if (process.env.NODE_ENV === 'production') {
  console.log('Customer email:', email); // ❌
}
```

## 🚀 Deployment Verification

To verify logging is working correctly in production:

### 1. Check Environment Variables
```bash
# In production
echo $NODE_ENV
# Should output: production
```

### 2. Test Log Output
Deploy to staging/production and verify:
- No debug logs appear in console
- Error logs are sanitized
- Critical errors still get logged

### 3. Monitor Performance
- Console operations don't impact performance
- No memory leaks from excessive logging

## 🛠️ Customization

### Adding New Log Levels

```typescript
// In logger.ts
export const logger = {
  // ... existing methods
  
  // Custom business logic logging
  business: (message: string, data?: any) => {
    if (isDev) {
      console.log(`[BUSINESS] ${message}`, data);
    }
    // Maybe also send to analytics in production
  }
};
```

### Environment-Specific Logging

```typescript
// Different behavior per environment
logger.webhook = (status: string, data: any) => {
  if (isDev) {
    console.log('🔗 Webhook:', status, data);
  } else if (process.env.NODE_ENV === 'staging') {
    console.log('Webhook status:', status);
  }
  // Production: silent
};
```

## 📋 Monitoring in Production

Even with hidden logs, you can still monitor your application:

1. **Error Tracking**: Use services like Sentry, LogRocket
2. **Performance Monitoring**: Vercel Analytics, New Relic
3. **Custom Analytics**: Send important events to your tracking system
4. **Health Checks**: Monitor webhook success rates via Google Sheets data

## 🔍 Debugging Production Issues

When issues occur in production:

1. **Check Google Sheets**: Webhook status column shows success/failure
2. **Use Staging**: Deploy to staging with development logging
3. **Selective Logging**: Temporarily enable specific logs for debugging
4. **Error Services**: Check external error monitoring tools

## ✅ Best Practices

1. **Always use logger utility** instead of direct console calls
2. **Sanitize sensitive data** before logging
3. **Use appropriate log levels** (log, error, critical)
4. **Test in production-like environment** before deploying
5. **Monitor critical errors** even when hidden from console
6. **Document what gets logged** for your team

This logging system ensures your application is both developer-friendly in development and production-ready with proper security and performance.
