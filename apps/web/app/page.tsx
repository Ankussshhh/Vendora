import { Assistance } from "./components/landing/assistance";
import { EarlyAccess } from "./components/landing/early-access";
import { Hero } from "./components/landing/hero";
import { SiteFooter } from "./components/landing/site-footer";
import { SiteHeader } from "./components/landing/site-header";
import { TextileSection } from "./components/landing/textile-section";
import { WorkflowSequence } from "./components/landing/workflow-sequence";
import { WorkspaceScene } from "./components/landing/workspace-scene";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkspaceScene />
        <TextileSection />
        <WorkflowSequence />
        <Assistance />
        <EarlyAccess />
      </main>
      <SiteFooter />
    </>
  );
}
