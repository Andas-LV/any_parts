export interface Session {
    id: number; // Уникальный идентификатор сессии
    device: string; // Например, "Desktop Window"
    browser: string; // Например, "Chrome 131.0"
    ip: string; // Например, "88.204.136.105"
    location: string; // Например, "Казахстан, Алматы"
    timestamp: string; // Дата и время последнего входа (ISO 8601)
    isCurrent: boolean; // Флаг, указывающий, является ли это текущая сессия
}
