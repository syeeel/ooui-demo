import { Link, useLocation } from 'react-router';
import { HomeIcon, ClubIcon, StudentIcon, ClassIcon, TeacherIcon, EventIcon } from './Icons';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: HomeIcon, color: 'turquoise' },
  { name: '部活動', href: '/clubs', icon: ClubIcon, color: 'turquoise' },
  { name: '生徒', href: '/students', icon: StudentIcon, color: 'tulip' },
  { name: 'クラス', href: '/classes', icon: ClassIcon, color: 'canary' },
  { name: '教員', href: '/teachers', icon: TeacherIcon, color: 'aquamarine' },
  { name: 'イベント', href: '/events', icon: EventIcon, color: 'tulip' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-aquamarine/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-tulip/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-canary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="w-64 fixed h-screen bg-white/80 backdrop-blur-xl flex flex-col border-r border-aquamarine/20 shadow-soft z-50">
          {/* Logo */}
          <div className="p-5 border-b border-aquamarine/10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-turquoise to-aquamarine flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-gradient-school block">スクールライフ</span>
                <span className="text-[10px] text-stone tracking-wider">School Management</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group animate-slide-in-left opacity-0`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Active background */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-turquoise/15 to-aquamarine/10 border border-turquoise/20'
                      : 'hover:bg-aquamarine/10'
                  }`} />

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-turquoise to-aquamarine rounded-r-full" />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-br from-turquoise to-aquamarine text-white shadow-soft'
                      : 'bg-aquamarine-lighter text-turquoise group-hover:bg-aquamarine/20'
                  }`}>
                    <Icon className="w-[18px] h-[18px]" />
                  </div>

                  {/* Label */}
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-turquoise-dark font-semibold' : 'text-charcoal group-hover:text-turquoise-dark'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-aquamarine/10">
            <div className="bg-gradient-to-br from-aquamarine-lighter to-white rounded-xl p-4 border border-aquamarine/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
                <span className="text-xs font-medium text-turquoise-dark">稼働中</span>
              </div>
              <div className="text-[10px] text-stone">
                OOUI Demo App v2.0
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-64 min-h-screen">
          <div className="max-w-6xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
