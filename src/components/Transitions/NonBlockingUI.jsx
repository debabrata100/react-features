import React, { memo, useState, useTransition } from "react";

const tabsArray = [
  {
    id: "about",
    name: "About",
    content: "Welcome to MyProfile",
  },
  {
    id: "post-slow",
    name: "Posts(slow)",
    content: "This is slow loading component",
  },
  {
    id: "cart-page",
    name: "Bag",
    content: "This is Bag page",
  },
];
function AboutPage({ content }) {
  return (
    <div>
      <h3>{content}</h3>
      <h3>Benefits of react Transition</h3>
      <ul>
        <li>
          Transitions are interruptible, which lets the user click away without
          waiting for the re-render to complete.
        </li>
        <li>
          Transitions prevent unwanted loading indicators, which lets the user
          avoid jarring jumps on navigation.
        </li>
        <li>Marking a state update as a non-blocking transition</li>
        <li>Updating the parent component in a transition</li>
        <li>Displaying a pending visual state during the transition</li>
        <li>Preventing unwanted loading indicators</li>
        <li>Building a Suspense-enabled router</li>
      </ul>
    </div>
  );
}
function CartPage({ content }) {
  return (
    <div>
      <h3>Cart Page</h3>
      {content}
    </div>
  );
}

const PostsPage = memo(function ({ content }) {
  let items = [];
  for (let i = 1; i < 1000; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return (
    <div>
      <h3>Posts Page</h3>
      {content}
      <ul>{items}</ul>
    </div>
  );
});

function SlowPost({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }
  return <li>Post: ${index}</li>;
}

function AboutTab({ id, activeTab, onTabClick, name }) {
  return (
    <li
      key={id}
      className={activeTab === id ? "active" : ""}
      onClick={() => onTabClick(id)}
    >
      {name}
    </li>
  );
}
function PostsTab({ id, activeTab, onTabClick, name, isBlocking }) {
  const [isPending, startTransition] = useTransition();
  return (
    <li
      key={id}
      className={activeTab === id ? "active" : ""}
      onClick={() => {
        if (isBlocking) {
          onTabClick(id);
        } else {
          startTransition(() => {
            onTabClick(id);
          });
        }
      }}
    >
      {name}
      {isPending && "loading"}
    </li>
  );
}
function BagTab({ id, activeTab, onTabClick, name }) {
  return (
    <li
      key={id}
      className={activeTab === id ? "active" : ""}
      onClick={() => onTabClick(id)}
    >
      {name}
    </li>
  );
}

function Tabs({ navs, activeTab, onTabClick, isBlocking }) {
  return (
    <div className="tabs">
      <ul>
        {navs.map((nav) => {
          if (nav.id === tabsArray[0].id) {
            return (
              <AboutTab
                key={nav.id}
                id={nav.id}
                name={nav.name}
                activeTab={activeTab}
                onTabClick={onTabClick}
              />
            );
          }
          if (nav.id === tabsArray[1].id) {
            return (
              <PostsTab
                isBlocking={isBlocking}
                key={nav.id}
                id={nav.id}
                name={nav.name}
                activeTab={activeTab}
                onTabClick={onTabClick}
              />
            );
          }
          if (nav.id === tabsArray[2].id) {
            return (
              <BagTab
                key={nav.id}
                id={nav.id}
                name={nav.name}
                activeTab={activeTab}
                onTabClick={onTabClick}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

function TabPage({ tabId }) {
  switch (tabId) {
    case tabsArray[1].id:
      return <PostsPage content={tabsArray[1].content} />;
    case tabsArray[2].id:
      return <CartPage content={tabsArray[2].content} />;
    default:
      return <AboutPage content={tabsArray[0].content} />;
  }
}

export default function NonBlockingUI() {
  const [activeTab, setActiveTab] = useState(tabsArray[0].id);
  const [isBlocking, setIsBlocking] = useState(true);
  const onTabClick = (navId) => {
    setActiveTab(navId);
  };

  return (
    <div className="non-blocking-ui">
      <h2>Avoid Freezing UI by marking a state update as transition</h2>
      <div>
        <h3>Tabs {isBlocking ? "Without" : "With"} Transition</h3>
        <button onClick={() => setIsBlocking(!isBlocking)}>
          switch to {isBlocking ? `non blocking` : "blocking"} ui
        </button>
      </div>
      <Tabs
        navs={tabsArray}
        isBlocking={isBlocking}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
      <TabPage tabId={activeTab} />
    </div>
  );
}
