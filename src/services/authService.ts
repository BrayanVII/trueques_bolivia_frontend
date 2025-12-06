// src/services/authService.ts
const API_URL = 'http://localhost:3000';

export interface LoginData {
  correo: string;
  contrasena: string;
}

export interface RegisterData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  cedula: string;
  telefono: string;
  correo: string;
  contrasena: string;
  genero: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    correo: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    roles: string[];
  };
}

// 👇 EXPORTAR RegisterResponse
export interface RegisterResponse {
  id: number;
  nombre: string;
  correo: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  roles: Array<{ rol: { nombre: string } }>;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Credenciales incorrectas');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Error de conexión con el servidor');
    }
  },

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrar usuario');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Error de conexión con el servidor');
    }
  },

  async checkEmailExists(correo: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/usuarios/check-email?correo=${encodeURIComponent(correo)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return false;

      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      return false;
    }
  },
};