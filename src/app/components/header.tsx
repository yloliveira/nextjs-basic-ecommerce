import React from "react";
import { useRouter } from "next/navigation";
import Search from "@/app/components/search";

export default function Header() {
  const router = useRouter();

  const onSubmitSearchForm = ({ text }: { text: string }) => {
    router.push(`/search&term=${text}`);
  };

  return (
    <header
      className="w-full h-28 bg-brandPrimary py-2 px-5"
      data-testid="header"
    >
      <Search onSubmit={onSubmitSearchForm} />
    </header>
  );
}
