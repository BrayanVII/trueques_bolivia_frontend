export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar: string;
  ubicacion: string;
  rating: number;
  articulosDisponibles: number;
  articulosIntercambiados: number;
  descripcion?: string;
  verificado?: boolean;
  rol?: 'usuario' | 'administrador';
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

export interface UsuarioAutenticado extends Usuario {
  token?: string;
}