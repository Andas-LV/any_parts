export const exampleSessions = [
	{
		id: 1,
		device: "Desktop Window",
		browser: "Chrome 131.0",
		ip: "88.204.136.105",
		location: "Казахстан, Алматы",
		timestamp: "2025-01-27T12:34:00Z",
		isCurrent: true,
	},
	{
		id: 2,
		device: "Desktop Window",
		browser: "Chrome 131.0",
		ip: "88.204.136.105",
		location: "Казахстан, Алматы",
		timestamp: "2024-12-27T12:34:00Z",
		isCurrent: false,
	},
	{
		id: 3,
		device: "Desktop Window",
		browser: "Chrome 131.0",
		ip: "88.204.136.105",
		location: "Казахстан, Астана",
		timestamp: "2024-10-27T12:34:00Z",
		isCurrent: false,
	},
	{
		id: 4,
		device: "Desktop Window",
		browser: "Chrome 131.0",
		ip: "88.204.136.105",
		location: "Казахстан, Алматы",
		timestamp: "2024-12-27T12:34:00Z",
		isCurrent: false,
	},
	{
		id: 5,
		device: "Desktop Window",
		browser: "Chrome 131.0",
		ip: "88.204.136.105",
		location: "Казахстан, Астана",
		timestamp: "2024-10-27T12:34:00Z",
		isCurrent: false,
	},
];

export const exampleCurrentSession =
	exampleSessions.find((session) => session.isCurrent) || null;
