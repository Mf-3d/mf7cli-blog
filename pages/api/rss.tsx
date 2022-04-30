import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from 'microcms-js-sdk';

const data = createClient({
  serviceDomain: 'mf7cli-blog',
  apiKey: process.env.API_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const data = await fetch(`https://mf7cli-blog.microcms.io/api/v1/blog`, {
  //   headers: { "X-API-KEY": process.env.API_KEY },
  // })
  //   .then(res => res.json())
  //   .catch(error => null)

  // if (!data) {
  //   return res.status(401).json({ message: "Invalid slug" })
  // }

  var itemList = ""
  var content = await data.get({endpoint: 'blog'});
  content.contents.map(
    content =>
      (itemList +=
        "<item><title>" +
        content.title +
        "</title><link>https://mf7cli-blog.vercel.app/" +
        content.id +
        "</link><description>" +
        content.title +
        "</description><pubDate>" +
        content.publishedAt +
        "</pubDate></item>")
  )

  var feed = ""
  feed =
    `<?xml version="1.0"?>
  <rss version="2.0">
     <channel>
        <title>mf7cli-blog</title>
        <link>https://mf7cli-blog.vercel.app/</link>
        <description>mf7cli Blog</description>
        <language>ja</language>
        <docs>https://mf7cli-blog.vercel.app/api/rss</docs>
        <generator>mf7cli</generator>
        ` +
    itemList +
    `
     </channel>
  </rss>`

  res.statusCode = 200
  res.setHeader("Content-Type", "text/xml; charset=utf-8")
  res.end(feed)
}