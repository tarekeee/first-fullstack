"use client";
import React, { useState } from "react";

export default function ImageUpload({ userInfo, setUserInfo }) {
  const [image, setImage] = useState(null);
  function dropHandler(ev) {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.files) {
      const file = ev.dataTransfer.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          console.log(reader.result);
          img.onload = () => {
            console.log(img.width, img.height);
            if (img.width > 200 || img.height > 200) {
              alert("Image size should be less than 200x200");
            } else {
              setUserInfo({ ...userInfo, image: reader.result });
              setImage(img.src);
            }
          };
        };
      }
    }
  }
  function dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  function uploadHndler(ev) {
    console.log("hello");
    const file = ev.target.files[0];
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        console.log(reader.result);
        img.onload = () => {
          console.log(img.width, img.height);
          if (img.width > 200 || img.height > 200) {
            alert("Image size should be less than 200x200");
          } else {
            setUserInfo({ ...userInfo, image: reader.result });
            setImage(img.src);
          }
        };
      };
    }
  }
  return (
    <div
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      className="h-24 border-2 border-dashed w-full my-2 text-center"
    >
      <label className="flex items-center justify-center gap-2">
        <p className="my-8">Drag and drop your image here</p>
        <input
          type="file"
          className="hidden"
          onChange={(e) => uploadHndler(e)}
        />
        <center>
          <img
            src={image}
            className=" h-20 w-20 object-cover rounded-full border-2 border-gray-300 "
          ></img>
        </center>
      </label>
    </div>
  );
}
