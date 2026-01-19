-- Drop auth tables from public schema
-- Safe to run because auth data is now in app schema

DROP TABLE IF EXISTS "public"."Account" CASCADE;
DROP TABLE IF EXISTS "public"."Session" CASCADE;
DROP TABLE IF EXISTS "public"."Authenticator" CASCADE;
DROP TABLE IF EXISTS "public"."VerificationToken" CASCADE;
DROP TABLE IF EXISTS "public"."User" CASCADE;
