
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucusngylouypldsoltnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
