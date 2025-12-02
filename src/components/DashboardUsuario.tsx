import React, { useState, useEffect } from "react";
import { Home } from "../pages/Home";
import { Plus, X, Upload, Tag } from "lucide-react";

interface Producto {
  titulo: string;
  descripcion: string;
  imagen: string;
  id: string;
}

interface Oferta {
  monto: number;
  mensaje: string;
}

export const DashboardUsuario = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    titulo: "",
    descripcion: "",
    imagen: "",
    id: "",
  });
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [oferta, setOferta] = useState<Oferta>({ monto: 0, mensaje: "" });
  useEffect(() => {
    document.body.style.overflow = formOpen || modalDetalleOpen ? "hidden" : "auto";
  }, [formOpen, modalDetalleOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setNuevoProducto({ ...nuevoProducto, imagen: imageURL });
    }
  };

  const publicarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoProducto.titulo || !nuevoProducto.descripcion) return;
    const productoConId = { 
      ...nuevoProducto, 
      id: Date.now().toString() 
    };
    setProductos([...productos, productoConId]);
    setNuevoProducto({ titulo: "", descripcion: "", imagen: "", id: "" });
    setImagePreview(null);
    setFormOpen(false);
  };

  const abrirDetalleProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalDetalleOpen(true);
    setOferta({ monto: 0, mensaje: "" });
  };

  const enviarOferta = (e: React.FormEvent) => {
    e.preventDefault();
    if (oferta.monto <= 0) return;
    alert(`Oferta enviada: ${oferta.monto} Bs. - ${oferta.mensaje}`);
    setModalDetalleOpen(false);
    setOferta({ monto: 0, mensaje: "" });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col relative">
      <main className="flex-1 p-4 max-w-7xl mx-auto space-y-8">
        <Home />

        {productos.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Mis productos publicados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => abrirDetalleProducto(p)}
                >
                  {p.imagen && (
                    <img
                      src={p.imagen}
                      alt={p.titulo}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{p.titulo}</h3>
                    <p className="text-gray-600 mt-1 text-sm">{p.descripcion}</p>
                    <div className="mt-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirDetalleProducto(p);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                      >
                        <Tag size={18} /> Añadir Oferta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>


      <button
        onClick={() => setFormOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all z-50"
      >
        <Plus size={28} />
      </button>

      {modalDetalleOpen && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalDetalleOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>

            {productoSeleccionado.imagen && (
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.titulo}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {productoSeleccionado.titulo}
            </h2>
            <p className="text-gray-600 mb-6">{productoSeleccionado.descripcion}</p>

            <div className="border-t border-gray-200 my-4"></div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Hacer una oferta
            </h3>
            <form onSubmit={enviarOferta} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto (Bs.)
                </label>
                <input
                  type="number"
                  value={oferta.monto || ""}
                  onChange={(e) => setOferta({ ...oferta, monto: Number(e.target.value) })}
                  placeholder="Ingresa tu oferta"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje (opcional)
                </label>
                <textarea
                  value={oferta.mensaje}
                  onChange={(e) => setOferta({ ...oferta, mensaje: e.target.value })}
                  placeholder="Escribe un mensaje al vendedor..."
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalDetalleOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                >
                  Enviar Oferta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-4 z-50 transition-opacity duration-300 ease-out">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative transform transition-transform duration-300 ease-out scale-100">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Añadir Nuevo Producto
            </h2>
            <label className="w-full flex justify-center mb-4 cursor-pointer">
              <div className="w-48 h-48 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center hover:bg-gray-300 transition-all">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Upload size={40} className="mb-2 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Cargar imagen del producto
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>
            </label>
            <form onSubmit={publicarProducto} className="space-y-3">
              <input
                type="text"
                name="titulo"
                value={nuevoProducto.titulo}
                onChange={handleChange}
                placeholder="Título del producto"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <textarea
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Guardar Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};