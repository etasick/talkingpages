import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

// Configure Amplify
Amplify.configure({
  ...awsconfig,
  ssr: true // Enable server-side rendering
});