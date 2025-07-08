import { notFound } from 'next/navigation';

async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/articles`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  if (!articles.length) return <div className="min-h-screen flex items-center justify-center">No articles found.</div>;
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Articles</h1>
        <ul className="space-y-8">
          {articles.map((article: any) => (
            <li key={article._id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <div className="text-gray-500 text-sm mb-2">{new Date(article.date).toLocaleString()}</div>
              {article.imageUrl && <img src={article.imageUrl} alt="" className="max-h-60 mb-4 rounded" />}
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 