import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";

export default function UserPageHeader({ username }: { username: string }) {
  const {
    data: dataUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useSWR("/api/users?username=" + username);
  const {
    data: dataFollows,
    error: errorFollows,
    isLoading: isLoadingFollows,
  } = useSWR(() => "/api/follows?user_id=" + dataUser.data[0].id);

  if (errorFollows || errorUser) return <div>failed to load</div>;
  if (isLoadingFollows || isLoadingUser) return <div>loading...</div>;

  console.log(dataUser, dataFollows);
  if (dataUser.data.length == 0) {
    notFound();
  }
  const user = dataUser.data[0];

  async function handleUnfollow() {
    const res = await fetch("/api/follows/" + user.id, {
      method: "DELETE",
    });
    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }

  async function handleFollow() {
    const res = await fetch("/api/follows/", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id }),
    });
    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }
  return (
    <header className=" w-full rounded-lg bg-slate-800 p-2 flex flex-row items-center justify-between">
      <h1 className=" text-lg font-bold">{username}</h1>
      {dataFollows.data.length > 0 && (
        <button
          onClick={handleUnfollow}
          className=" bg-slate-900 p-2 rounded-lg"
        >
          Unfollow
        </button>
      )}
      {dataFollows.data.length == 0 && (
        <button onClick={handleFollow} className=" bg-slate-900 p-2 rounded-lg">
          Follow
        </button>
      )}
    </header>
  );
}
