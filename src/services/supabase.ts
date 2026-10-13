import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sxkuhnghlotpwrprodup.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a3VobmdobG90cHdycHJvZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NDY4MjksImV4cCI6MjEwNzQyMjgyOX0.nplseXSZR1DIs9LZHH4BevAco9nJDLYk5LgaB32PEl4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});