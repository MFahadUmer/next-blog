import React from 'react';
import styles from './page.module.css';
import Button from '@/components/button/Button';
import Image from 'next/image';
import { items } from './data.js';

const getData = (cat) => {
  const data = items[cat];

  if (data) {
    return data;
  }

  return 'Not Found';
};

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image src={item.image} className={styles.img} fill />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
