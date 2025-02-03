import Banner from "@/components/Banner/Banner";
import { Items } from "@/components/Items";
import HeaderProvider from "@/providers/HeaderProvider";
import React from "react";

export default function Home() {
    return (
        <HeaderProvider>
            <Banner />
            <Items />
        </HeaderProvider>
    );
}
