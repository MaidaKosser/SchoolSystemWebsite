import React, { useState } from "react";
import Button from "./Button";
import "../styles/style.css";

export default function Table({ type, data, setData }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = (id) => {
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
    localStorage.setItem(
      type === "student" ? "students" : "teachers",
      JSON.stringify(filtered)
    );
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleUpdate = () => {
    const updated = data.map((item) =>
      item.id === editingId ? editForm : item
    );
    setData(updated);
    localStorage.setItem(
      type === "student" ? "students" : "teachers",
      JSON.stringify(updated)
    );
    setEditingId(null);
  };

  return (
    <div className="container-fluid py-3">
      {/* 👇 This wrapper makes table scrollable on small screens */}
      <div className="scrollable-table-wrapper">
        <table className="table table-bordered table-hover align-middle text-center mb-0">
          <thead className="table-maroon sticky-top" >
            <tr>
              {type === "student" ? (
                <>
                  <th>Full Name</th>
                  <th>Father Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Grade</th>
                </>
              ) : (
                <>
                  <th>Image</th>
                  <th>Full Name</th>
                  <th>Subject</th>
                  <th>Bio</th>
                </>
              )}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((item) => (
                <tr key={item.id}>
                  {editingId === item.id ? (
                    <>
                      {type === "teacher" && (
                        <td>
                          {editForm.image && (
                            <img
                              src={editForm.image}
                              alt="teacher"
                              className="rounded-circle table-img img-fluid"
                            />
                          )}
                        </td>
                      )}
                      <td>
                        <input
                          value={editForm.fullName || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              fullName: e.target.value,
                            })
                          }
                          className="form-control form-control-sm"
                        />
                      </td>

                      {type === "student" ? (
                        <>
                          <td>
                            <input
                              value={editForm.fatherName || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  fatherName: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              value={editForm.dob || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  dob: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.email || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  email: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.contact || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  contact: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <input
                              value={editForm.grade || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  grade: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <input
                              value={editForm.subject || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  subject: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <textarea
                              value={editForm.bio || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  bio: e.target.value,
                                })
                              }
                              className="form-control form-control-sm"
                              rows="2"
                            ></textarea>
                          </td>
                        </>
                      )}
                      <td>
                        <Button
                          label="Update"
                          onClick={handleUpdate}
                          bg="green"
                          hoverBg="darkgreen"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      {type === "teacher" && (
                        <td>
                          {item.image && (
                            <img
                              src={item.image}
                              alt="teacher"
                              className="rounded-circle table-img img-fluid"
                            />
                          )}
                        </td>
                      )}
                      <td>{item.fullName}</td>

                      {type === "student" ? (
                        <>
                          <td>{item.fatherName}</td>
                          <td>{item.dob}</td>
                          <td className="text-break">{item.email}</td>
                          <td>{item.contact}</td>
                          <td>{item.grade}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.subject}</td>
                          <td className="text-break bio-cell">{item.bio}</td>
                        </>
                      )}

                      <td className="d-flex flex-wrap gap-1 justify-content-center">
                        <Button
                          label="Edit"
                          onClick={() => handleEdit(item)}
                          bg="var(--primary-color)"
                          hoverBg="green"
                        />
                        <Button
                          label="Delete"
                          onClick={() => handleDelete(item.id)}
                          bg="red"
                          hoverBg="darkred"
                          color="#fff"
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
