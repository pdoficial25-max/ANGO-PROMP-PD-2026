
import { createClient } from '@supabase/supabase-js';

// URL do seu projeto Supabase
const supabaseUrl = 'https://jbzhccnbfdbojiweemqs.supabase.co';

// Chave anônima correta fornecida para o projeto jbzhccnbfdbojiweemqs
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiemhjY25iZmRib2ppd2VlbXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NjY5MTgsImV4cCI6MjA4MjQ0MjkxOH0.SMrXmwhguTVdjDLs9a2qlYYlJ6oCmlR7cZrm3B4LuWk'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
