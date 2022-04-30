// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }) {
  return (
    <html>
      <head>
          <title>{blog.title} | mf7cli-blog</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap" rel="stylesheet"></link>
          <meta property="og:url" content="https://mf7cli-blog.vercel.app"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content= {blog.title}/>
          <meta property="og:description" content="made_in_apple_のブログ"/>
          <meta property="og:site_name" content="mf7cli-blog"/>
          <meta property="og:image" content="https://blog.mf7cli.ml/image/background/loona-oec.jpeg"/>
      </head>
      <body className={styles.body}>
        <header className={styles.header}>
          <span className={styles.header_title}>
              <a href="/">mf7cli-Blog</a>
          </span>
          <div className={styles.header_links}>
              <a href="index.html">??</a>
          </div>
        </header>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className={styles.blogColumn}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.publishedAt}>{blog.publishedAt}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
            className={styles.post}
          />
        </div>
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