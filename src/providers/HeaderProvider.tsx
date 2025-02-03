import Header from "@/components/Header";

interface HeaderWrapperProps {
    children: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
