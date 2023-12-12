import cl from './page.module.scss'
import React from "react";
import FindWrapper from "@/app/Widgets/findWrapper/findWrapper";
import Page from "@/app/search/page";

export default function Home() {
  return (
    <main className={cl.main}>
        <FindWrapper/>
        <Page/>
    </main>
  )
}
