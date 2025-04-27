import React, { useEffect } from "react";
import instance from "../axiosInstance";
export default function AdminDashboard() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("dashboard/Teachers/viewExam", {
          headers: {
            'Authorization': `Bearer ${token}`,


          },


        });

        console.log(response.data)



      } catch (e) {
        console.log(e)
      }


    }

    if (token) {
      fetchData()
    }
  }, [])
  return (
    <>
      <h1>Admin</h1>
    </>
  );
}
