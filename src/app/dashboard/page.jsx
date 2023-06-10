'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import styles from './page.module.css';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session?.data?.user?.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/posts`, {
        method: 'DELETE',
      });
      mutate();
    } catch (error) {}
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === 'loading') {
    return <p>Loading.....</p>;
  }
  if (session.status === 'unauthenticated') {
    router.push('/dashboard/login');
  }

  if (session.status === 'authenticated') {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? 'Loading....'
            : data?.map((post) => (
                <div key={post._id} className={styles.post}>
                  <div className={styles.imgContainer}>
                    <Image fill src={post.img} alt={post.title} />
                  </div>
                  <div className={styles.titleSection}>
                    <h2 className={styles.postTitle}>{post.title} </h2>
                    <span
                      className={styles.delete}
                      onClick={() => handleDelete(post._id)}
                    >
                      X
                    </span>
                  </div>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input
            type="text"
            placeholder="Description"
            className={styles.input}
          />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            cols={30}
            rows={10}
            className={styles.textarea}
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
