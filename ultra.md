Fix Resume Upload Production System.

Error:
405 Method Not Allowed
POST /api/api/v2/resume/upload

Stack:
React TS + FastAPI + PostgreSQL + JWT

Need:
- Fix duplicate /api prefix
- Production FastAPI upload route
- File validation (PDF/DOC/DOCX 5MB)
- Store file uploads/resumes/{user_id}
- Save metadata in DB
- React FormData upload UI
- Axios baseURL fix
- UUID file naming
