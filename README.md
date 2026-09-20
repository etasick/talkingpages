# TalkingPages

### AI-powered web content and voice platform

**TalkingPages** is a web-based SaaS application that combines web content extraction, AI processing and voice technologies to transform ordinary web pages into a more interactive, accessible experience.

The project was designed and developed as a full-stack cloud application, integrating modern web technologies with **AWS, Cloudflare, OpenAI and third-party content services**.

**Live application:** https://talkingpages.vercel.app/

---

## Overview

The idea behind TalkingPages is simple:

> **Make web pages come to life.**

The platform explores how AI and voice technologies can be used to make online content easier to consume and interact with.

The application processes web content, works with AI-powered services, and manages generated audio through a cloud-based architecture.

The project also serves as a practical exploration of building and deploying a production-oriented SaaS application using multiple cloud platforms and managed services.

---

## Key Features

* AI-powered processing of web content
* Web content extraction and readability processing
* Voice/audio generation workflows
* Cloud-based audio storage
* User authentication
* API-based application architecture
* Server-side processing
* Responsive web interface
* Automated cloud infrastructure
* Scheduled background processing
* SEO and sitemap generation
* Integration with external APIs and services

---

## Technology Stack

### Frontend

* **Next.js**
* **React**
* Tailwind CSS
* Styled Components
* React Icons
* Heroicons

### Backend & APIs

* Next.js API routes
* AWS Amplify APIs
* REST APIs
* Axios
* Node.js
* OpenAI API

### Cloud & Infrastructure

* **AWS Amplify**
* **AWS services**
* **Cloudflare Workers**
* **Cloudflare R2**
* **Cloudflare D1**
* **Vercel**

### Content Processing

* Mozilla Readability
* JSDOM
* Sanity
* Firebase

### Development

* JavaScript
* Git / GitHub
* ESLint
* PostCSS
* Tailwind CSS

---

# Architecture

TalkingPages uses a multi-service cloud architecture rather than relying on a single hosting provider.

At a high level:

```text
                         ┌──────────────────────┐
                         │      User / Web      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js         │
                         │   React Frontend     │
                         └──────────┬───────────┘
                                    │
                   ┌────────────────┼─────────────────┐
                   │                │                 │
                   ▼                ▼                 ▼
             AWS Amplify        OpenAI API       Content Services
             Authentication     AI Processing     / Extraction
             & APIs
                   │
                   │
                   ▼
          ┌───────────────────────┐
          │ Cloudflare Workers    │
          │ Server-side Services  │
          └───────────┬───────────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
       Cloudflare R2       Cloudflare D1
       Audio Storage       Application Data
```

The actual implementation uses several managed services, allowing different parts of the application to use infrastructure appropriate to their requirements.

---

# Cloudflare Infrastructure

One of the infrastructure components of the project is Cloudflare's developer platform.

The project is configured to use:

### Cloudflare R2

Used for cloud-based storage of generated audio assets.

```text
AUDIO_BUCKET → Cloudflare R2
```

### Cloudflare D1

Used as a serverless SQL database for application-related data.

```text
DB → Cloudflare D1
```

### Cloudflare Workers

Workers provide server-side processing and integration between the application and Cloudflare's infrastructure.

### Scheduled Processing

The project also contains a scheduled trigger configured to execute every six hours:

```text
0 */6 *
```

This demonstrates the use of scheduled serverless workloads rather than relying exclusively on traditional always-running servers.

---

# AWS Integration

TalkingPages also integrates AWS services through **AWS Amplify**.

The project uses Amplify components for application APIs and authentication.

Relevant dependencies include:

* `aws-amplify`
* `@aws-amplify/auth`
* `@aws-amplify/api-rest`
* `@aws-amplify/ui-react`
* AWS Amplify CLI

This provides practical experience with:

* Cloud authentication
* API integration
* Managed cloud services
* Application configuration
* Cloud-based application architecture

---

# AI Integration

TalkingPages integrates the **OpenAI API** as part of its AI-powered functionality.

The project uses the OpenAI JavaScript SDK to communicate with AI services.

This provides experience with:

* API authentication
* Third-party API integration
* AI service integration
* Server-side API calls
* Processing application data through external AI services

---

# Web Content Processing

The application includes technologies for extracting and processing web content.

Notable dependencies include:

* Mozilla Readability
* JSDOM
* Axios
* Node Fetch

These technologies allow the application to work with external web content and process pages before passing relevant information through the application's processing pipeline.

---

# Authentication

The application integrates authentication through **AWS Amplify**.

This allows the project to demonstrate practical experience with:

* User authentication
* Authenticated application workflows
* Cloud identity services
* Frontend authentication state
* API integration

---

# Development & Deployment

TalkingPages is built using Next.js and is deployed as a live web application.

The project includes production-oriented configuration for:

* Next.js builds
* ESLint
* Tailwind CSS
* Sitemap generation
* Cloudflare Workers
* Cloudflare R2
* Cloudflare D1
* AWS Amplify

### Local Development

Clone the repository:

```bash
git clone https://github.com/etasick/talkingpages.git
cd talkingpages
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Environment Variables

The application integrates several external services.

Before running the complete application locally, configure the required environment variables for the services used by the project.

Typical categories include:

* AWS / Amplify configuration
* OpenAI API configuration
* Cloudflare configuration
* Database configuration
* Authentication configuration
* Third-party service credentials

**Never commit production API keys, secrets or credentials to the repository.**

---

# Engineering Highlights

TalkingPages demonstrates practical experience in several areas of modern software engineering:

### Full-stack development

The project combines frontend, backend/API and cloud infrastructure rather than being only a frontend application.

### Cloud architecture

The application integrates AWS, Cloudflare and Vercel services for different infrastructure requirements.

### Serverless architecture

Cloudflare Workers, R2 and D1 provide serverless infrastructure for application processing, storage and data.

### API integration

The application communicates with external services including OpenAI and cloud APIs.

### Authentication

AWS Amplify is used for authentication and application access.

### Content processing

The project processes external web content using technologies such as Mozilla Readability and JSDOM.

### SaaS development

The application was developed as a cloud-hosted SaaS-style product rather than simply as a local demonstration project.

---

# Why I Built This

TalkingPages was created as an exploration of how **AI, cloud computing and voice technologies can change the way people consume information on the web**.

The project also provided an opportunity to work across several layers of modern application engineering:

**Frontend → APIs → AI → Authentication → Cloud Infrastructure → Storage → Databases → Deployment**

---

# Project Status

The project is deployed and available online.

**Live:** https://talkingpages.vercel.app/

The codebase remains an active technical project and may evolve as new features and infrastructure improvements are introduced.

---

# Author

**Eta Dalton Asick**

Computer Engineer | Software Engineer | Cloud & Cybersecurity

GitHub: https://github.com/etasick

---

# License

See the repository for licensing information.
