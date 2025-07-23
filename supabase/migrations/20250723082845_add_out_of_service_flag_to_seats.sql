-- Add out_of_service flag to seats table
ALTER TABLE public.seats
ADD COLUMN out_of_service BOOLEAN DEFAULT FALSE NOT NULL;

-- Add attention_message to seats table 注意事項
ALTER TABLE public.seats
ADD COLUMN attention_message TEXT NOT NULL DEFAULT '';

-- Add order to seats table リスト表示順
ALTER TABLE public.seats
ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;