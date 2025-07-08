"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Article {
  _id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  type?: string;
  tags?: string[];
  author?: string;
  authorAvatar?: string;
  pinned?: boolean;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tags, setTags] = useState('');
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [editPinned, setEditPinned] = useState(false);
  const router = useRouter();

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!title || !content) {
      setError('Please fill in all required fields: title, content.');
      setLoading(false);
      return;
    }
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        videoUrl,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        pinned,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setTitle(''); setContent(''); setImageUrl(''); setVideoUrl(''); setTags(''); setPinned(false);
      setSuccess('Teaching created successfully!');
      fetchArticles();
    } else {
      setError('Failed to create article');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    if (res.ok) fetchArticles();
    else setError('Failed to delete');
  };

  const startEdit = (article: Article) => {
    setEditingId(article._id);
    setEditTitle(article.title);
    setEditContent(article.content);
    setEditImageUrl(article.imageUrl || '');
    setEditVideoUrl(article.videoUrl || '');
    setEditPinned(!!article.pinned);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setError('');
    const res = await fetch(`/api/articles/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        imageUrl: editImageUrl,
        videoUrl: editVideoUrl,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        pinned: editPinned,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setEditingId(null);
      fetchArticles();
    } else {
      setError('Failed to update');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const filteredArticles = articles.filter(article => {
    const q = search.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow mb-8 max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">Create New Teaching</h2>
        <div className="mb-2 text-xs text-gray-500">
          To add an image, upload it to <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Imgur</a> or <a href="https://drive.google.com/drive/my-drive" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Drive</a> (set to public) and paste the link here.<br/>
          For videos, upload to <a href="https://youtube.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">YouTube</a>, <a href="https://vimeo.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Vimeo</a>, or Google Drive and paste the share link.
        </div>
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content *"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Video URL (optional)"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma separated) *"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={pinned}
            onChange={e => setPinned(e.target.checked)}
          />
          <span>Pin as Featured</span>
        </label>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h2 className="text-xl font-semibold">Teachings</h2>
          <input
            type="text"
            placeholder="Search by title, content, or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow w-full md:w-80"
          />
        </div>
        <ul className="space-y-4">
          {filteredArticles.map(article => (
            <li key={article._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg border border-yellow-100 transition-all duration-200">
              {editingId === article._id ? (
                <form onSubmit={handleEdit} className="space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={3}
                    required
                  />
                  <input
                    type="text"
                    value={editImageUrl}
                    onChange={e => setEditImageUrl(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editVideoUrl}
                    onChange={e => setEditVideoUrl(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Video URL (optional)"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editPinned}
                      onChange={e => setEditPinned(e.target.checked)}
                    />
                    <span>Pin as Featured</span>
                  </label>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded" disabled={loading}>
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(article)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
                      <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">{new Date(article.date).toLocaleString()}</div>
                  {article.imageUrl && <img src={article.imageUrl} alt="" className="max-h-40 mb-2 rounded" />}
                  {article.videoUrl && (
                    <div className="mb-2">
                      <video controls className="max-h-60 w-full rounded">
                        <source src={article.videoUrl} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(article.tags && article.tags.length > 0 ? article.tags : ['N/A']).map(tag => <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{tag}</span>)}
                    {article.pinned && <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">Featured</span>}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 