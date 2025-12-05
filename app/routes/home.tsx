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
  'cl1': '/images/clubs/football.jpg',
  'cl2': '/images/clubs/basketball.jpg',
  'cl3': '/images/clubs/baseball.jpg',
  'cl4': '/images/clubs/tennis.jpg',
  'cl5': '/images/clubs/suisougaku.jpeg',
  'cl6': '/images/clubs/art.jpg',
  'cl7': '/images/clubs/science.jpg',
  'cl8': '/images/clubs/drama.jpeg',
  'cl9': '/images/clubs/calligraphy.png',
  'cl10': '/images/clubs/track.webp',
};

export default function Home() {
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-1 bg-gradient-to-r from-turquoise to-aquamarine rounded-full" />
        </div>
        <h1 className="text-4xl font-bold text-gradient-school mb-2">
          ダッシュボード
        </h1>
        <p className="text-stone">
          学校管理システムへようこそ
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <StatCard
          title="部活動"
          value={clubs.length}
          icon={<ClubIcon className="w-6 h-6" />}
          href="/clubs"
          accentColor="turquoise"
        />
        <StatCard
          title="生徒"
          value={students.length}
          icon={<StudentIcon className="w-6 h-6" />}
          href="/students"
          accentColor="tulip"
        />
        <StatCard
          title="クラス"
          value={classes.length}
          icon={<ClassIcon className="w-6 h-6" />}
          href="/classes"
          accentColor="canary"
        />
        <StatCard
          title="教員"
          value={teachers.length}
          icon={<TeacherIcon className="w-6 h-6" />}
          href="/teachers"
          accentColor="aquamarine"
        />
        <StatCard
          title="イベント"
          value={events.length}
          icon={<EventIcon className="w-6 h-6" />}
          href="/events"
          accentColor="tulip"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 直近のイベント */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tulip/10 flex items-center justify-center">
                <EventIcon className="w-5 h-5 text-tulip" />
              </div>
              <h2 className="text-lg font-bold text-ink">イベント予定</h2>
            </div>
            <Link
              to="/events"
              className="flex items-center gap-1 text-sm text-tulip hover:text-tulip-dark transition-colors group"
            >
              <span>すべて見る</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group block"
              >
                <div className="p-4 rounded-xl bg-tulip-lighter/50 hover:bg-tulip-lighter border border-tulip/10 hover:border-tulip/20 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-ink group-hover:text-tulip-dark transition-colors">
                        {event.name}
                      </p>
                      <p className="text-sm text-stone mt-1">{event.description}</p>
                    </div>
                    <span className="badge badge-tulip whitespace-nowrap ml-4">
                      {event.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 部活動 */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-turquoise/10 flex items-center justify-center">
                <ClubIcon className="w-5 h-5 text-turquoise" />
              </div>
              <h2 className="text-lg font-bold text-ink">部活動</h2>
            </div>
            <Link
              to="/clubs"
              className="flex items-center gap-1 text-sm text-turquoise hover:text-turquoise-dark transition-colors group"
            >
              <span>すべて見る</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {clubs.slice(0, 6).map((club) => (
              <Link
                key={club.id}
                to={`/clubs/${club.id}`}
                className="group relative h-32 rounded-xl overflow-hidden"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${clubImages[club.id]})` }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full p-3 flex flex-col justify-end">
                  <p className="font-bold text-white text-sm drop-shadow-md">
                    {club.name}
                  </p>
                  <div className="flex justify-between items-center mt-1.5">
                    <span className="text-[10px] text-white/70 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {club.category}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-turquoise text-white">
                      {club.studentCount}名
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* クラス一覧 */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-canary/15 flex items-center justify-center">
                <ClassIcon className="w-5 h-5 text-canary-dark" />
              </div>
              <h2 className="text-lg font-bold text-ink">クラス</h2>
            </div>
            <Link
              to="/classes"
              className="flex items-center gap-1 text-sm text-canary-dark hover:text-canary transition-colors group"
            >
              <span>すべて見る</span>
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
                  className="group p-4 rounded-xl bg-canary-lighter/50 hover:bg-canary-lighter border border-canary/15 hover:border-canary/30 transition-all duration-200"
                >
                  <p className="font-semibold text-ink group-hover:text-canary-dark transition-colors">
                    {cls.name}
                  </p>
                  <p className="text-xs text-stone mt-1.5 flex items-center gap-1">
                    <TeacherIcon className="w-3 h-3" />
                    {teacher?.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 教員一覧 */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-aquamarine/15 flex items-center justify-center">
                <TeacherIcon className="w-5 h-5 text-aquamarine-dark" />
              </div>
              <h2 className="text-lg font-bold text-ink">教員</h2>
            </div>
            <Link
              to="/teachers"
              className="flex items-center gap-1 text-sm text-aquamarine-dark hover:text-turquoise transition-colors group"
            >
              <span>すべて見る</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2">
            {teachers.slice(0, 5).map((teacher) => (
              <Link
                key={teacher.id}
                to={`/teachers/${teacher.id}`}
                className="group flex items-center justify-between p-3 rounded-xl bg-aquamarine-lighter/50 hover:bg-aquamarine-lighter border border-aquamarine/15 hover:border-aquamarine/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aquamarine to-turquoise flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {teacher.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink group-hover:text-turquoise-dark transition-colors">
                      {teacher.name}
                    </p>
                    <p className="text-xs text-stone">{teacher.subject}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-stone group-hover:text-turquoise group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
