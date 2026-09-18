// src/lib/api.ts
// ═══════════════════════════════════════════════════════════
// API client for TeachAI backend (FastAPI).
//
// Base URL:
//   - Local: http://localhost:8000 (default)
//   - Production: set VITE_API_URL in .env / Vercel
// ═══════════════════════════════════════════════════════════

import type {
  LessonPlanRequest,
  LessonPlanOutput,
  QuizGeneratorRequest,
  QuizOutput,
  WorksheetGeneratorRequest,
  WorksheetOutput,
  ActivityGeneratorRequest,
  ActivityOutput,
  AIAssistantRequest,
  AIAssistantResponse,
  TeachingMaterialsRequest,
  TeachingMaterialsOutput,
  StudentPerformanceRequest,
  StudentPerformanceOutput,
  StudentQuestionsRequest,
  StudentQuestionsOutput,
} from "./type";

const API_URL: string =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

// ═══════════════════════════════════════════════════════════
// Core fetch helper
// ═══════════════════════════════════════════════════════════

async function post<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      `Cannot reach backend at ${API_URL}. Make sure the server is running.`
    );
  }

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      detail = err.detail || JSON.stringify(err);
    } catch {
      detail = await res.text();
    }
    throw new Error(`API error: ${detail}`);
  }

  return res.json() as Promise<TRes>;
}

// ═══════════════════════════════════════════════════════════
// Health check
// ═══════════════════════════════════════════════════════════

export async function healthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${API_URL}/`);
  if (!res.ok) throw new Error("Backend is not reachable");
  return res.json();
}

// ═══════════════════════════════════════════════════════════
// Lesson Plan
// ═══════════════════════════════════════════════════════════

export function generateLessonPlan(
  data: LessonPlanRequest
): Promise<LessonPlanOutput> {
  return post<LessonPlanRequest, LessonPlanOutput>("/api/lesson-plan", data);
}

// ═══════════════════════════════════════════════════════════
// Quiz
// ═══════════════════════════════════════════════════════════

export function generateQuiz(
  data: QuizGeneratorRequest
): Promise<QuizOutput> {
  return post<QuizGeneratorRequest, QuizOutput>("/api/quiz", data);
}

// ═══════════════════════════════════════════════════════════
// Worksheet
// ═══════════════════════════════════════════════════════════

export function generateWorksheet(
  data: WorksheetGeneratorRequest
): Promise<WorksheetOutput> {
  return post<WorksheetGeneratorRequest, WorksheetOutput>(
    "/api/worksheet",
    data
  );
}

// ═══════════════════════════════════════════════════════════
// Activity
// ═══════════════════════════════════════════════════════════

export function generateActivity(
  data: ActivityGeneratorRequest
): Promise<ActivityOutput> {
  return post<ActivityGeneratorRequest, ActivityOutput>("/api/activity", data);
}

// ═══════════════════════════════════════════════════════════
// AI Assistant
// ═══════════════════════════════════════════════════════════

export function askAssistant(
  data: AIAssistantRequest
): Promise<AIAssistantResponse> {
  return post<AIAssistantRequest, AIAssistantResponse>("/api/assistant", data);
}

// ═══════════════════════════════════════════════════════════
// Teaching Materials
// ═══════════════════════════════════════════════════════════

export function generateTeachingMaterials(
  data: TeachingMaterialsRequest
): Promise<TeachingMaterialsOutput> {
  return post<TeachingMaterialsRequest, TeachingMaterialsOutput>(
    "/api/materials",
    data
  );
}

// ═══════════════════════════════════════════════════════════
// Student Performance
// ═══════════════════════════════════════════════════════════

export function analyzeStudentPerformance(
  data: StudentPerformanceRequest
): Promise<StudentPerformanceOutput> {
  return post<StudentPerformanceRequest, StudentPerformanceOutput>(
    "/api/student-performance",
    data
  );
}

// ═══════════════════════════════════════════════════════════
// Student Questions
// ═══════════════════════════════════════════════════════════

export function analyzeStudentQuestions(
  data: StudentQuestionsRequest
): Promise<StudentQuestionsOutput> {
  return post<StudentQuestionsRequest, StudentQuestionsOutput>(
    "/api/student-questions",
    data
  );
}