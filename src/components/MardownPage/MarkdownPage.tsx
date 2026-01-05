import { MDXProvider } from "@mdx-js/react";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { lazy, Suspense, useMemo } from "react";
import ColorPicker from "../Settings/components/ColorPicker";

type MarkdownPageProps = HtmlProps & {
  path: string
};

const mdxPages = import.meta.glob('/src/assets/content/*.mdx');

export default function MarkdownPage({
  path,  
}: MarkdownPageProps) {
  console.log("Rendering Page");

  // Available component list
  const mdxComponents = {
    ColorPicker,
  };

  const PageComponent = useMemo(() => {
    const importer = mdxPages[`/src/assets/content/${path}.mdx`];
    if (!importer) return null;
    return lazy(importer as () => Promise<{ default: React.ComponentType<any> }>);
  }, [path]);

  if (!PageComponent) {
    return <div className="page-card-container">
      <div className="page-card-content">Page introuvable</div>
    </div>;
  }

  return (<div
    className="page-card-container"
  >
    <div
      className="page-card-content"
    >
      {
        <MDXProvider
          components={mdxComponents}
        >
          <Suspense fallback="Chargement...">
            <PageComponent key={path} />
          </Suspense>
        </MDXProvider>
      }
    </div>
  </div>);
}