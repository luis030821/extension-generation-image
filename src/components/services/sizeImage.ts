export function mostrarPesoArchivo(size: number) {
  const pesoKB = size / 1024; // Peso en KB
  if (pesoKB >= 1000) {
    const pesoMB = pesoKB / 1024; // Peso en MB
    return `${pesoMB.toFixed(2)} MB.`;
  } else {
    return `${pesoKB.toFixed(2)} KB.`;
  }
}
