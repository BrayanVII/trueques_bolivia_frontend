import { useNavigate } from 'react-router-dom';
import { Handshake } from "lucide-react";
import React, { useState } from "react";
import {
  Users, BookOpen, Plus, Edit2, Trash2, Menu, X,
  Home, ShoppingBag, LogOut, Bell, Activity, Eye, EyeOff,
  BarChart3, Settings, ChevronDown, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, MapPin, Calendar
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar: string;
  ubicacion: string;
  rating: number;
  articulosDisponibles: number;
  articulosIntercambiados: number;
  verificado: boolean;
  descripcion: string;
  rol?: "Administrador" | "Usuario";
  activo?: boolean;
}

interface Articulo {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  estado: "disponible" | "pendiente" | "intercambiado";
  usuario: Usuario;
  fechaPublicacion: Date;
  vistas: number;
  interes: number;
}

interface UsuarioAdmin extends Usuario {
  correo: string;
  rol: "Administrador" | "Usuario";
  activo: boolean;
}

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

// DATOS DE EJEMPLO
const USUARIOS_INICIALES: UsuarioAdmin[] = [
  {
    id: '1',
    nombre: "Brayan",
    correo: "brayan@gmail.com",
    email: "brayan@gmail.com",
    rol: "Administrador",
    articulosDisponibles: 5,
    activo: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
    ubicacion: 'La Paz, Bolivia',
    rating: 4.8,
    articulosIntercambiados: 12,
    verificado: true,
    descripcion: 'Administrador del sistema',
  },
  {
    id: '2',
    nombre: "Fernando",
    correo: "fernando@gmail.com",
    email: "fernando@gmail.com",
    rol: "Usuario",
    articulosDisponibles: 3,
    activo: true,
    avatar: 'https://i.pravatar.cc/150?img=3',
    ubicacion: 'La Paz, Bolivia',
    rating: 4.5,
    articulosIntercambiados: 8,
    verificado: true,
    descripcion: 'Usuario activo',
  },
  {
    id: '3',
    nombre: "María García",
    correo: "maria@gmail.com",
    email: "maria@gmail.com",
    rol: "Usuario",
    articulosDisponibles: 7,
    activo: false,
    avatar: 'https://i.pravatar.cc/150?img=2',
    ubicacion: 'La Paz, Bolivia',
    rating: 4.9,
    articulosIntercambiados: 25,
    verificado: true,
    descripcion: 'Vendedora de ropa y accesorios',
  },
  {
    id: '4',
    nombre: "Jose",
    correo: "jose@gmail.com",
    email: "jose@gmail.com",
    rol: "Usuario",
    articulosDisponibles: 1,
    activo: true,
    avatar: 'https://i.pravatar.cc/150?img=4',
    ubicacion: 'Cochabamba, Bolivia',
    rating: 4.2,
    articulosIntercambiados: 5,
    verificado: false,
    descripcion: 'Coleccionista de libros',
  },
];

