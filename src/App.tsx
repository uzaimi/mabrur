import { useState, useMemo } from 'react';
import { holySites, siteCategories, HolySite } from '@/data/locations';
import { MapPin, Search, ChevronDown, Copy, Check, BookOpen, Map, X } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSite, setExpandedSite] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSites = useMemo(() => {
    let sites = holySites;
    if (selectedCategory !== 'all') {
      sites = sites.filter((s) => s.category === selectedCategory);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      sites = sites.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.nameArabic.includes(query) ||
          s.description.toLowerCase().includes(query)
      );
    }
    return sites;
  }, [selectedCategory, search]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const SiteCard = ({ site }: { site: HolySite }) => {
    const isExpanded = expandedSite === site.id;
    const categoryLabel = siteCategories.find((c) => c.id === site.category);

    return (
      <div className="card-holy" onClick={() => setExpandedSite(isExpanded ? null : site.id)}>
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-900/40 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold text-[15px] leading-tight">{site.name}</h3>
              {categoryLabel && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 uppercase tracking-wider">
                  {categoryLabel.name}
                </span>
              )}
            </div>
            <p className="text-2xl text-emerald-300/80 mt-0.5 text-right leading-relaxed font-arabic">
              {site.nameArabic}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <p className="text-gray-500 text-sm mt-2 leading-relaxed">{site.description}</p>

        {/* Expanded Recommendations */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="border-t border-gray-800/50 pt-3" />
            {site.recommendations.map((rec, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-800 hover:border-emerald-800/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    {rec.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(rec.arabic, `${site.id}-${i}`);
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Salin teks Arab"
                  >
                    {copiedId === `${site.id}-${i}` ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Arabic */}
                <p className="text-2xl text-white/90 leading-[2.2] text-right mb-3 font-arabic" dir="rtl">
                  {rec.arabic}
                </p>

                {/* Transliteration */}
                <p className="text-gray-400 text-xs italic mb-2 leading-relaxed">
                  <span className="text-gray-600 not-italic font-medium">Transliterasi: </span>
                  {rec.transliteration}
                </p>

                {/* Translations */}
                <div className="space-y-2 mt-3 pt-3 border-t border-gray-800/30">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-gray-500 text-xs font-medium">🇬🇧 EN: </span>
                    {rec.translation}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-gray-500 text-xs font-medium">🇲🇾 BM: </span>
                    {rec.translationMs}
                  </p>
                </div>

                {/* Source */}
                <p className="text-gray-600 text-[11px] mt-3 leading-relaxed italic">
                  📚 {rec.source}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Mabrur</h1>
              <p className="text-emerald-400 text-2xl font-arabic leading-none mt-0.5">مَبْرُور</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Map className="w-3.5 h-3.5" />
              <span>Teman Umrah & Haji</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs">Cadangan surah & doa berdasarkan lokasi anda di Tanah Suci</p>
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-[88px] z-10 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800/30">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Cari lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-700/50 focus:ring-1 focus:ring-emerald-700/30 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-700"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
                : 'bg-gray-900 text-gray-500 border border-gray-800 hover:text-gray-300'
            }`}
          >
            Semua
          </button>
          {siteCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
                  : 'bg-gray-900 text-gray-500 border border-gray-800 hover:text-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Site List */}
      <main className="max-w-lg mx-auto px-4 pb-20 pt-5">
        {filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Tiada lokasi dijumpai</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-gray-700 text-xs">
            Mabrur (مَبْرُور) — semoga ibadah kita diterima.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
