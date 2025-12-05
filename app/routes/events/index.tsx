import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import { Layout } from "~/components/Layout";
import { PageHeader } from "~/components/PageHeader";
import { Modal } from "~/components/Modal";
import { PlusIcon } from "~/components/Icons";
import { events } from "~/data/mockData";
import type { Event as EventType } from "~/types";

import "react-big-calendar/lib/css/react-big-calendar.css";

// date-fns ローカライザー設定
const locales = { ja };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// カレンダー用のメッセージ（日本語）
const messages = {
  today: "今日",
  previous: "前",
  next: "次",
  month: "月",
  week: "週",
  day: "日",
  agenda: "一覧",
  date: "日付",
  time: "時間",
  event: "イベント",
  noEventsInRange: "この期間にイベントはありません",
  showMore: (count: number) => `+${count} 件`,
};

export function meta() {
  return [{ title: "イベント一覧 - スクールライフ" }];
}

export default function EventsIndex() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventList, setEventList] = useState(events);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });

  // カレンダー用のイベントデータに変換
  const calendarEvents = useMemo(() => {
    return eventList.map((event) => ({
      id: event.id,
      title: event.name,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: true,
      resource: event,
    }));
  }, [eventList]);

  const handleCreate = () => {
    const newEvent: EventType = {
      id: `e${Date.now()}`,
      name: formData.name,
      date: formData.date,
      description: formData.description,
    };
    setEventList([...eventList, newEvent]);
    setFormData({ name: "", date: "", description: "" });
    setIsModalOpen(false);
  };

  // イベントクリック時の処理
  const handleSelectEvent = (event: { id: string }) => {
    navigate(`/events/${event.id}`);
  };

  // イベントのスタイル
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#5BC8AC",
        borderRadius: "6px",
        border: "none",
        color: "white",
        fontSize: "12px",
        fontWeight: "500",
        padding: "2px 6px",
      },
    };
  };

  return (
    <Layout>
      <PageHeader
        title="イベント"
        subtitle={`${eventList.length}件のイベント`}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-turquoise rounded-full hover:bg-turquoise/5 transition-all shadow-soft hover:shadow-soft-lg text-sm font-medium"
      >
        <PlusIcon className="w-4 h-4 text-turquoise" />
        <span className="text-turquoise">新規作成</span>
      </button>

      {/* カレンダー */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <style>{`
          .rbc-calendar {
            font-family: inherit;
          }
          .rbc-header {
            padding: 12px 0;
            font-weight: 600;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
          }
          .rbc-month-view {
            border: none;
            border-radius: 12px;
            overflow: hidden;
          }
          .rbc-month-row {
            border: none;
          }
          .rbc-day-bg {
            border: 1px solid #f3f4f6;
          }
          .rbc-off-range-bg {
            background-color: #fafafa;
          }
          .rbc-today {
            background-color: rgba(91, 200, 172, 0.1);
          }
          .rbc-date-cell {
            padding: 8px;
            text-align: right;
          }
          .rbc-date-cell > a {
            color: #374151;
            font-weight: 500;
          }
          .rbc-toolbar {
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 10px;
          }
          .rbc-toolbar button {
            color: #374151;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px 16px;
            font-weight: 500;
            transition: all 0.2s;
          }
          .rbc-toolbar button:hover {
            background-color: #f3f4f6;
          }
          .rbc-toolbar button.rbc-active {
            background-color: #5BC8AC;
            color: white;
            border-color: #5BC8AC;
          }
          .rbc-toolbar button.rbc-active:hover {
            background-color: #4db89c;
          }
          .rbc-toolbar-label {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
          }
          .rbc-event {
            cursor: pointer;
          }
          .rbc-event:hover {
            opacity: 0.9;
          }
          .rbc-show-more {
            color: #5BC8AC;
            font-weight: 500;
          }
          .rbc-agenda-view table.rbc-agenda-table {
            border: none;
          }
          .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
            border-bottom: 1px solid #e5e7eb;
            padding: 12px;
            font-weight: 600;
          }
          .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
            padding: 12px;
            border-bottom: 1px solid #f3f4f6;
          }
          .rbc-agenda-event-cell {
            color: #5BC8AC;
            font-weight: 500;
            cursor: pointer;
          }
        `}</style>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          messages={messages}
          culture="ja"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="イベントを新規作成"
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
              placeholder="例: 文化祭"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日付
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              説明
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all resize-none"
              rows={3}
              placeholder="イベントの説明を入力してください"
              required
            />
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
