import { RiImageAddLine } from "react-icons/ri";
import "./ImagePicker.css";

function ImagePicker({ imageDataUrl, handleChange, inputRef }) {
  const openFilePicker = (evt) => {
    evt.preventDefault();
    inputRef.current.click();
  };
  return (
    <div className="ImagePicker">
      <div className="wrapper">
        <div className="image">
          {imageDataUrl && <img src={imageDataUrl} alt="selected" />}
        </div>
        <div className="box-content">
          <label htmlFor="add-image">
            <RiImageAddLine color="white" className="img-icon" />
          </label>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        name="imageDataUrl"
        id="add-image"
        className="image-upload-btn"
        onChange={handleChange}
        accept="image/*"
      />
      <button onClick={openFilePicker} className="custom-img-btn">
        Choose an image
      </button>
    </div>
  );
}

export default ImagePicker;
