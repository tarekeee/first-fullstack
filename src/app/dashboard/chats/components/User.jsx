import React from "react";

export default function User({ active, id, name, email, image }) {
  if (active) {
    return <div className="flex flex-col justify-center -mt-10 items-center gap-2">
        <img src={image} className="rounded-full mb-2" width={70} height={70} / >
        <span className="text-xl">{name}</span>
        <span>{email}</span>
    </div>;
  }
}
