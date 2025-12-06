// src/types/index.ts

export interface Usuario {
  id: number; // 👈 Cambiado de string a number
  nombre: string;
  correo: string; // 👈 Cambiado de email a correo
  apellidoPaterno?: string; // 👈 NUEVO
  apellidoMaterno?: string; // 👈 NUEVO
  avatar?: string;
  ubicacion?: string;
  rating?: number;
  articulosDisponibles?: number;
  articulosIntercambiados?: number;
  descripcion?: string;
  verificado?: boolean;
  roles: string[]; // 👈 Cambiado de rol único a array de roles
}

export interface Articulo {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  categoria: string;
  estado: 'disponible' | 'intercambiado' | 'pendiente';
  usuario: Usuario;
  fechaPublicacion: Date;
  vistas?: number;
  interes?: number;
}

export interface Truque {
  id: string;
  articuloOfrece: Articulo;
  articuloSolicita: Articulo;
  usuarioOfrece: Usuario;
  usuarioSolicita: Usuario;
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'completado';
  fecha: Date;
  mensajes?: string[];
}

// 👇 ACTUALIZADO: UsuarioAutenticado con token obligatorio
export interface UsuarioAutenticado extends Usuario {
  token: string; // 👈 Cambiado a obligatorio (sin ?)
}