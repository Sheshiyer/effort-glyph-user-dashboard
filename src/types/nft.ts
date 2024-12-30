import { z } from 'zod';

// Base trait schema
export const TraitSchema = z.object({
  trait_type: z.string(),
  value: z.union([z.string(), z.number()]),
  display_type: z.string().optional(),
});

// Category-specific trait schemas
export const ProjectContributionsSchema = z.object({
  project_name: z.string(),
  role: z.string(),
  achievements: z.array(z.string()),
});

export const SkillSetSchema = z.object({
  primary_skill: z.string(),
  skill_level: z.enum(['Beginner', 'Intermediate', 'Expert']),
  secondary_skills: z.array(z.string()),
});

export const PerformanceMetricsSchema = z.object({
  tasks_completed: z.number(),
  quality_score: z.number().min(0).max(100),
  efficiency_rating: z.number().min(0).max(100),
});

export const AttendanceRecordSchema = z.object({
  days_worked: z.number(),
  punctuality_percentage: z.number().min(0).max(100),
  overtime_hours: z.number(),
});

// Complete NFT Metadata schema
export const NFTMetadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  external_url: z.string().url().optional(),
  attributes: z.array(TraitSchema),
  project_contributions: ProjectContributionsSchema,
  skill_set: SkillSetSchema,
  performance_metrics: PerformanceMetricsSchema,
  attendance_record: AttendanceRecordSchema,
});

export type NFTTrait = z.infer<typeof TraitSchema>;
export type ProjectContributions = z.infer<typeof ProjectContributionsSchema>;
export type SkillSet = z.infer<typeof SkillSetSchema>;
export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;
export type NFTMetadata = z.infer<typeof NFTMetadataSchema>;