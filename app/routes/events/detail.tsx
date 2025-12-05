import { useParams, Link } from "react-router";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { PrintIcon, ChevronRightIcon } from "~/components/Icons";
import { getEventById, events } from "~/data/mockData";

export function meta() {
  return [{ title: "イベント詳細 - スクールライフ" }];
}

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id!);

  // 他のイベント（前後のイベント）
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const currentIndex = sortedEvents.findIndex((e) => e.id === id);
  const prevEvent = currentIndex > 0 ? sortedEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < sortedEvents.length - 1 ? sortedEvents[currentIndex + 1] : null;

  if (!event) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            イベントが見つかりません
          </h1>
          <Link to="/events" className="text-primary-600 hover:text-primary-800 mt-4 inline-block">
            イベント一覧に戻る
          </Link>
        </div>
      </Layout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // 日付のフォーマット
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("ja-JP", options);
  };

  // 今日との差分
  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(event.date);

  return (
    <Layout>
      <PageHeader title={event.name} subtitle={formatDate(event.date)} backLink="/events" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 基本情報 */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400"></span>
            イベント詳細
          </h2>

          <div className="mb-6">
            <div
              className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                daysUntil < 0
                  ? "bg-gray-100 text-gray-600"
                  : daysUntil === 0
                  ? "bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md"
                  : daysUntil <= 7
                  ? "bg-gradient-to-r from-[#E6D72A] to-yellow-400 text-yellow-900 shadow-md"
                  : "bg-gradient-to-r from-[#F18D9E] to-pink-400 text-white shadow-md"
              }`}
            >
              {daysUntil < 0
                ? "終了"
                : daysUntil === 0
                ? "本日開催!"
                : `あと${daysUntil}日`}
            </div>
          </div>

          <dl className="space-y-6">
            <div>
              <dt className="text-sm text-gray-500 mb-1">名称</dt>
              <dd className="text-xl font-bold text-gray-800">{event.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">日付</dt>
              <dd className="flex items-center gap-2">
                <span className="bg-[#F18D9E]/20 text-[#F18D9E] px-3 py-1 rounded-full text-sm font-medium">
                  {formatDate(event.date)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-2">説明</dt>
              <dd className="text-gray-700 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl p-4 leading-relaxed">
                {event.description}
              </dd>
            </div>
          </dl>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#E6D72A] to-yellow-400 text-yellow-900 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all font-medium text-sm"
            >
              <PrintIcon className="w-4 h-4" />
              印刷
            </button>
          </div>
        </div>

        {/* 関連イベント */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#98DBC6]"></span>
            関連イベント
          </h2>
          <div className="space-y-3">
            {prevEvent && (
              <Link
                to={`/events/${prevEvent.id}`}
                className="block p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-xl hover:from-primary-50 hover:to-primary-100/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-primary-600 font-medium mb-1">前のイベント</p>
                    <p className="font-semibold text-gray-800 group-hover:text-primary-700">{prevEvent.name}</p>
                    <span className="inline-block mt-2 bg-[#F18D9E]/20 text-[#F18D9E] px-2 py-0.5 rounded-full text-xs font-medium">
                      {prevEvent.date}
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )}
            {nextEvent && (
              <Link
                to={`/events/${nextEvent.id}`}
                className="block p-4 bg-gradient-to-r from-gray-50 to-[#E6D72A]/10 rounded-xl hover:from-[#E6D72A]/10 hover:to-[#E6D72A]/20 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-yellow-600 font-medium mb-1">次のイベント</p>
                    <p className="font-semibold text-gray-800 group-hover:text-yellow-700">{nextEvent.name}</p>
                    <span className="inline-block mt-2 bg-[#E6D72A]/20 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {nextEvent.date}
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )}
            {!prevEvent && !nextEvent && (
              <p className="text-gray-500 text-center py-8">関連イベントがありません</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
