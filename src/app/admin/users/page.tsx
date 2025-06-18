import ClientUserTable from "@/components/UserTable";
import { stackServerApp } from "@/stack";
import { notFound } from "next/navigation";

export default async function AdminUsersPage() {
 const user = await stackServerApp.getUser();

  // Grab admin credentials from environment
  const adminId = process.env.ADMIN_ID;
  const adminEmail = process.env.ADMIN_EMAIL;

  // Check if user matches admin credentials
  const isAdmin =
    user && user.id === adminId && user.primaryEmail === adminEmail;

  if (!isAdmin) return notFound();

  const rawUsers = await stackServerApp.listUsers();

  // Strip out server methods and keep only serializable fields
  const users = rawUsers.map((user) => ({
    id: user.id,
    primaryEmail: user.primaryEmail,
    displayName: user.displayName,
    signedUpAt: user.signedUpAt,
  }));

  return (
    <div className="max-w-5xl mx-auto mt-10 w-full">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <ClientUserTable users={users} />
    </div>
  );
}
