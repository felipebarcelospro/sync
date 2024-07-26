# NextCron Node.js SDK

This SDK provides a simple and efficient way to integrate the NextCron task scheduling service into your Node.js or TypeScript applications.

## Features

- Easy to use: Publish and manage tasks with just a few lines of code.
- Serverless friendly: Ideal for serverless architectures.
- Supports various job configurations: Including delay, retry, schedule, and endpoint protection.
- Comprehensive documentation: Detailed guides and examples available.

## Installation
```bash
npm install nextcron
```

## Usage
Here's a quick start example:

```javascript
import { NextCron } from 'nextcron';

const nextcron = new NextCron('your-api-key-here');

// Publish a job
await nextcron.publish({
  topic: 'my-topic',
  target: 'http://myapi.com/endpoint',
  method: 'POST',
  data: { key: 'value' }
});
```

### Delaying a Job
Delay job execution by specifying a delay in milliseconds.

```javascript
await nextcron.publish({
  // ... other options
  opts: { delay: 60000 } // Delay of 1 minute
});
```

### Retrying a Job
Configure retry strategies for your jobs.

```javascript
await nextcron.publish({
  // ... other options
  opts: { attempts: 5, backoff: 30000 } // Retry up to 5 times with a 30-second backoff
});
```

### Scheduling Jobs

Use CRON expressions for scheduling tasks.

```javascript
await nextcron.publish({
  // ... other options
  opts: { repeat: { pattern: '0 */2 * * *' } } // Every 2 hours
});
```

## Explore More with NextCron

- [**Retries**](https://docs.nextcron.co/features/retry): Ensure reliable task execution with NextCron’s robust retry mechanisms.
- [**Delays**](https://docs.nextcron.co/features/delay): Gain control over task timing with customizable delay options.
- [**Scheduling**](https://docs.nextcron.co/features/schedule): Maintain the uniqueness of your tasks and avoid redundant processing.
- [**Protecting endpoints**](https://docs.nextcron.co/security/protecting-endpoints): Secure your public APIs with our straightforward request signing feature.

## Support

For support, questions, or feedback, please visit our [documentation](https://docs.nextcron.co/), or reach out on [Twitter](https://twitter.com/feldbarcelospro).

## About

NextCron was created by [Felipe Barcelos](https://twitter.com/feldbarcelospro). For more information, visit [NextCron's website](https://nextcron.co/).

