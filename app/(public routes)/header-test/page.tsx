"use client";

import Header from "@/components/sections/Header/Header";

export default function HeaderTestPage() {
  return (
    <>
      <Header isAuthenticated={false} onLogoutClick={() => {}} />
      <hr />
      <Header
        isAuthenticated={true}
        user={{ id: "1", name: "Олена Коваленко", avatarUrl: null }}
        onLogoutClick={() => console.log("logout")}
      />
    </>
  );
}
