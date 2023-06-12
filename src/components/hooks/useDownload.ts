import JSZip from "jszip";

function useDownload(filesOp: { img: Blob; name: string }[]) {
  const download = async () => {
    const zip = new JSZip();
    zip.folder("icons");
    // Recorrer el array de imágenes
    for (let i = 0; i < filesOp.length; i++) {
      const imgData = filesOp[i].img;
      // Convertir la imagen BLOB a un buffer
      const buffer = await imgData.arrayBuffer();
      const extension = imgData.type.split("/")[1];

      // Obtener la extensión de archivo del BLOB
      // const extension = imagen.type.split("/")[1];
      // Agregar el archivo al ZIP
      zip.file(`icons/${filesOp[i].name}.${extension}`, buffer);
      zip.file(
        "icons.json",
        JSON.stringify([
          { src: `icons/logo16.${extension}`, sizes: "16x16" },
          { src: `icons/logo32.${extension}`, sizes: "32x32" },
          { src: `icons/logo152.${extension}`, sizes: "152x152" },
          { src: `icons/logo192.${extension}`, sizes: "192x192" },
          { src: `icons/logo512.${extension}`, sizes: "512x512" },
          { src: `icons/logo1024.${extension}`, sizes: "1024x1024" },
        ])
      );
    }
    // Generar el archivo ZIP
    const contenidoZip = await zip.generateAsync({ type: "blob" });
    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(contenidoZip);
    enlaceDescarga.download = "icons.zip";

    // Simular un clic en el enlace para iniciar la descarga
    enlaceDescarga.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(enlaceDescarga.href);
  };
  return { download };
}

export default useDownload;
