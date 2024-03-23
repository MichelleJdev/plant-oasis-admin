import React from "react";
import { motion } from "framer-motion";

function PageAnimation({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="page"
    >
      {children}
    </motion.div>
  );
}

export default PageAnimation;
