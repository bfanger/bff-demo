import { NextPage } from "next";
import Script from "next/script";

type Props = {
  title: string;
  image: { desktop: string };
  body: string;
};
const Index: NextPage<Props> = function Index({ title, image, body }) {
  return (
    <>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <div className="max-w-xl px-4 mt-6  mx-auto">
        <h1 className="text-4xl mb-3">{title}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mb-5" src={image.desktop} alt="" />
        {/* eslint-disable-next-line react/no-danger */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
        <hr />
        <div>@todo show remaining blocks</div>
      </div>
    </>
  );
};
Index.getInitialProps = async () => {
  return (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}eieren-weet-jij-wat-je-eet`)
  ).json();
};

export default Index;
