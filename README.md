# Jain Community Karnal — GitHub Pages + Supabase

## Upload these files to your repository
Upload everything in this folder to:
`jaincommunitykarnal.github.io`

## 1. Create Supabase database
Open Supabase → SQL Editor → New query.
Paste and run:
`supabase/schema.sql`

## 2. Create organizer account
Supabase → Authentication → Users → Add user.
Create the organizer's email/password.

## 3. Connect the website
Open `js/config.js` and replace:
- PASTE_YOUR_SUPABASE_URL
- PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY

Use the browser-safe publishable/anon key only. Never use a service-role key.

## 4. GitHub Pages
Repository → Settings → Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

Save.

## 5. Important security note
The starter schema treats every authenticated Supabase user as an organizer. Before public launch, add a `user_roles` table and restrict organizer policies to approved organizer accounts.

Public pages intentionally do not expose member phone numbers.

## Current Paath dates
The SQL seeds 10–19 September 2026, 24 hourly slots/day, capacity 4 per slot. Change the generated dates in `schema.sql` if your community confirms different dates.
