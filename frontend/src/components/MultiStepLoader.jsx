// src/components/MultiStepLoader.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiCircle } from "react-icons/fi"; // Done and Pending icons
import { FaSpinner } from "react-icons/fa"; // Current step icon
import "./MultiStepLoader.css";

const MultiStepLoader = ({ loadingStates, loading, duration = 10000 }) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentState((prev) => {
        if (prev === loadingStates.length - 1) {
          return prev; // Stay on the last step
        }
        return prev + 1;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [loading, loadingStates, duration]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="checklist-loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="checklist-loader-content">
            {loadingStates.map((state, index) => (
              <motion.div
                key={index}
                className="loader-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="item-icon">
                  {index < currentState ? (
                    <FiCheck className="icon-done" />
                  ) : index === currentState ? (
                    <FaSpinner className="icon-current" />
                  ) : (
                    <FiCircle className="icon-pending" />
                  )}
                </div>
                <p
                  className={`item-text ${
                    index === currentState ? "text-current" : "text-done"
                  }`}
                >
                  {state.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiStepLoader;