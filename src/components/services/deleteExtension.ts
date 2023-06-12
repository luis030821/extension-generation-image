export function eliminarExtension(nombreArchivo) {
  const ultimoPunto = nombreArchivo.lastIndexOf(".");
  if (ultimoPunto !== -1) {
    return nombreArchivo.substring(0, ultimoPunto);
  }
  return nombreArchivo;
}
