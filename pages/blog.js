import Link from "next/link";
import { client } from "../libs/client";
import styles from '../styles/Home.module.scss';
import styles2 from '../styles/Blog.module.scss';

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
                    window.onload = () => {
                      fetch('https://status.mf7cli.tk/maintenance/')
                      .then((res) => {
                          return res.json();
                      })
                      .then((json) => {
                          console.log(json.maintenance);
                          let in_maintenance_service;
                          if(json.maintenance[0] === true){
                            in_maintenance_service = 'Clii for LINE<br>';
                          }
                          if(in_maintenance_service !== undefined){
                            document.getElementById('in_maintenance').innerHTML = in_maintenance_service;
                          }
                      })
                      .catch((reason) => {
                          console.log(reason);
                      });
                    };
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
        <div className={styles.main}>
          <div className={styles.blogColumn}>
            <div className={styles.page_title}>
                        <h1>mf7cli-Blog</h1>
                        &nbsp;<a href="https://en.wikipedia.org/wiki/Loona" target="_blank" rel="nofollow">ㅇㄷㅇㅅㄴ.</a>
            </div>
            <h2 className={styles.title}>記事一覧</h2>
            <div>
              {blog.map((blog, index) => (
              <div key={blog.id} className={styles2.reflection2}>
                <Link href={`/blog/${blog.id}`}>
                  <a className={styles.blog_title}>{blog.title}</a>
                </Link>
              </div>
              ))}
            </div>
          </div>
          <div className={styles.sidemenuColumn}>
            <div id="newsColumn">
              <h2>Status</h2>
              <h3>【メンテナンス中のサービス】</h3>
              <div className={styles.reflection2} id="in_maintenance">
                  現在はありません。
              </div>
              <small>For more information: <Link href={"https://status.mf7cli.tk"}>status.mf7cli.tk</Link></small>
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