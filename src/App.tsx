import React, { useState } from "react";
import axios from "axios";

interface Quality {
  quality: string;
  format: string;
  itag: number;
}

function App() {
  const [url, setUrl] = useState("");
  const [videoQuality, setVideoQuality] = useState<Quality[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleInfoClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/video-info", {
        url,
      });
      setVideoQuality(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  // const handleDownloadClick = async (itag: number) => {
  //   try {
  //     await axios.post("http://localhost:3000/download", { url, itag });
  //     alert("Descarga iniciada");
  //   } catch (error) {
  //     console.error(`Error: ${error}`);
  //   }
  // };

  // const handleDownloadClick = (itag: number) => {
  //   const downloadUrl = `http://localhost:3000/download?url=${encodeURIComponent(
  //     url
  //   )}&itag=${itag}`;
  //   const link = document.createElement("a");
  //   link.href = downloadUrl;
  //   link.download = "video.mp4"; // Este nombre se reemplazará con el nombre del archivo en el Content-Disposition header
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownloadClick = (format: string, quality: number) => {
    console.log(format, quality)
    const downloadUrl = `http://localhost:3000/download?url=${encodeURIComponent(
      url
    )}&format=${format}&quality=${quality}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "video.mp4"; // Este nombre se reemplazará con el nombre del archivo en el Content-Disposition header
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700">
          Descargador de YouTube
        </h2>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Pega la URL del video aquí"
        />
        <button
          onClick={handleInfoClick}
          className="w-full p-2 mb-3 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Mostrar calidades
        </button>
        {videoQuality.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Calidades del video:
            </h3>
            <ul>
              {videoQuality.map((quality, index) => (
                <li
                  key={index}
                  className="flex justify-between mb-1 text-gray-600"
                >
                  {quality.quality} | ({quality.format})
                  <button
                    onClick={() => handleDownloadClick(quality.format, quality.itag)}
                    className="ml-2 p-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Descargar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
