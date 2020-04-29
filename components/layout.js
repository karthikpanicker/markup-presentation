import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A presentation application using MARP markup"
        />
      </Head>
      {children}
    </div>
  )
}
