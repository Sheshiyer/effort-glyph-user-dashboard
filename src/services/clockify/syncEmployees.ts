import { clockifyApi, supabase } from './config';
import type { ClockifyUser, Employee } from './types';

async function getClockifyUsers(): Promise<ClockifyUser[]> {
  try {
    const response = await clockifyApi.get('/user');
    const workspace = response.data.activeWorkspace;
    const { data: users } = await clockifyApi.get(`/workspace/${workspace}/users`);
    return users;
  } catch (error) {
    console.error('Error fetching Clockify users:', error);
    throw error;
  }
}

function parseUserName(name: string): { first_name: string; last_name: string } {
  const [first_name = '', last_name = ''] = name.split(' ');
  return { first_name, last_name };
}

async function syncEmployees() {
  try {
    console.log('Starting employee sync...');
    
    // Fetch users from Clockify
    const clockifyUsers = await getClockifyUsers();
    
    for (const user of clockifyUsers) {
      const { first_name, last_name } = parseUserName(user.name);
      
      const employee: Employee = {
        email: user.email,
        first_name,
        last_name,
        role: 'Employee', // Default role, update as needed
        start_date: new Date().toISOString().split('T')[0], // Current date as default
        clockify_id: user.id
      };

      // Upsert employee to Supabase
      const { error } = await supabase
        .from('employees')
        .upsert(
          employee,
          { 
            onConflict: 'email',
            ignoreDuplicates: false 
          }
        );

      if (error) {
        console.error(`Error upserting employee ${employee.email}:`, error);
      } else {
        console.log(`Successfully synced employee: ${employee.email}`);
      }
    }

    console.log('Employee sync completed successfully!');
  } catch (error) {
    console.error('Error during employee sync:', error);
    process.exit(1);
  }
}

// Run the sync if this file is executed directly
if (process.argv[1] === import.meta.url) {
  syncEmployees();
}