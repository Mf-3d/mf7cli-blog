// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }) {
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
        <main className={styles.main}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.publishedAt}>{blog.publishedAt}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
            className={styles.post}
          />
        </main>
      </body>
    </html>

  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};