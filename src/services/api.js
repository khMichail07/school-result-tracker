const API_URL = 'http://localhost:5000/api';

// ─── Helper ──────────────────────────────────────────────────────────────────

const getToken = () => localStorage.getItem('school-tracker-token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: headers(),
    });
    return handleResponse(res);
  },
};

// ─── Students API ─────────────────────────────────────────────────────────────

export const studentsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/students`, {
      headers: headers(),
    });
    return handleResponse(res);
  },

  getOne: async (id) => {
    const res = await fetch(`${API_URL}/students/${id}`, {
      headers: headers(),
    });
    return handleResponse(res);
  },

  create: async (studentData) => {
    const res = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  update: async (id, studentData) => {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(res);
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return handleResponse(res);
  },

  addResult: async (id, resultData) => {
    const res = await fetch(`${API_URL}/students/${id}/results`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(resultData),
    });
    return handleResponse(res);
  },

  updateResult: async (studentId, resultId, resultData) => {
  const res = await fetch(
    `${API_URL}/students/${studentId}/results/${resultId}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(resultData),
    }
  );

  return handleResponse(res);
},

  deleteResult: async (studentId, resultId) => {
    const res = await fetch(`${API_URL}/students/${studentId}/results/${resultId}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return handleResponse(res);
  },
};

export const studentAPI = {
  getMyResults: async () => {
    const res = await fetch(`${API_URL}/students/my-results`, {
      headers: headers(),
    });
    return handleResponse(res);
  },
};