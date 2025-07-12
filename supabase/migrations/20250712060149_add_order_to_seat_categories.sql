-- Add order column to seat_categories table
ALTER TABLE public.seat_categories
ADD COLUMN "order" INTEGER DEFAULT 9999;