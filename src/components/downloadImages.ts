// Importar la biblioteca JSZip para la creación del archivo zip
// Asegúrate de incluir la biblioteca JSZip en tu proyecto antes de usarla
// Puedes obtenerla en https://stuk.github.io/jszip/
// Ejemplo de importación: <script src="jszip.min.js"></script>

import JSZip from "jszip";

export async function downloadImages(imagenes) {
  // []{img:setInterval,name:any}
  // Crear una instancia de JSZip
  const zip = new JSZip();
  zip.folder("imagenes");
  // Recorrer el array de imágenes
  for (let i = 0; i < imagenes.length; i++) {
    const imgData = imagenes[i].img;
    // Convertir la imagen BLOB a un buffer
    const buffer = await imgData.arrayBuffer();
    const extension = imgData.type.split("/")[1];

    // Obtener la extensión de archivo del BLOB
    // const extension = imagen.type.split("/")[1];
    // Agregar el archivo al ZIP
    zip.file(`imagenes/${imagenes[i].name}.${extension}`, buffer);
  }
  // Generar el archivo ZIP
  const contenidoZip = await zip.generateAsync({ type: "blob" });

  // Crear un enlace de descarga
  const enlaceDescarga = document.createElement("a");
  enlaceDescarga.href = URL.createObjectURL(contenidoZip);
  enlaceDescarga.download = "imagenes.zip";

  // Simular un clic en el enlace para iniciar la descarga
  enlaceDescarga.click();

  // Liberar el objeto URL
  URL.revokeObjectURL(enlaceDescarga.href);
}
