import type { Route } from "./+types/home";
import { Layout } from "~/components/Layout";
import { StatCard } from "~/components/StatCard";
import { ClubIcon, StudentIcon, ClassIcon, TeacherIcon, EventIcon, ChevronRightIcon } from "~/components/Icons";
import { clubs, students, classes, teachers, events } from "~/data/mockData";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "スクールライフ - ダッシュボード" },
    { name: "description", content: "OOUIデモ - 学校生活支援アプリ" },
  ];
}

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

export default function Home() {
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
          ダッシュボード
        </h1>
        <p className="text-gray-500 mt-2">学校管理システムへようこそ</p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="部活動"
          value={clubs.length}
          icon={<ClubIcon className="w-6 h-6" />}
          href="/clubs"
        />
        <StatCard
          title="生徒"
          value={students.length}
          icon={<StudentIcon className="w-6 h-6" />}
          href="/students"
        />
        <StatCard
          title="クラス"
          value={classes.length}
          icon={<ClassIcon className="w-6 h-6" />}
          href="/classes"
        />
        <StatCard
          title="教員"
          value={teachers.length}
          icon={<TeacherIcon className="w-6 h-6" />}
          href="/teachers"
        />
        <StatCard
          title="イベント"
          value={events.length}
          icon={<EventIcon className="w-6 h-6" />}
          href="/events"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 直近のイベント */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
              イベント予定
            </h2>
            <Link to="/events" className="text-sm text-[#F18D9E] hover:text-[#e57a8b] flex items-center gap-1 group">
              すべて見る
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
              >
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-primary-700">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
                <span className="text-sm bg-primary-500 text-white px-3 py-1 rounded-full whitespace-nowrap ml-4 font-medium">
                  {event.date}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 部活動カテゴリー */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
              部活動
            </h2>
            <Link to="/clubs" className="text-sm text-[#F18D9E] hover:text-[#e57a8b] flex items-center gap-1 group">
              すべて見る
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {clubs.slice(0, 6).map((club) => (
              <Link
                key={club.id}
                to={`/clubs/${club.id}`}
                className="relative h-32 rounded-xl hover:scale-105 transition-all overflow-hidden group"
              >
                {/* 背景画像 */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${clubImages[club.id]})` }}
                />
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all" />
                {/* コンテンツ */}
                <div className="relative h-full p-4 flex flex-col justify-end">
                  <p className="font-bold text-white text-lg drop-shadow-md">{club.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">{club.category}</span>
                    <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full font-medium shadow-md">
                      {club.studentCount}名
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* クラス一覧 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
              クラス
            </h2>
            <Link to="/classes" className="text-sm text-[#F18D9E] hover:text-[#e57a8b] flex items-center gap-1 group">
              すべて見る
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {classes.map((cls) => {
              const teacher = teachers.find((t) => t.id === cls.teacherId);
              return (
                <Link
                  key={cls.id}
                  to={`/classes/${cls.id}`}
                  className="p-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl hover:from-primary-200 hover:to-primary-100 transition-all hover:scale-105"
                >
                  <p className="font-semibold text-gray-800">{cls.name}</p>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <TeacherIcon className="w-3 h-3" />
                    {teacher?.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 教員一覧 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F18D9E]"></span>
              教員
            </h2>
            <Link to="/teachers" className="text-sm text-[#F18D9E] hover:text-[#e57a8b] flex items-center gap-1 group">
              すべて見る
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-2">
            {teachers.slice(0, 5).map((teacher) => (
              <Link
                key={teacher.id}
                to={`/teachers/${teacher.id}`}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl hover:from-primary-100 hover:to-primary-200/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">
                      {teacher.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-primary-700">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
