"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaTimes } from 'react-icons/fa';

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

// Helper function to check if a URL is a YouTube link
function isYouTubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

// Helper function to check if a URL is a Vimeo link
function isVimeoUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?vimeo\.com\//.test(url);
}

// Helper functions to get embed URLs
function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : url;
}
function getTikTokEmbedUrl(url: string) {
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/${match[1]}` : url;
}
function getGoogleDriveDirectUrl(url: string) {
  // For images and videos: convert share link to direct link
  // Share link: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Direct link: https://drive.google.com/uc?export=download&id=FILE_ID
  const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)\/view/);
  return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
}

// Helper to auto-expand TikTok short links
async function expandTikTokLinkIfNeeded(url: string): Promise<string> {
  if (url.startsWith('https://vm.tiktok.com/')) {
    try {
      const res = await fetch('/api/tiktok/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      return data.expandedUrl || url;
    } catch {
      return url;
    }
  }
  return url;
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
  const [editTags, setEditTags] = useState('');
  const router = useRouter();

  // Add tag suggestions logic
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags || [])));
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

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
    const expandedVideoUrl = await expandTikTokLinkIfNeeded(videoUrl);
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        videoUrl: expandedVideoUrl,
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
    setEditTags(article.tags ? article.tags.join(', ') : '');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setError('');
    const expandedVideoUrl = await expandTikTokLinkIfNeeded(editVideoUrl);
    const res = await fetch(`/api/articles/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        imageUrl: editImageUrl,
        videoUrl: expandedVideoUrl,
        tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex flex-col items-center py-2 px-2">
      <div className="w-full max-w-5xl">
        <header className="flex justify-between items-center mb-4 px-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition">Logout</button>
        </header>
        <main className="flex flex-col md:flex-row gap-6">
          {/* Create New Teaching Form */}
          <section className="w-full md:w-96 bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4 md:mb-0 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Create New Teaching</h2>
            <div className="mb-4 text-xs text-gray-500 leading-relaxed">
              <b>Supported image/video sources:</b>
              <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Imgur</a>,
              <a href="https://youtube.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">YouTube</a>,
              <a href="https://vimeo.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Vimeo</a>,
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">TikTok</a>,
              <a href="https://drive.google.com/drive/my-drive" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Google Drive</a>,
              <a href="https://www.dropbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Dropbox</a>,
              or any public direct file URL.<br/>
              <b>Google Drive:</b> Paste the share link (e.g., <span className="text-blue-600">https://drive.google.com/file/d/FILE_ID/view?usp=sharing</span>). <b>Important:</b> Set the file to “Anyone with the link can view.”<br/>
              <b>TikTok:</b> Paste the full video URL (e.g., <span className="text-blue-600">https://www.tiktok.com/@user/video/1234567890</span>). Short links (e.g., <span className="text-blue-600">vm.tiktok.com/...</span>) will be auto-expanded.<br/>
              <b>Note:</b> For best results, use direct links ending in .jpg, .png, .mp4, etc.
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input type="text" placeholder="Title *" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" required />
              <textarea placeholder="Content *" value={content} onChange={e => setContent(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" rows={4} required />
              <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" />
              <input type="text" placeholder="Video URL (optional)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" />
              <input type="text" placeholder="Tags (comma separated) *" value={tags} onChange={e => { setTags(e.target.value); const input = e.target.value.split(',').pop()?.trim().toLowerCase() || ''; setTagSuggestions(input ? allTags.filter(t => t.toLowerCase().startsWith(input) && !tags.split(',').map(t => t.trim().toLowerCase()).includes(t.toLowerCase())) : []); }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" required />
              {tagSuggestions.length > 0 && (
                <div className="bg-gray-50 border rounded shadow p-2 flex flex-wrap gap-2">
                  {tagSuggestions.map(s => (
                    <button key={s} type="button" className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs" onClick={() => { setTags(tags ? tags + ', ' + s : s); setTagSuggestions([]); }}>{s}</button>
                  ))}
                </div>
              )}
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} />
                <span className="font-medium">Pin as Featured</span>
              </label>
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-60" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
            </form>
            {error && <div className="text-red-500 mt-4 text-center font-semibold">{error}</div>}
            {success && <div className="text-green-600 mt-4 text-center font-semibold">{success}</div>}
          </section>
          {/* Teachings List */}
          <section className="flex-1 bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 md:max-h-[calc(100vh-48px-32px)] md:overflow-y-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
              <h2 className="text-xl font-bold">Teachings</h2>
              <input type="text" placeholder="Search by title, content, or tag..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow w-full md:w-80" />
            </div>
            <ul className="space-y-6">
              {filteredArticles.map(article => (
                <li key={article._id} className="bg-gradient-to-br from-white via-yellow-50 to-white p-4 rounded-2xl shadow-md hover:shadow-xl border border-yellow-100 transition-all duration-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex flex-col items-center w-32 min-w-[8rem]">
                    {article.imageUrl && (
                      <img src={getGoogleDriveDirectUrl(article.imageUrl)} alt="" className="w-28 h-28 object-cover rounded-lg border border-gray-200 shadow mb-2" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = ''; e.currentTarget.alt = 'Image failed to load. Try another host or check Google Drive permissions.'; }} />
                    )}
                    {article.videoUrl && (
                      <div className="w-28 h-16 bg-black rounded-lg flex items-center justify-center mt-1">
                        <span className="text-white text-xl">🎬</span>
                      </div>
                    )}
                    {article.pinned ? (
                      <span className="mt-2 inline-flex items-center gap-1 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full"><FaStar className="inline" /> Featured</span>
                    ) : null}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <h3 className="font-bold text-lg text-gray-900 mr-2">{article.title}</h3>
                      {Array.isArray(article.tags) && article.tags.length > 0 && article.tags.map(tag => (
                        <span key={tag} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">{tag}</span>
                      ))}
                    </div>
                    <div className="text-gray-600 text-xs mb-2">{new Date(article.date).toLocaleString()}</div>
                    <div className="text-gray-700 text-sm line-clamp-3 mb-2">{article.content}</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => startEdit(article)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow transition"><FaEdit /> Edit</button>
                      <button onClick={() => handleDelete(article._id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition"><FaTrash /> Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setEditingId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setEditingId(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl" aria-label="Close"><FaTimes /></button>
            <h2 className="text-xl font-bold mb-4">Edit Teaching</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" required />
              <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" rows={4} required />
              <input type="text" value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" placeholder="Image URL (optional)" />
              <input type="text" value={editVideoUrl} onChange={e => setEditVideoUrl(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" placeholder="Video URL (optional)" />
              <input type="text" value={editTags} onChange={e => { setEditTags(e.target.value); const input = e.target.value.split(',').pop()?.trim().toLowerCase() || ''; setTagSuggestions(input ? allTags.filter(t => t.toLowerCase().startsWith(input) && !e.target.value.split(',').map(t => t.trim().toLowerCase()).includes(t.toLowerCase())) : []); }} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-base" placeholder="Tags (comma separated)" />
              {tagSuggestions.length > 0 && (
                <div className="bg-gray-50 border rounded shadow p-2 flex flex-wrap gap-2">
                  {tagSuggestions.map(s => (
                    <button key={s} type="button" className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs" onClick={() => { setEditTags(editTags ? editTags + ', ' + s : s); setTagSuggestions([]); }}>{s}</button>
                  ))}
                </div>
              )}
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editPinned} onChange={e => setEditPinned(e.target.checked)} />
                <span className="font-medium">Pin as Featured</span>
              </label>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold">Cancel</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 