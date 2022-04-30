import Link from "next/link";
import { client } from "../libs/client";
import styles from '../styles/Home.module.scss';
import Script from 'next/script';

export default function Home({ blog }) {
  return (
    <html>
      <head>
          <title>Home | mf7cli-blog</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap" rel="stylesheet"></link>
          <meta property="og:url" content="https://blog.mf7cli.ml"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content="Home"/>
          <meta property="og:description" content="made_in_apple_のブログ"/>
          <meta property="og:site_name" content="mf7cli-blog"/>
          <meta property="og:image" content="https://blog.mf7cli.ml/image/background/loona-oec.jpeg"/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    let date = new Date();
                    window.onload = () => {};
                  `,
            }}
          ></script>
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
        {/* <header className={styles.header}>
          <h1 className={styles.header_title}>　mf7cli-Blog</h1>
          <ul>
            <li className={styles.menu_item}><a className={styles.a} href="../">Home</a></li>
            <li className={styles.menu_item}><a className={styles.a} href="https://mf7cli.vercel.app">Back to mf7cli.vercel.app</a></li>
          </ul>
        </header> */}
        <br></br>
        <br></br>
        <br></br>
        <div className={styles.blogColumn}>
          <div className={styles.page_title}>
                      <h1>mf7cli-Blog</h1>
                      &nbsp;<a href="https://en.wikipedia.org/wiki/Loona" target="_blank" rel="nofollow">ㅇㄷㅇㅅㄴ.</a>
          </div>
          <h2 className={styles.title}>新着記事</h2>
          <div>
            {blog.map((blog, index) => {
              if(index < 4){
                return (
                  <div key={blog.id} className={styles.reflection}>
                    <Link href={`/blog/${blog.id}`}>
                      <a className={styles.blog_title}>{blog.title}</a>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
          <Link href="/blog">もっと見る</Link>
          <div className={styles.page_title}>
            <h2>ニュース</h2>
            &nbsp;by <Link href={"https://status.mf7cli.tk"}>status.mf7cli.tk</Link>
          </div>
          <div id="newsColumn">
            <div className={styles.reflection} id="in_maintenance">
                【メンテナンス中のサービス】
                <br></br>
                現在はありません。
            </div>
          </div>
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