You are a Senior Backend + Frontend Engineer.

Project Context:
I am building a Profile Section Resume Upload system.

Tech Stack:
Frontend: React + TypeScript
Backend: FastAPI (Python 3.12)
Database: PostgreSQL (or MySQL acceptable)
Storage: Local Storage now (Cloud ready architecture)
Auth: JWT Token Based
API Version: /api/v2

Current Error:
Upload fails with:
405 Method Not Allowed
POST /api/api/v2/resume/upload

Root Issue Suspected:
Duplicate API prefix (/api/api)
Possible incorrect FastAPI route method
Possible Axios baseURL misconfiguration

--------------------------------

### 🔥 Functional Requirements

Resume Upload Feature:
- Upload resume from Profile Section
- Supported Types: PDF, DOC, DOCX
- Max Size: 5MB
- Store file in:
  uploads/resumes/{user_id}/filename

Database Metadata Save:
Save after upload:
- user_id
- original_filename
- stored_filename
- file_path
- file_size
- mime_type
- upload_timestamp

Return Response:
{
  success: true,
  file_url: "...",
  file_name: "...",
  uploaded_at: "..."
}

--------------------------------

### 🔥 Backend Requirements (FastAPI)

Fix Routing:
Final Working Endpoint MUST BE:
POST /api/v2/resume/upload

Implement:
- APIRouter with prefix separation
- UploadFile handling
- File type validation
- File size validation
- Secure filename generation (UUID)
- Folder auto creation
- Exception handling
- JWT user extraction
- DB metadata insert

Architecture:
app/
 ├ api/v2/
 │   ├ resume_routes.py
 ├ services/
 │   ├ file_service.py
 ├ models/
 │   ├ resume_model.py
 ├ schemas/
 │   ├ resume_schema.py
 ├ core/
 │   ├ config.py

--------------------------------

### 🔥 Frontend Requirements (React TS)

Fix API Path:
Remove duplicate base path.

Correct:
baseURL = http://127.0.0.1:8000/api/v2
endpoint = /resume/upload

Implement:
- Resume Upload Component
- Drag & Drop optional
- Upload Progress Bar
- Error Toast Handling
- Success Toast Handling

Use:
FormData
multipart/form-data

--------------------------------

### 🔥 Security Requirements

- Validate JWT
- Validate file MIME
- Prevent path traversal
- Rename file using UUID
- Limit file size server side

--------------------------------

### 🔥 Database Table

Table: user_resumes

Columns:
id (UUID PK)
user_id (UUID FK)
original_filename (TEXT)
stored_filename (TEXT)
file_path (TEXT)
file_size (INT)
mime_type (TEXT)
uploaded_at (TIMESTAMP)

--------------------------------

### 🔥 Also Fix These Common Issues

Check:
- Axios baseURL duplication
- FastAPI router prefix duplication
- CORS middleware
- multipart/form-data header handling
- nginx proxy path rewrite (if exists)

--------------------------------

### 🔥 Expected Deliverables

Provide:

1️⃣ FastAPI Upload Route (Production Ready)  
2️⃣ File Storage Service Layer  
3️⃣ DB Model + Insert Logic  
4️⃣ React Upload Component  
5️⃣ Axios Config Example  
6️⃣ Error Handling Strategy  
7️⃣ Logging Strategy  

--------------------------------

### 🔥 Bonus (If Possible)

- Cloud storage ready abstraction (S3 ready)
- Resume replace feature
- Resume delete feature
- Resume preview URL

--------------------------------

IMPORTANT:
Avoid duplicate API prefixes.
Ensure endpoint works in Swagger and React UI.
Code must be production clean and modular.
