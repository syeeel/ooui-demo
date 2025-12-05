import { useState } from "react";
import { Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { Modal } from "~/components/Modal";
import { PlusIcon } from "~/components/Icons";
import { clubs } from "~/data/mockData";
import type { Club } from "~/types";

// 部活動と画像のマッピング
const clubImages: Record<string, string> = {
  'cl1': '/images/clubs/football.jpg',      // サッカー部
  'cl2': '/images/clubs/basketball.jpg',    // バスケットボール部
  'cl3': '/images/clubs/baseball.jpg',      // 野球部
  'cl4': '/images/clubs/tennis.jpg',        // テニス部
  'cl5': '/images/clubs/suisougaku.jpeg',   // 吹奏楽部
  'cl6': '/images/clubs/art.jpg',           // 美術部
  'cl7': '/images/clubs/science.jpg',       // 科学部
  'cl8': '/images/clubs/drama.jpeg',        // 演劇部
  'cl9': '/images/clubs/calligraphy.png',   // 書道部
  'cl10': '/images/clubs/track.webp',       // 陸上部
};

export function meta() {
  return [{ title: "部活動一覧 - スクールライフ" }];
}

export default function ClubsIndex() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clubList, setClubList] = useState(clubs);
  const [formData, setFormData] = useState({ name: "", category: "運動部" });

  const handleCreate = () => {
    const newClub: Club = {
      id: `cl${Date.now()}`,
      name: formData.name,
      category: formData.category,
      studentCount: 0,
    };
    setClubList([...clubList, newClub]);
    setFormData({ name: "", category: "運動部" });
    setIsModalOpen(false);
  };

  // カテゴリーでグループ化
  const sportsClubs = clubList.filter(c => c.category === '運動部');
  const cultureClubs = clubList.filter(c => c.category === '文化部');

  return (
    <Layout>
      <PageHeader
        title="部活動"
        subtitle={`${clubList.length}件の部活動`}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
      >
        <PlusIcon className="w-4 h-4" />
        新規作成
      </button>

      {/* 運動部 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-400"></span>
          運動部
          <span className="ml-2 text-sm font-normal text-gray-500">{sportsClubs.length}件</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sportsClubs.map((club) => (
            <Link
              key={club.id}
              to={`/clubs/${club.id}`}
              className="relative h-48 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all"
            >
              {/* 背景画像 */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: clubImages[club.id]
                    ? `url(${clubImages[club.id]})`
                    : 'linear-gradient(135deg, #5BC8AC 0%, #98DBC6 100%)'
                }}
              />
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
              {/* コンテンツ */}
              <div className="relative h-full p-5 flex flex-col justify-end">
                <p className="font-bold text-white text-xl drop-shadow-lg">{club.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {club.category}
                  </span>
                  <span className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full font-medium shadow-md">
                    {club.studentCount}名
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 文化部 */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
          文化部
          <span className="ml-2 text-sm font-normal text-gray-500">{cultureClubs.length}件</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cultureClubs.map((club) => (
            <Link
              key={club.id}
              to={`/clubs/${club.id}`}
              className="relative h-48 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all"
            >
              {/* 背景画像 */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: clubImages[club.id]
                    ? `url(${clubImages[club.id]})`
                    : 'linear-gradient(135deg, #F18D9E 0%, #FFB6C1 100%)'
                }}
              />
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all" />
              {/* コンテンツ */}
              <div className="relative h-full p-5 flex flex-col justify-end">
                <p className="font-bold text-white text-xl drop-shadow-lg">{club.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {club.category}
                  </span>
                  <span className="text-xs bg-[#F18D9E] text-white px-3 py-1 rounded-full font-medium shadow-md">
                    {club.studentCount}名
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="部活動を新規作成"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              名称
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              placeholder="例: バドミントン部"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリー
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            >
              <option value="運動部">運動部</option>
              <option value="文化部">文化部</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all font-medium"
            >
              作成
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
