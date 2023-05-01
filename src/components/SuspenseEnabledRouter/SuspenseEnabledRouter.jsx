import React, { Suspense, useState, useTransition } from "react";
import TodoData from "../TodoData";

export default function SuspenseEnabledRouter() {
  return (
    <div>
      <h1>SuspenseEnabledRouter Example</h1>
      <Suspense fallback={<BigSpinner />}>
        <Router />
      </Suspense>
    </div>
  );
}

function Router() {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();
  let content = <did>404</did>;
  const navigate = (url) => {
    startTransition(() => {
      setPage(url);
    });
  };

  if (page === "/") {
    content = <IndexPage navigate={navigate} />;
  }
  if (page === "/product") {
    content = <ProductPage navigate={navigate} />;
  }

  return <Layout isPending={isPending}>{content}</Layout>;
}

function ProductPage({ navigate }) {
  return (
    <div>
      <h2>Porudct Page</h2>
      <button onClick={() => navigate("/")}>Open Home Pag</button>
      <TodoData />
    </div>
  );
}

function IndexPage({ navigate }) {
  return (
    <div>
      <h2>Index Page</h2>
      <button onClick={() => navigate("/product")}>Open ProductPage</button>
    </div>
  );
}

function Layout({ isPending, children }) {
  return (
    <div style={{ opacity: isPending ? 0.5 : 1 }}>
      <div className="layout-header">Header</div>
      {children}
    </div>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
