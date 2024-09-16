export function authService(api) {
  return {
    async login(email: string, password: string) {
      console.log('Attempting login with:', { email, password });
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Login failed with error:', error);
        throw new Error(error.message || 'Invalid email or password');
      }

      const data = await response.json();
      console.log('Login successful, token received:', data.token);
      return data.token;
    },
    setToken(token: string) {
      localStorage.setItem('authToken', token);
    }
  };
}