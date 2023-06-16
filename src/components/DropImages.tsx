/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import useIcon from "./hooks/useIcon";
import { formats } from "./data/imagesFormat";
import { imagesData } from "./data/logoData";
import useDownload from "./hooks/useDownload";
import useOptimization from "./hooks/useOptimization";
import { mostrarPesoArchivo } from "./services/sizeImage";
export function DropImages() {
  const [value, setValue] = useState<string>("default");
  const { icon } = useIcon(value);
  const [quality, setQ] = useState("80");
  const [filesOp, setFilesOp] = useState<{ img: Blob; name: string }[]>();
  const [format, setFormat] = useState("webp");
  const [images, setImages] = useState<typeof imagesData>(imagesData);
  //@ts-ignore
  const { optimizationFetch } = useOptimization(icon, images, setFilesOp, {
    quality,
    format,
  }); //@ts-ignore
  const { download } = useDownload(filesOp);
  const ArraysSizeOp = (files: unknown[]) => {
    let sum = 0;
    //@ts-ignore
    files.forEach((x: { img: { size: number } }) => {
      sum = x.img.size + sum;
    });
    return sum;
  };
  return (
    <section className="container">
      <div className="App_action ">
        <select
          onChange={(e) => {
            setFormat(e.target.value);
          }}
          value={format}
        >
          {formats.map((x, index) => (
            <option key={index} value={x}>
              {x.toUpperCase()}
            </option>
          ))}
        </select>
        {filesOp != undefined ? (
          <>
            <button onClick={optimizationFetch}>Generar</button>
            <button onClick={download}>Descargar</button>
          </>
        ) : (
          <button onClick={optimizationFetch}>Generar</button>
        )}
      </div>
      <div>
        {filesOp != undefined && (
          <p>
            El peso optimizado total es:{" "}
            {mostrarPesoArchivo(ArraysSizeOp(filesOp))}
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
          width: "300px",
        }}
      >
        <p> Calidad de imagen al {quality}%</p>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <p>Tamaño de iconos</p>
      <div className="icons">
        {imagesData.map((img, index) => (
          <div
            onClick={() => {
              const res = images.find((i) => i.title == img.title);
              if (res != undefined) {
                setImages(images.filter((wq) => wq.title != img.title));
              } else {
                images.push(img);
                setImages([...images]);
              }
            }}
            key={index}
            className={`${
              images.find((i) => i.title == img.title) != undefined && "active"
            }`}
            style={{ display: "flex" }}
          >
            <p>{img.title}</p>
          </div>
        ))}
      </div>
      <div className="card card--accent">
        <label className="input">
          <input
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
            className="input__field"
            type="text"
            placeholder=" "
          />
          <span className="input__label">Nombre del icono</span>
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={icon} alt="" className="img" />
      </div>

      <ToastContainer position="top-right" />
    </section>
  );
}

export default DropImages;
