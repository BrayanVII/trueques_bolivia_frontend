// src/components/LoginForm.tsx
import React, { useState } from "react";

// --- Iconos SVG ---
const SharedUserIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <path d="M20 8v5"></path>
    <path d="M23 11h-5"></path>
  </svg>
);

const UserIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const GenderIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M14 8h-4"></path>
    <path d="M12 14v4"></path>
    <path d="M12 8v4"></path>
    <path d="M10 16h4"></path>
  </svg>
);

const CheckCircleIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// --- Tipos ---
type Rol = "usuario" | "administrador";

export interface UsuarioAutenticado {
  id: string;
  nombre: string;
  email: string;
  password: string;
  avatar: string;
  ubicacion: string;
  rating: number;
  articulosDisponibles: number;
  articulosIntercambiados: number;
  rol: Rol;
  token?: string;
}

// --- Usuarios de prueba ---
const usuariosMock: UsuarioAutenticado[] = [
  {
    id: "1",
    nombre: "Juan",
    email: "juan@gmail.com",
    password: "12345",
    avatar: "",
    ubicacion: "",
    rating: 5,
    articulosDisponibles: 3,
    articulosIntercambiados: 1,
    rol: "usuario",
  },
  {
    id: "2",
    nombre: "Admin",
    email: "brayan@gmail.com",
    password: "brayan123",
    avatar: "",
    ubicacion: "",
    rating: 5,
    articulosDisponibles: 0,
    articulosIntercambiados: 0,
    rol: "administrador",
  },
];

// --- Inputs personalizados ---
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
}

const CustomInput: React.FC<CustomInputProps> = ({ Icon, ...props }) => (
  <div className="relative flex items-center border border-black rounded-lg bg-white/90 p-1">
    <Icon className="ml-2 text-black" size={20} />
    <input {...props} className="w-full p-2 bg-transparent text-black focus:outline-none" />
  </div>
);

interface GenderSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => (
  <div className="relative flex items-center border border-black rounded-lg bg-white/90 p-1">
    <GenderIcon className="ml-2 text-black" size={20} />
    <select value={value} onChange={onChange} className="w-full p-2 bg-transparent text-black focus:outline-none appearance-none">
      <option value="">Selecciona género</option>
      <option value="femenino">Femenino</option>
      <option value="masculino">Masculino</option>
      <option value="otro">Otro</option>
    </select>
  </div>
);

// --- Modal de Éxito ---
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, nombre }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-scaleIn">
        <div className="mb-4 flex justify-center">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircleIcon className="text-green-600" size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Registro Exitoso!</h2>
        <p className="text-gray-600 mb-6">
          Bienvenido/a <span className="font-semibold text-blue-600">{nombre}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Tu cuenta ha sido creada correctamente. Serás redirigido en un momento...
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

