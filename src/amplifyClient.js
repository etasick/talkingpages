import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Configure Amplify
Amplify.configure({
  ...awsconfig,
  ssr: true // Enable server-side rendering
});

console.log("amplify configured");
