/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from "react-toastify";
import { imagesData } from "../data/logoData";

function useOptimization(
  icon: string,
  images: typeof imagesData,
  setFilesOp: (data: unknown[]) => void,
  data: object
) {
  const optimizationFetch = async () => {
    // https://imagescompress-luisgarrido0987.b4a.run
    //http://localhost:3001
    const url = `http://localhost:3001/?`;
    toast.promise(
      async () => {
        const s = await fetch(icon);
        const blob = await s.blob();
        const form = new FormData();
        form.append("image", blob);
        const res = await Promise.all(
          images.map(async (imgs) => {
            const params = {
              ...data,
              width: imgs.width.toString(),
              height: imgs.height.toString(),
            };
            const p = new URLSearchParams(params);
            const response = await fetch(url + p, {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
              body: form,
            });
            const img = await response.blob();
            const rt = {
              img,
              name: imgs.title,
            };
            return rt;
          })
        );
        //@ts-ignore
        setFilesOp(res);
      },
      {
        pending: "Optimizando imagenes",
        success: "Imagenes generadas correctamente",
        error: "Error",
      }
    );
  };
  return { optimizationFetch };
}

export default useOptimization;
