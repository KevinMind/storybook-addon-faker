import React from "react";

interface Props {
  title: string;
  image: string;
}

export function Profile(props: Props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <img src={props.image} width={400} height="auto" />
    </div>
  )
}
