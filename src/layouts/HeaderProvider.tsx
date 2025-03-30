import Header from "@components/headers/CustomerHeader";
import Footer from "@components/Footer/Footer";
import React from "react";

interface HeaderWrapperProps {
	children: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
	return (
		<div>
			<div className="px-28">
				<Header />
			</div>

			{children}

			<div className="px-28">
				<Footer />
			</div>
		</div>
	);
}
