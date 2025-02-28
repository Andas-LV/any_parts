import Header from "@components/Header";

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
    </div>
  );
}
