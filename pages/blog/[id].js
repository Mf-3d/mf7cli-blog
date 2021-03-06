// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';
import Link from "next/link";

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
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
              }}
              className={styles.post}
            />
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