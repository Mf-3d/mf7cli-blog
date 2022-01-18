import Link from "next/link";
import { client } from "../libs/client";
import styles from '../styles/Home.module.scss';

export default function Home({ blog }) {
  return (
    <html>
      <head>
          <title>mf7cli</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap" rel="stylesheet"></link>
      </head>
      <body className={styles.body}>
        <header className={styles.header}>
          <h1 className={styles.header_title}>　mf7cli-Blog</h1>
          <ul>
            <li className={styles.menu_item}><a className={styles.a} href="../">Home</a></li>
            <li className={styles.menu_item}><a className={styles.a} href="https://mf7cli.vercel.app">Back to mf7cli.vercel.app</a></li>
          </ul>
        </header>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
        <h2 className={styles.title}>　記事一覧</h2>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id} className={styles.blog_item}>
                <Link href={`/blog/${blog.id}`}>
                  <a className={styles.blog_title}>{blog.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};