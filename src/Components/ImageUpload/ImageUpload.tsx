import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

export default function App() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);

    var input = document.querySelector('input[type="file"]');

    var data = new FormData();
    if (imageList[0].dataURL) {
      data.append("file", imageList[0].dataURL);
    }


    data.append("user", "hubot");

    // Key: oyi7o1j873bae3dlmscm9s5xe9te4s7
    // Secret: x1ilpewp8snensizist9jwab87oq3s9we79tpnnfxfupflscb0gq6w8yoxlji6

    // curl --location --request POST 'https://predict.app.landing.ai/inference/v1/predict?endpoint_id=145bc846-eba9-4763-bb37-933fc48206f4' \
    // --header 'Content-Type: multipart/form-data' \
    // --header 'apikey: YOUR_APIKEY' \
    // --header 'apisecret: YOUR_APISECRET' \
    // --form 'file=@"YOUR_IMAGE"'

    fetch(
      "https://predict.app.landing.ai/inference/v1/predict?endpoint_id=145bc846-eba9-4763-bb37-933fc48206f4",
      {
        method: "POST",
        body: data,
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "multipart/form-data",
          apikey: "oyi7o1j873bae3dlmscm9s5xe9te4s7",
          apisecret:
            "x1ilpewp8snensizist9jwab87oq3s9we79tpnnfxfupflscb0gq6w8yoxlji6",
        },
      }
    )
      .then(
        (response) => response.json() // if the response is a JSON object
      )
      .then(
        (success) => console.log("success: ", success) // Handle the success response object
      )
      .catch(
        (error) => console.log("error: ", error) // Handle the error response object
      );
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
