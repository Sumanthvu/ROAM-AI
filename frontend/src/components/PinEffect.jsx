// src/components/PinEffect.jsx

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Using framer-motion is more standard for this kind of animation
import "./PinEffect.css";

export const PinContainer = ({
  children,
  title,
  href,
  className = "",
  containerClassName = "",
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <a
      className={`pin-container ${containerClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "#"} // Changed to a default anchor
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="pin-perspective-wrapper">
        <div
          style={{ transform: transform }}
          className="pin-content-container"
        >
          <div className={`pin-content-inner ${className}`}>
            {children}
          </div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
};

export const PinPerspective = ({ title = "", href = "" }) => {
  return (
    <div className="pin-perspective-overlay">
      <div className="pin-perspective-overlay-inner">
        <div className="pin-link-wrapper">
          <a
            href={href}
            target="_blank"
      rel="noopener noreferrer"
            className="pin-link"
          >
            <span className="pin-link-title">{title}</span>
            <span className="pin-link-underline"></span>
          </a>
        </div>

        <div className="pin-circle-perspective-wrapper">
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 0 }}
              className="pin-circle"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="pin-circle"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 4 }}
              className="pin-circle"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="pin-line blurred-line" />
          <motion.div className="pin-line sharp-line" />
          <motion.div className="pin-dot big-dot" />
          <motion.div className="pin-dot small-dot" />
        </>
      </div>
    </div>
  );
};