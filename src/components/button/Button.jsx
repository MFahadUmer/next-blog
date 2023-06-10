import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, url }) => {
  return <button className={styles.button}>{text}</button>;
};

export default Button;
