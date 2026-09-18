"""
main.py
───────
FastAPI application exposing all TeachAI tools as HTTP endpoints.

Endpoints:
  GET  /                          → health check
  POST /api/lesson-plan           → generate lesson plan
  POST /api/quiz                  → generate quiz
  POST /api/worksheet             → generate worksheet
  POST /api/activity              → generate classroom activity
  POST /api/assistant             → AI Assistant (orchestrator)
  POST /api/materials             → generate teaching materials
  POST /api/student-performance   → analyze student performance
  POST /api/student-questions     → analyze student questions
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import (
    LessonPlanRequest,
    QuizGeneratorRequest,
    WorksheetGeneratorRequest,
    ActivityGeneratorRequest,
    AIAssistantRequest,
    TeachingMaterialsRequest,
    StudentPerformanceRequest,
    StudentQuestionsRequest,
)

from .ai_engine import (
    generate_lesson_plan,
    generate_quiz,
    generate_worksheet,
    generate_activity,
    ai_assistant,
    generate_teaching_materials,
    analyze_student_performance,
    analyze_student_questions,
)


# ═══════════════════════════════════════════════════════════
# App Setup
# ═══════════════════════════════════════════════════════════

app = FastAPI(
    title="TeachAI API",
    description="Backend API for TeachAI — an AI teaching copilot for educators.",
    version="1.0.0",
)


# ═══════════════════════════════════════════════════════════
# CORS (allow the frontend dev server to call this API)
# ═══════════════════════════════════════════════════════════

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8443",   # Figma Make / Vite default
        "http://127.0.0.1:8443",
        "http://localhost:5173",   # Vite default fallback
        "http://127.0.0.1:5173",
        "http://localhost:3000",   # React default fallback
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ═══════════════════════════════════════════════════════════
# Health Check
# ═══════════════════════════════════════════════════════════

@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "TeachAI API",
        "version": "1.0.0",
        "docs": "/docs",
    }


# ═══════════════════════════════════════════════════════════
# Tool Endpoints
# ═══════════════════════════════════════════════════════════

@app.post("/api/lesson-plan")
def api_lesson_plan(request: LessonPlanRequest):
    try:
        return generate_lesson_plan(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/quiz")
def api_quiz(request: QuizGeneratorRequest):
    try:
        return generate_quiz(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/worksheet")
def api_worksheet(request: WorksheetGeneratorRequest):
    try:
        return generate_worksheet(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/activity")
def api_activity(request: ActivityGeneratorRequest):
    try:
        return generate_activity(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/assistant")
def api_assistant(request: AIAssistantRequest):
    try:
        return ai_assistant(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/materials")
def api_materials(request: TeachingMaterialsRequest):
    try:
        return generate_teaching_materials(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/student-performance")
def api_student_performance(request: StudentPerformanceRequest):
    try:
        return analyze_student_performance(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/student-questions")
def api_student_questions(request: StudentQuestionsRequest):
    try:
        return analyze_student_questions(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))