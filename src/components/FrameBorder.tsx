"use client";

import React from "react";

const FrameBorder = () => {
  return (
    <>
      {/* Outer Border */}
      <div className="railway-border railway-outer" />

      {/* Middle Dashed Border */}
      <div className="railway-border railway-middle" />

      {/* Inner Glowing Border */}
      <div className="railway-border railway-inner" />

      {/* Cross Intersections for the corners */}
      <div className="railway-cross-topLeft" />
      <div className="railway-cross-topRight" />
      <div className="railway-cross-bottomLeft" />
      <div className="railway-cross-bottomRight" />

      {/* The background particles / circuit effect */}
      <div className="bg-circuit" />
    </>
  );
};

export default FrameBorder;
