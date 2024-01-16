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
  const user = dataUser.data[0];

  async function handleUnfollow() {
    const res = await fetch("/api/follows/" + user.id, {
      method: "delete",
    });
    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }

  async function handleFollow() {
    const res = await fetch("/api/follows/", {
      method: "post",
      body: JSON.stringify({ user_id: user.id }),
    });
    if (res.ok) {
      mutate("/api/follows?user_id=" + user.id);
    }
  }
  return (
    <header>
      <div>
        <h1>{username}</h1>
        {dataFollows.data.length > 0 && (
          <button onClick={handleUnfollow}>Unfollow</button>
        )}
        {dataFollows.data.length == 0 && (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </header>
  );
}