// --- Componente Principal ---
interface LoginFormProps {
  onLogin: (usuario: UsuarioAutenticado) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nuevoUsuarioRegistrado, setNuevoUsuarioRegistrado] = useState<UsuarioAutenticado | null>(null);

  // Validaciones
  const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validarTelefono = (telefono: string): boolean => {
    const telefonoRegex = /^[0-9]{7,10}$/;
    return telefonoRegex.test(telefono);
  };

  const validarCedula = (cedula: string): boolean => {
    const cedulaRegex = /^[0-9]{6,10}$/;
    return cedulaRegex.test(cedula);
  };

  const validarNombre = (nombre: string): boolean => {
    return nombre.trim().length >= 2;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (modoRegistro) {
      // Validación de campos vacíos
      if (!nombre || !apellidoPaterno || !email || !password || !confirmPassword || !cedula || !telefono || !genero) {
        setError("⚠️ Todos los campos son obligatorios");
        return;
      }

      // Validación de nombre
      if (!validarNombre(nombre)) {
        setError("⚠️ El nombre debe tener al menos 2 caracteres");
        return;
      }

      if (!validarNombre(apellidoPaterno)) {
        setError("⚠️ El apellido paterno debe tener al menos 2 caracteres");
        return;
      }

      // Validación de cédula
      if (!validarCedula(cedula)) {
        setError("⚠️ La cédula debe contener entre 6 y 10 dígitos");
        return;
      }

      // Validación de teléfono
      if (!validarTelefono(telefono)) {
        setError("⚠️ El teléfono debe contener entre 7 y 10 dígitos");
        return;
      }

      // Validación de email
      if (!validarEmail(email)) {
        setError("⚠️ Por favor ingresa un correo electrónico válido");
        return;
      }

      // Validación de contraseña
      if (!validarPassword(password)) {
        setError("⚠️ La contraseña debe tener al menos 6 caracteres");
        return;
      }

      // Validación de coincidencia de contraseñas
      if (password !== confirmPassword) {
        setError("⚠️ Las contraseñas no coinciden");
        return;
      }

      // Verificar si el email ya existe
      const emailExiste = usuariosMock.some(u => u.email === email);
      if (emailExiste) {
        setError("⚠️ Este correo electrónico ya está registrado");
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario: UsuarioAutenticado = {
        id: Date.now().toString(),
        nombre: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim(),
        email,
        password,
        avatar: "",
        ubicacion: "La Paz, Bolivia",
        rating: 5,
        articulosDisponibles: 0,
        articulosIntercambiados: 0,
        rol: "usuario",
      };

      // Mostrar modal de éxito
      setNuevoUsuarioRegistrado(nuevoUsuario);
      setShowSuccessModal(true);

      // Limpiar formulario
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCedula("");
      setTelefono("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setGenero("");

      // Redirigir después de 2 segundos
      setTimeout(() => {
        setShowSuccessModal(false);
        onLogin(nuevoUsuario);
      }, 2000);

    } else {
      // Modo Login
      if (!email || !password) {
        setError("⚠️ Por favor completa todos los campos");
        return;
      }

      if (!validarEmail(email)) {
        setError("⚠️ Por favor ingresa un correo electrónico válido");
        return;
      }

      // Validación real de email + password
      const usuario = usuariosMock.find(
        (u) => u.email === email && u.password === password
      );

      if (usuario) {
        onLogin(usuario);
      } else {
        setError("⚠️ Usuario o contraseña incorrectos");
      }
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (nuevoUsuarioRegistrado) {
      onLogin(nuevoUsuarioRegistrado);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <form
          onSubmit={handleFormSubmit}
          className="relative bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-4xl space-y-6"
        >
          {!modoRegistro && (
            <h1 className="text-5xl font-extrabold text-black text-center mb-6">
              TRUEQUES BOLIVIA
            </h1>
          )}

          <div className="text-center mb-6">
            <SharedUserIcon className="mx-auto mb-2 text-black" size={48} />
            <h2 className="text-3xl font-bold text-black">
              {modoRegistro ? "Registro de Usuario" : "Iniciar Sesión"}
            </h2>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center animate-shake">
              {error}
            </div>
          )}

          {modoRegistro && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomInput Icon={UserIcon} placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <CustomInput Icon={UserIcon} placeholder="Apellido Paterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
              <CustomInput Icon={UserIcon} placeholder="Apellido Materno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
              <CustomInput Icon={UserIcon} placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
              <CustomInput Icon={UserIcon} placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              <CustomInput Icon={MailIcon} placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              <CustomInput Icon={LockIcon} placeholder="Contraseña (min. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              <CustomInput Icon={LockIcon} placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
              <GenderSelect value={genero} onChange={(e) => setGenero(e.target.value)} />
            </div>
          )}

          {!modoRegistro && (
            <div className="space-y-4">
              <CustomInput Icon={MailIcon} placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              <CustomInput Icon={LockIcon} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-lg"
          >
            {modoRegistro ? "Registrarse" : "Iniciar Sesión"}
          </button>

          <p className="text-center text-black text-sm font-medium pt-4">
            {modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <span
              onClick={() => {
                setModoRegistro(!modoRegistro);
                setError("");
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {modoRegistro ? "Inicia sesión" : "Regístrate"}
            </span>
          </p>
        </form>
      </div>

      {/* Modal de Éxito */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        nombre={nuevoUsuarioRegistrado?.nombre || ""}
      />

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-out;
        }
      `}</style>
    </>
  );
}