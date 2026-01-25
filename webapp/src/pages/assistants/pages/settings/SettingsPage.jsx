import { useState, useEffect } from "react";
import { getUsers, setUserRole } from "@/requests/users";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

export const SettingsPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    setUpdating(userId);
    try {
      const newRole = currentRole === "assistant" ? null : "assistant";
      await setUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) =>
          u.uid === userId ? { ...u, role: newRole } : u
        )
      );
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <PageTransition className="flex flex-col w-full h-full p-4 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage users and their roles</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Users</h2>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">No users found</TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {user.photo_url ? (
                          <img
                            src={user.photo_url}
                            alt={user.display_name || "User"}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {(user.display_name || user.email || "?")[0].toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{user.display_name || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email || "-"}</TableCell>
                    <TableCell>
                      {user.role === "assistant" ? (
                        <Badge variant="default">Assistant</Badge>
                      ) : (
                        <Badge variant="secondary">User</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.uid !== currentUser?.uid && (
                        <Button
                          size="sm"
                          variant={user.role === "assistant" ? "destructive" : "default"}
                          disabled={updating === user.uid}
                          onClick={() => handleToggleRole(user.uid, user.role)}
                        >
                          {updating === user.uid
                            ? "Updating..."
                            : user.role === "assistant"
                            ? "Remove Assistant"
                            : "Make Assistant"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </PageTransition>
  );
};
