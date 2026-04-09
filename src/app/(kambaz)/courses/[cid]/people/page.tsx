"use client"
import { useState, useEffect } from "react";
import * as client from "../../client"
import { useParams } from "next/navigation";
import PeopleTable from "./table/page";

export default function Table() {
     const { cid } = useParams();
     const [users, setUsers] = useState<any[]>([]);

      const fetchUsers = async () => {
        const users = await client.findUsersForCourse(cid as string);
        setUsers(users);
      };

      useEffect(() => {
        fetchUsers();
      }, []);

      return (
        <PeopleTable users={users} fetchUsers={fetchUsers}/>
      )

}