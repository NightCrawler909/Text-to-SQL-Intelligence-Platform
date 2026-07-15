# Enterprise Text-to-SQL Intelligence Platform

Welcome to the **Enterprise Text-to-SQL Intelligence Platform**, a robust, full-stack application designed to translate natural language into SQL queries, execute them across various database engines, and visualize the results.

## Overview

This project consists of two main components:
- **Backend (`/backend`)**: A highly scalable Python-based REST API that leverages large language models (LLMs), natural language processing (NLP), and advanced SQL generation capabilities.
- **Frontend (`/frontend`)**: A modern, responsive React-based user interface built with Vite, featuring code editing and data visualization tools.

## Architecture & Features

### Backend
Built with **FastAPI** and **Langchain**, the backend incorporates a wide array of intelligent modules designed for enterprise-grade AI applications.

#### Key Modules
- **api**: Defines the RESTful API endpoints.
- **auth**: Handles user authentication and authorization.
- **llm & prompts**: Manages interactions with Large Language Models and stores sophisticated prompt templates.
- **sql & schema**: Handles SQL generation, schema retrieval, parsing (via SQLGlot), and execution across various dialects.
- **embeddings**: Integrates vector databases (ChromaDB) for semantic search over schema information.
- **confidence & hallucination**: Analyzes the reliability of generated SQL queries to detect and mitigate AI hallucinations.
- **guardrails**: Enforces safety and policy restrictions on generated queries.
- **evaluation & feedback**: Tracks query quality and incorporates user feedback for continuous improvement.
- **monitoring & history**: Logs system performance and maintains user query history.

#### Tech Stack
- **Framework**: FastAPI, Uvicorn
- **AI & Data**: Langchain, ChromaDB
- **Database Tools**: SQLAlchemy, SQLGlot, SQLParse
- **Supported Engines**: MySQL, PostgreSQL, DuckDB, Snowflake

### Frontend
A blazing fast single-page application built with **React** and **Vite**.

#### Key Features
- **Code Editor**: Integration with CodeMirror for syntax-highlighted SQL editing (`@codemirror/lang-sql`).
- **Data Visualization**: Rich interactive charts and graphs using `plotly.js` and `react-plotly.js`.
- **Typing & Linting**: Fully strongly typed with TypeScript, using `oxlint` for lightning-fast linting.

#### Tech Stack
- **Framework**: React 19, Vite
- **Language**: TypeScript
- **Visualization**: Plotly.js
- **Code Editor**: CodeMirror

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the environment variables in `.env`
4. Start the server:
   ```bash
   uvicorn api.main:app --reload
   ```
   *(Note: Replace `api.main:app` with the actual entry point of the FastAPI application.)*

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at the URL provided by Vite (usually `http://localhost:5173`).

## Project Structure
```
Enterprise Text-to-SQL Intelligence Platform/
├── backend/                  # Python FastAPI Backend
│   ├── api/
│   ├── auth/
│   ├── config/
│   ├── core/
│   ├── embeddings/
│   ├── llm/
│   ├── sql/
│   ├── requirements.txt
│   └── ... 
├── frontend/                 # React Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
└── .gitignore
```
