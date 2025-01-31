import React from 'react';
import '../styles/global.css';  
const Button = ({ text, onClick, className }) => (
  <button 
    className={className}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
