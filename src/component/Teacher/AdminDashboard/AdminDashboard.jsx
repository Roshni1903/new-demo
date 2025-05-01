import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "/src/component/LoadingSpinner/LoadingSpinner.jsx";
import { toast } from "react-toastify";
import instance from "/src/component/axiosInstance.jsx";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("dashboard/Teachers/viewExam", {
          headers: {
            "access-token": token,
          },
        });
        setExams(response.data.data);
        setLoading(false);
      } catch (e) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
        setLoading(false);
      }
    };
    setDelete(false);
    if (token) {
      fetchData();
    }
  }, [token, isDelete]);

  const handleDelete = async (id) => {
    const getConfirmation = confirm("Delete the exam?");
    if (getConfirmation) {
      setLoading(true);
      try {
        const response = await instance.delete(
          `dashboard/Teachers/deleteExam?id=${id}`,
          {
            headers: {
              "access-token": token,
            },
          }
        );
        console.log(response);
        if (response.data.statusCode === 200) {
          toast(response.data.message, {
            position: "top-center",
            autoClose: 1000,
          });
        }
        setDelete(true);

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.container}>
          <h1>All Exams</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((examElement) => (
                <tr key={examElement._id}>
                  <td>{examElement.subjectName}</td>
                  <td>{examElement.notes}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/edit-exam/${examElement._id}`}>
                        <button className={styles.btn}>Edit Exam</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(examElement._id)}
                        className={styles.btn}
                      >
                        Delete Exam
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}