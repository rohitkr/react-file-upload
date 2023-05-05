import React, { useState } from "react";

import axios from "axios";

export default function App() {
  const [file, setFile] = useState("");

  const onChange = (event: any) => {
    
      const reader = new FileReader();
      const selectedFile = event.target.files[0];
      reader.onloadend = () => {
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);

    let data = new FormData();
    data.append("file", file);

    axios({
      method: "post",
      url: "https://predict.app.landing.ai/inference/v1/predict?endpoint_id=e2b21751-39b2-4623-b4db-31b6b1a1ab8a",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        apikey: "b06y3qwdxm6gyncfhxe3imma1lvx1hk",
        apisecret:
          "6hhos6q9zhisgo8bh15prihs4xvfgd83ozonp8eoo8715rtv3gelvvxp3wmv9v",
      },
    })
      .then(
        (response) => console.log(response) // if the response is a JSON object
      )
      .catch(
        (error) => console.log("error: ", error) // Handle the error response object
      );
  };

  return (
    <div className="App">
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        className="fileUploadInput"
        //ref={hiddenFileInput}
        onChange={onChange}
      />
    </div>
  );
}
