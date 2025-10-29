import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import "./HoverEffect.css";

export const HoverEffect = ({ items, className = "" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`grid-container ${className}`}>
      {items.map((item, idx) => (
        <a
          href={item.link}
          key={item.link}
          className="grid-item"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="hover-background"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({ className = "", children }) => {
  return (
    <div className={`card-container ${className}`}>
      <div className="card-content">{children}</div>
    </div>
  );
};

export const CardTitle = ({ className = "", children }) => {
  return <h4 className={`card-title ${className}`}>{children}</h4>;
};

export const CardDescription = ({ className = "", children }) => {
  return <p className={`card-description ${className}`}>{children}</p>;
};
