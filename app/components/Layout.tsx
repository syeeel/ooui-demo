import { Link, useLocation } from 'react-router';
import { HomeIcon, ClubIcon, StudentIcon, ClassIcon, TeacherIcon, EventIcon } from './Icons';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: HomeIcon },
  { name: '部活動', href: '/clubs', icon: ClubIcon },
  { name: '生徒', href: '/students', icon: StudentIcon },
  { name: 'クラス', href: '/classes', icon: ClassIcon },
  { name: '教員', href: '/teachers', icon: TeacherIcon },
  { name: 'イベント', href: '/events', icon: EventIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30 flex">
      {/* サイドバー */}
      <aside className="w-64 bg-white shadow-xl fixed h-full flex flex-col">
        {/* ロゴ */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3 text-gray-800">
            <span className="bg-gradient-to-br from-primary-400 to-primary-500 p-2.5 rounded-xl shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="font-bold text-xl">スクールライフ</span>
          </Link>
        </div>

        {/* ナビゲーション */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* フッター */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            OOUI Demo App
          </div>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
