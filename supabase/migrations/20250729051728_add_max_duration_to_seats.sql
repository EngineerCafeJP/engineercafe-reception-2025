-- Add max_duration to seats table 最大利用時間
ALTER TABLE public.seats
ADD COLUMN usage_duration_minutes INTEGER NOT NULL DEFAULT 120;

ALTER TABLE public.seat_usage_logs
ADD COLUMN usage_duration_minutes INTEGER NOT NULL DEFAULT 120;