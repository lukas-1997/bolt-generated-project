import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kcjvdvgocwwkynjdfphz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjanZkdmdvY3d3a3luamRmcGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNjAxNjQsImV4cCI6MjA1MzczNjE2NH0.7hUW_czNaZICHaniWax26VnjCUv8-1cqwwdydAjKx0M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
