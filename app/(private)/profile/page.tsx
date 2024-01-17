"use client";
import useSWR from "swr";
import Form from "./form";
import PostContainer from "@/app/components/post-container";
export default function Profile() {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);

  return (
    <main>
      <h1>Profile</h1>
      <Form />
      <PostContainer username={data.data.username} showEditBtn={true} />
    </main>
  );
}
