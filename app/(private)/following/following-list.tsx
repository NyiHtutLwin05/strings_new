import useSWR from "swr";
import User from "@/app/components/user";

function FollowingList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => "/api/users/" + userData.data.id + "/following?page=" + index
  );

  if (!followerData) return <div>Loading...</div>;
  return (
    <ul>
      {followerData.data.map((user: UserI) => {
        return (
          <li className=" my-5" key={user.id}>
            <User user={user} />
          </li>
        );
      })}
    </ul>
  );
}
export default FollowingList;