const ARTICULOS_INICIALES: Articulo[] = [
  {
    id: '1',
    nombre: 'Bicicleta de Montaña Trek',
    descripcion: 'Bicicleta en excelente estado, poco uso. Perfecta para principiantes y intermedios.',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    categoria: 'Deportes',
    estado: 'disponible',
    usuario: USUARIOS_INICIALES[0],
    fechaPublicacion: new Date(),
    vistas: 45,
    interes: 3,
  },
  {
    id: '2',
    nombre: 'Laptop Dell XPS 13',
    descripcion: 'Laptop ultrabooks, 16GB RAM, SSD 512GB. Perfecta para programación y diseño.',
    imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
    categoria: 'Electrónica',
    estado: 'disponible',
    usuario: USUARIOS_INICIALES[2],
    fechaPublicacion: new Date(),
    vistas: 89,
    interes: 7,
  },
  {
    id: '3',
    nombre: 'Libro de Matemáticas Avanzadas',
    descripcion: 'Libro universitario en buen estado, ideal para estudiantes de ingeniería.',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=400&fit=crop',
    categoria: 'Libros',
    estado: 'disponible',
    usuario: USUARIOS_INICIALES[3],
    fechaPublicacion: new Date(Date.now() - 86400000),
    vistas: 32,
    interes: 2,
  },
  
];
export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [vista, setVista] = useState<"inicio" | "usuarios" | "articulos" | "reportes" | "configuracion">("inicio");
  const [editingUser, setEditingUser] = useState<UsuarioAdmin | null>(null);

  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>(USUARIOS_INICIALES);
  const [articulos, setArticulos] = useState<Articulo[]>(ARTICULOS_INICIALES);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [showModalArticulo, setShowModalArticulo] = useState<boolean>(false);
  const [showModalUsuario, setShowModalUsuario] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<{ message: string; isOpen: boolean }>({ message: "", isOpen: false });
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

  const [newArticulo, setNewArticulo] = useState<{ 
    nombre: string; 
    categoria: string; 
    imagen: string; 
    descripcion: string;
  }>({ 
    nombre: "", 
    categoria: "", 
    imagen: "", 
    descripcion: "" 
  });

  const [newUsuario, setNewUsuario] = useState<{ 
    nombre: string; 
    correo: string; 
    rol: "Administrador" | "Usuario" 
  }>({ 
    nombre: "", 
    correo: "", 
    rol: "Usuario" 
  });
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };
  const openErrorModal = (message: string) => setErrorModal({ message, isOpen: true });
  const closeErrorModal = () => setErrorModal({ message: "", isOpen: false });

  const openConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setConfirmation({ isOpen: true, title, message, onConfirm });
  };
  const closeConfirmation = () => setConfirmation(null);
  const handleToggleUsuario = (id: string) => {
    setUsuarios(prevUsuarios =>
      prevUsuarios.map(u =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    );
  };

  const handleEditUsuario = (usuario: UsuarioAdmin) => {
    setEditingUser(usuario);
    setNewUsuario({ nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol });
    setShowModalUsuario(true);
  };

  const handleSaveUsuario = () => {
    if (!newUsuario.nombre || !newUsuario.correo) {
      openErrorModal("Por favor completa todos los campos de Nombre y Correo.");
      return;
    }

    if (editingUser) {
      setUsuarios(prevUsuarios =>
        prevUsuarios.map(u =>
          u.id === editingUser.id ? { ...u, nombre: newUsuario.nombre, correo: newUsuario.correo, email: newUsuario.correo, rol: newUsuario.rol } : u
        )
      );
      setEditingUser(null);
    } else {
      const nuevoUsuario: UsuarioAdmin = {
        id: Date.now().toString(),
        nombre: newUsuario.nombre,
        correo: newUsuario.correo,
        email: newUsuario.correo,
        rol: newUsuario.rol,
        articulosDisponibles: 0,
        activo: true,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        ubicacion: 'La Paz, Bolivia',
        rating: 0,
        articulosIntercambiados: 0,
        verificado: false,
        descripcion: 'Usuario nuevo',
      };
      setUsuarios(prevUsuarios => [...prevUsuarios, nuevoUsuario]);
    }

    setNewUsuario({ nombre: "", correo: "", rol: "Usuario" });
    setShowModalUsuario(false);
  };

  const handleDeleteUsuario = (id: string) => {
    openConfirmation(
      "Confirmar Eliminación",
      "¿Está seguro de que desea eliminar este usuario de forma permanente? Esta acción no se puede deshacer.",
      () => {
        setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== id));
        closeConfirmation();
      }
    );
  };

  const handleAddArticulo = () => {
    if (!newArticulo.nombre || !newArticulo.categoria) {
      openErrorModal("Por favor completa el Nombre y selecciona una Categoría para el artículo.");
      return;
    }

    const nuevoArticulo: Articulo = {
      id: Date.now().toString(),
      nombre: newArticulo.nombre,
      descripcion: newArticulo.descripcion || 'Sin descripción',
      imagen: newArticulo.imagen || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
      categoria: newArticulo.categoria,
      estado: 'disponible',
      usuario: usuarios.find(u => u.id === '1') || usuarios[0],
      fechaPublicacion: new Date(),
      vistas: 0,
      interes: 0,
    };

    setArticulos(prevArticulos => [...prevArticulos, nuevoArticulo]);
    setNewArticulo({ nombre: "", categoria: "", imagen: "", descripcion: "" });
    setShowModalArticulo(false);
  };

  const handleDeleteArticulo = (id: string) => {
    openConfirmation(
      "Confirmar Eliminación",
      "¿Está seguro de que desea eliminar este artículo? El cambio será inmediato.",
      () => {
        setArticulos(prevArticulos => prevArticulos.filter(a => a.id !== id));
        closeConfirmation();
      }
    );
  };

  const filteredUsuarios = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoriesData = Object.entries(
    articulos.reduce((acc: Record<string, number>, a) => {
      acc[a.categoria] = (acc[a.categoria] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  const PIE_COLORS = ['#0284c7', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#14b8a6'];
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-xl`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 p-2 w-10 h-10 flex items-center justify-center font-bold text-lg">T</div>
          {sidebarOpen && <h3 className="font-extrabold text-xl tracking-wider">Trueques</h3>}
        </div>

        <nav className="p-4 flex-1 space-y-1">
          <SidebarItem icon={Home} label="Inicio" open={sidebarOpen} active={vista === "inicio"} onClick={() => setVista("inicio")} />
          <SidebarItem icon={Users} label="Usuarios" open={sidebarOpen} active={vista === "usuarios"} onClick={() => setVista("usuarios")} />
          <SidebarItem icon={ShoppingBag} label="Artículos" open={sidebarOpen} active={vista === "articulos"} onClick={() => setVista("articulos")} />
          <SidebarItem icon={BarChart3} label="Reportes" open={sidebarOpen} active={vista === "reportes"} onClick={() => setVista("reportes")} />
        </nav>
        
        <nav className="p-4 border-t border-slate-800 space-y-1">
          <SidebarItem icon={Settings} label="Config" open={sidebarOpen} active={vista === "configuracion"} onClick={() => setVista("configuracion")} />
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full p-2 rounded-lg hover:bg-slate-800 transition text-gray-400">
            {sidebarOpen ? <X className="w-5 h-5 ml-auto" /> : <Menu className="w-5 h-5 mx-auto" />}
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white p-6 border-b shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-3xl">
              <span className="font-extrabold text-slate-900">{usuarios.find(u => u.id === '1')?.nombre || 'Admin'}</span>
            </h2>
            <p className="text-sm text-gray-500">BIENVENIDO</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border-2 border-white">3</span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-slate-800">Brayan</p>
                <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-md">B</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition shadow-md"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>
        <section className="flex-1 overflow-auto p-8">
          {vista === "inicio" && (
            <VistaInicio usuarios={usuarios} articulos={articulos} categoriasData={categoriesData} pieColors={PIE_COLORS} />
          )}

          {vista === "usuarios" && (
            <VistaUsuarios
              usuarios={filteredUsuarios}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onEdit={handleEditUsuario}
              onToggle={handleToggleUsuario}
              onDelete={handleDeleteUsuario}
              onNew={() => {
                setEditingUser(null);
                setNewUsuario({ nombre: "", correo: "", rol: "Usuario" });
                setShowModalUsuario(true);
              }}
            />
          )}

          {vista === "articulos" && (
            <VistaArticulos
              articulos={articulos}
              onDelete={handleDeleteArticulo}
              onNew={() => setShowModalArticulo(true)}
            />
          )}

          {vista === "reportes" && (
            <VistaReportes usuarios={usuarios} articulos={articulos} categoriesData={categoriesData} pieColors={PIE_COLORS} />
          )}

          {vista === "configuracion" && <VistaConfiguracion />}
        </section>
      </main>

      {showModalUsuario && (
        <ModalUsuario
          usuario={editingUser}
          newUsuario={newUsuario}
          setNewUsuario={setNewUsuario}
          onSave={handleSaveUsuario}
          onClose={() => { setShowModalUsuario(false); setEditingUser(null); }}
        />
      )}
      {showModalArticulo && (
        <ModalArticulo
          newArticulo={newArticulo}
          setNewArticulo={setNewArticulo}
          onAdd={handleAddArticulo}
          onClose={() => setShowModalArticulo(false)}
        />
      )}
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  open: boolean;
  active: boolean;
  onClick: () => void;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, open, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all text-sm font-medium
      ${active
        ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-slate-800/80"
      }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-sky-400'}`} />
    {open && <span>{label}</span>}
  </button>
);

interface MessageBoxProps {
  title: string;
  message: string;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
}
const MessageBox: React.FC<MessageBoxProps> = ({ title, message, onClose, type }) => {
  const colorMap = {
    success: { bg: 'bg-green-500', icon: CheckCircle },
    error: { bg: 'bg-red-500', icon: AlertTriangle },
    info: { bg: 'bg-blue-500', icon: Bell },
  };
  const { bg, icon: Icon } = colorMap[type];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start pt-20 justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden transform transition-all">
        <div className={`p-4 flex items-center gap-3 ${bg} text-white`}>
          <Icon className="w-6 h-6" />
          <h2 className="font-bold">{title}</h2>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-700">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
      <div className="flex justify-end p-4 border-t gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
);

interface VistaInicioProps {
  usuarios: UsuarioAdmin[];
  articulos: Articulo[];
  categoriasData: { name: string; value: number }[];
  pieColors: string[];
}
const VistaInicio: React.FC<VistaInicioProps> = ({ usuarios, articulos, categoriasData, pieColors }) => {
  const adminCount = usuarios.filter(u => u.rol === "Administrador").length;
  const activosCount = usuarios.filter(u => u.activo).length;
  const trend = { value: 1, isPositive: true }; 
  const totalArticulos = articulos.length;
  const latestArticulos = articulos.slice(-5).reverse();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-800">Panel Principal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-sky-600 flex items-center justify-between transition hover:shadow-2xl">
          <div className="space-y-1">
            <p className="text-gray-600 text-sm font-semibold">Total Usuarios</p>
            <p className="text-5xl font-extrabold text-slate-900">{usuarios.length}</p>
            <div className="flex items-center text-sm mt-2">
              <span className={`flex items-center gap-1 font-bold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {trend.value} nuevos hoy
              </span>
              <span className="text-xs text-gray-500 ml-4">({activosCount} activos)</span>
            </div>
          </div>
          <Users className="w-12 h-12 text-sky-400 opacity-30" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-emerald-600 flex items-center justify-between transition hover:shadow-2xl">
          <div className="space-y-1">
            <p className="text-gray-600 text-sm font-semibold">Total Artículos</p>
            <p className="text-5xl font-extrabold text-slate-900">{totalArticulos}</p>
            <p className="text-sm text-gray-500 mt-2">Ítems disponibles</p>
          </div>
          <ShoppingBag className="w-12 h-12 text-emerald-400 opacity-30" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-violet-600 flex items-center justify-between transition hover:shadow-2xl">
          <div className="space-y-1">
            <p className="text-gray-600 text-sm font-semibold">Intercambios</p>
            <p className="text-5xl font-extrabold text-slate-900">{adminCount}</p>
            <p className="text-sm text-gray-500 mt-2">Total de intercambios </p>
          </div>
         <Handshake className="w-12 h-12 text-violet-400 opacity-30" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-xl">
          <h2 className="font-extrabold text-lg mb-4 text-slate-800 border-b pb-2">Distribución de Artículos por Categoría</h2>
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriasData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {categoriasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [value, name]} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl">
          <h2 className="font-extrabold text-lg mb-4 text-slate-800 border-b pb-2">Últimos Artículos Publicados</h2>
          <div className="space-y-4">
            {latestArticulos.map((a, index) => (
              <div key={index} className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                <BookOpen className="w-6 h-6 text-sky-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm truncate">{a.nombre}</p>
                  <p className="text-xs text-gray-500">{a.categoria}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            ))}
            {latestArticulos.length === 0 && (
              <p className="text-gray-500 italic">No hay artículos recientes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface VistaUsuariosProps {
  usuarios: UsuarioAdmin[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEdit: (usuario: UsuarioAdmin) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}
const VistaUsuarios: React.FC<VistaUsuariosProps> = ({
  usuarios,
  searchTerm,
  setSearchTerm,
  onEdit,
  onToggle,
  onDelete,
  onNew,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="text-gray-600">Administra todos los usuarios del sistema</p>
      </div>
      <button
        onClick={onNew}
        className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-md transition transform hover:scale-[1.02]"
      >
        <Plus className="w-4 h-4" /> Nuevo Usuario
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-4 border-b">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Nombre</th>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Correo</th>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Rol</th>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Artículos</th>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Estado</th>
              <th className="p-4 text-left text-xs font-semibold uppercase text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-sky-50/50 transition duration-150">
                <td className="p-4 text-sm font-medium text-gray-900">{u.nombre}</td>
                <td className="p-4 text-sm text-gray-600">{u.correo}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.rol === "Administrador" ? "bg-sky-100 text-sky-700" : "bg-gray-200 text-gray-700"}`}>
                    {u.rol}
                  </span>
                </td>
                <td className="p-4 text-sm text-center">{u.articulosDisponibles}</td>
                <td className="p-4">
                  <button
                    onClick={() => onToggle(u.id)}
                    className={`flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                      u.activo ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {u.activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {u.activo ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => onEdit(u)} className="bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-lg text-sm transition">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(u.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {usuarios.length === 0 && (
        <p className="p-6 text-center text-gray-500 italic">No se encontraron usuarios.</p>
      )}
    </div>
  </div>
);

//VISTA DE LOS ARTÍCULOS

interface VistaArticulosProps {
  articulos: Articulo[];
  onDelete: (id: string) => void;
  onNew: () => void;
}

const VistaArticulos: React.FC<VistaArticulosProps> = ({ articulos, onDelete, onNew }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `hace ${days} días`;
    return `hace ${Math.floor(days / 7)} semanas`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Artículos</h1>
          <p className="text-gray-600">Todos los artículos disponibles en Trueques</p>
        </div>
        <button
          onClick={onNew}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow-md transition transform hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Nuevo Artículo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articulos.map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
            <div className="relative overflow-hidden h-48 bg-gray-200">
              <img
                src={a.imagen}
                alt={a.nombre}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    a.estado === 'disponible' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {a.estado}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                👁 {a.vistas} vistas
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                {a.categoria}
              </div>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                {a.nombre}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{a.descripcion}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                <Calendar className="w-4 h-4" />
                {formatDate(new Date(a.fechaPublicacion))}
              </div>
              <div className="border-t pt-3 flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={a.usuario.avatar}
                    alt={a.usuario.nombre}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{a.usuario.nombre}</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-500">{a.usuario.ubicacion}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDelete(a.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface VistaReportesProps {
  usuarios: UsuarioAdmin[];
  articulos: Articulo[];
  categoriesData: { name: string; value: number }[];
  pieColors: string[];
}
const VistaReportes: React.FC<VistaReportesProps> = ({ usuarios, categoriesData, pieColors }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Reportes y Estadísticas Detalladas</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-sky-500">
        <h2 className="font-extrabold text-xl mb-4 text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-sky-500"/> Estadísticas de Usuarios</h2>
        <div className="space-y-2 text-gray-700">
          <p className="flex justify-between">Total Registrados: <span className="font-bold text-sky-600">{usuarios.length}</span></p>
          <p className="flex justify-between">Activos: <span className="font-bold text-green-600">{usuarios.filter(u => u.activo).length}</span></p>
          <p className="flex justify-between">Inactivos: <span className="font-bold text-red-600">{usuarios.filter(u => !u.activo).length}</span></p>
          <p className="flex justify-between">Administradores: <span className="font-bold text-violet-600">{usuarios.filter(u => u.rol === "Administrador").length}</span></p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-emerald-500">
        <h2 className="font-extrabold text-xl mb-4 text-slate-800 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-500"/> Distribución por Categoría</h2>
        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoriesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                labelLine={false}
                label
              >
                {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [value, name]} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const VistaConfiguracion: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
    <div className="bg-white rounded-xl p-6 shadow-xl">
      <p className="text-gray-600">Gestión de roles, ajustes de seguridad y temas de la aplicación.</p>
    </div>
  </div>
);

//MODALES

interface ModalUsuarioProps {
  usuario: UsuarioAdmin | null;
  newUsuario: { nombre: string; correo: string; rol: "Administrador" | "Usuario" };
  setNewUsuario: (usuario: any) => void;
  onSave: () => void;
  onClose: () => void;
}
const ModalUsuario: React.FC<ModalUsuarioProps> = ({
  usuario,
  newUsuario,
  setNewUsuario,
  onSave,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-6">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">{usuario ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <div className="space-y-4">
        <input
          value={newUsuario.nombre}
          onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
          placeholder="Nombre Completo"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <input
          value={newUsuario.correo}
          onChange={(e) => setNewUsuario({ ...newUsuario, correo: e.target.value })}
          placeholder="Correo Electrónico"
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <select
          value={newUsuario.rol}
          onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value as any })}
          className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        >
          <option>Usuario</option>
          <option>Administrador</option>
        </select>
      </div>
      <div className="flex gap-4 mt-6">
        <button onClick={onSave} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition shadow-md">
          {usuario ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
        <button onClick={onClose} className="flex-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 py-3 transition">
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

interface ModalArticuloProps {
  newArticulo: { nombre: string; categoria: string; imagen: string; descripcion: string };
  setNewArticulo: (articulo: any) => void;
  onAdd: () => void;
  onClose: () => void;
}
const ModalArticulo: React.FC<ModalArticuloProps> = ({
  newArticulo,
  setNewArticulo,
  onAdd,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Nuevo Artículo para Trueque</h2>
      <div className="space-y-4">
        <input
          value={newArticulo.nombre}
          onChange={(e) => setNewArticulo({ ...newArticulo, nombre: e.target.value })}
          placeholder="Nombre del Artículo"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        <textarea
          value={newArticulo.descripcion}
          onChange={(e) => setNewArticulo({ ...newArticulo, descripcion: e.target.value })}
          placeholder="Descripción del artículo"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          rows={3}
        />
        <input
          value={newArticulo.imagen}
          onChange={(e) => setNewArticulo({ ...newArticulo, imagen: e.target.value })}
          placeholder="URL de la imagen"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
        <select
          value={newArticulo.categoria}
          onChange={(e) => setNewArticulo({ ...newArticulo, categoria: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        >
          <option value="">Selecciona Categoría</option>
          <option>Libros</option>
          <option>Electrónica</option>
          <option>Deportes</option>
          <option>Ropa</option>
          <option>Hogar</option>
          <option>Otros</option>
        </select>
      </div>
      <div className="flex gap-4 mt-6">
        <button onClick={onAdd} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition shadow-md">
          Agregar Artículo
        </button>
        <button onClick={onClose} className="flex-1 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 py-3 transition">
          Cancelar
        </button>
      </div>
    </div>
  </div>
);


