import { groupBy } from "lodash-es";

export default async function handler(req, res) {
  const params = new URLSearchParams();
  params.set("article_slug", req.query.slug);
  // Using the URLSearchParams to render and escape the slug as the url search param "article_slug".
  const url = `https://www.linda.nl/api/v1/pages/article/?article_type=post&${params}`;
  const response = await fetch(url);
  const json = await response.json();

  // This mapping logic is for example purposes, in real-world code I'd place additional validation
  const included = groupBy(json.included, "type");
  const articleId = json.data[0].relationships.article.data.id;
  const article = included.articles.find((entry) => entry.id === articleId);
  const imageId = article.relationships.image.data.id;
  const image = included.images.find((entry) => entry.id === imageId);
  const imageSizes = groupBy(image.attributes.sizes, "type");

  res.status(200).json({
    // This is a oversimplified response, it needs more data (og tags / ads, tracking ids) etc
    NOTE_TO_DEVS:
      "This is over simplification, but yes the response can contain drasticly less and use simpler data structures.",
    id: article.id,
    title: article.attributes.title,
    categories: article.attributes.categories.map((entry) => ({
      url: entry.link,
      title: entry.name,
    })),
    image: {
      desktop: imageSizes["linda-large"][0].url,
      tablet: imageSizes["linda-medium"][0].url,
      phone: imageSizes["linda-small"][0].url,
      aspectratio:
        imageSizes["linda-large"][0].width /
        imageSizes["linda-large"][0].heigth,
    },
    body: article.attributes.body,
    blocks: [
      { type: "related", items: ["related items data goes here"] },
      { type: "recent", items: ["recent items data goes here"] },
      { type: "popular", items: ["recent items data goes here"] },
    ],
    sidebar: ["sidebar data goes here"],
  });
}
