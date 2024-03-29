import { useState } from "react";

import FollowersList from "./follower-list";

function FollowerContainer() {
  const [cnt, setCnt] = useState(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FollowersList index={i} key={i} />);
  }
  return (
    <div>
      {pages}
      <div className="flex justify-center w-full">
        <button
          onClick={() => setCnt(cnt + 1)}
          className=" bg-slate-900 p-2 rounded-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
export default FollowerContainer;
