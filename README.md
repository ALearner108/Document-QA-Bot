# Document-QA-Bot
# Document Q&A Bot

This web application allows users to upload a PDF or text document and ask questions related to its content. The app consists of a frontend built with React and a backend implemented in Flask, using PDF extraction to process the uploaded documents.

## Features

- **Document Upload**: Users can upload PDF or text files.
- **Content Extraction**: Extracts text from PDF or reads text files.
- **Q&A Interaction**: Allows users to ask questions based on the document content, returning the most relevant text snippet.

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Flask, PyPDF2 (for PDF text extraction)
- **File Handling**: Upload and process PDF/Text documents

## Setup Instructions

Follow the steps below to set up and run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (for frontend development)
- [Python 3.x](https://www.python.org/downloads/) (for backend development)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)

### Frontend Setup (React)

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
