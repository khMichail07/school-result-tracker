// Demo User Setup Script
// Run this in the browser console to create a demo account

const setupDemoUser = () => {
  const demoUser = {
    id: 'demo-user-001',
    name: 'Demo Teacher',
    username: 'teacher',
    password: 'demo123',
    role: 'teacher',
    createdAt: new Date().toISOString()
  };

  // Get existing users or create new array
  const users = JSON.parse(localStorage.getItem('school-tracker-users') || '[]');
  
  // Check if demo user already exists
  const existingUser = users.find(u => u.username === 'teacher');
  
  if (!existingUser) {
    users.push(demoUser);
    localStorage.setItem('school-tracker-users', JSON.stringify(users));
    console.log('✅ Demo user created successfully!');
    console.log('Username: teacher');
    console.log('Password: demo123');
  } else {
    console.log('ℹ️ Demo user already exists');
  }
};

// Auto-run on page load
if (typeof window !== 'undefined') {
  setupDemoUser();
}

export default setupDemoUser;