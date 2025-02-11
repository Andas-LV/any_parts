"use client"

import Banner from "@/components/Banner/Banner";
import { Items } from "@/components/Items";
import HeaderProvider from "@/providers/HeaderProvider";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

export default function Home() {
    const { toast } = useToast();
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('redirected') === 'true') {
            toast({
                variant: "default",
                title: "Вы не авторизованы.",
                description: "Пожалуйста зарегистрируйтесь.",
            })
        }
    }, [searchParams])

    return (
        <div>
            <HeaderProvider>
                <div className="container px-28">
                    <Banner/>
                    <Items/>
                </div>
            </HeaderProvider>
        </div>
    );
}
