import type { Metadata } from "next";

import "./globals.css";
import "../../styles/la.css";
import "../../styles/components.css";
import "../../styles/audit-page.css";

export const metadata: Metadata = {
	title: "Stack Audit",
	description: "Audit AI coding stack spend and savings.",
	icons: {
		icon: "/favicon.svg",
		shortcut: "/favicon.svg",
		apple: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
