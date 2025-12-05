// OOUI オブジェクト型定義

// 部（Club）
export interface Club {
  id: string;
  name: string;        // 名称
  category: string;    // カテゴリー
  studentCount: number; // 生徒数
}

// 生徒（Student）
export interface Student {
  id: string;
  name: string;        // 氏名
  grade: string;       // 成績
  classId: string;     // 所属組
  clubIds: string[];   // 所属部
}

// 組（Class）
export interface Class {
  id: string;
  name: string;        // 名称
  grade: number;       // 学年
  teacherId: string;   // 担任教員
}

// 教員（Teacher）
export interface Teacher {
  id: string;
  name: string;        // 氏名
  phone: string;       // 電話番号
  subject: string;     // 担当教科
}

// イベント（Event）
export interface Event {
  id: string;
  name: string;        // 名称
  date: string;        // 日付
  description: string; // 説明
}

// オブジェクトアクション
export type ObjectAction = 'print' | 'create' | 'delete' | 'edit';
