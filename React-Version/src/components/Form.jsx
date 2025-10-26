import React, { useState } from "react";
import Button from "./Button";
import "../styles/style.css";

export default function Form({ type, setData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    email: "",
    contact: "",
    grade: "",
    subject: "",
    bio: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = (event) =>
        setFormData({ ...formData, image: event.target.result });
      if (files && files[0]) reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    let newEntry =
      type === "student"
        ? {
            id: Date.now(),
            fullName: formData.fullName,
            fatherName: formData.fatherName,
            dob: formData.dob,
            email: formData.email,
            contact: formData.contact,
            grade: formData.grade,
          }
        : {
            id: Date.now(),
            fullName: formData.fullName,
            subject: formData.subject,
            bio: formData.bio,
            image: formData.image,
          };

    const key = type === "student" ? "students" : "teachers";
    const existingData = JSON.parse(localStorage.getItem(key)) || [];
    const updatedData = [...existingData, newEntry];
    localStorage.setItem(key, JSON.stringify(updatedData));
    setData(updatedData);

    setFormData({
      fullName: "",
      fatherName: "",
      dob: "",
      email: "",
      contact: "",
      grade: "",
      subject: "",
      bio: "",
      image: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="custom-form shadow-sm p-4 rounded-4 mb-5 bg-light"
    >
      <div className="container-fluid">
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fw-semibold">Full Name:</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" placeholder="Enter full name" required/>
          </div>

          {type === "student" ? (
            <>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">Father Name:</label>
                <input name="fatherName" value={formData.fatherName} onChange={handleChange} className="form-control" placeholder="Enter father's name"/>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter email address"/>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">Contact Number:</label>
                <input name="contact" value={formData.contact} onChange={handleChange} className="form-control" placeholder="Enter contact number"/>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">
                  Grade Level Applying For:
                </label>
                <select name="grade" value={formData.grade} onChange={handleChange} className="form-select">
                  <option value="">Select Grade</option>
                  {[
                    "Play Group",
                    "Nursery",
                    "Prep",
                    "Grade 1",
                    "Grade 2",
                    "Grade 3",
                    "Grade 4",
                    "Grade 5",
                    "Grade 6",
                    "Grade 7",
                    "Grade 8",
                    "Grade 9",
                    "Grade 10",
                  ].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">Subject(s) Taught:</label>
                <input name="subject" value={formData.subject} onChange={handleChange} className="form-control" placeholder="e.g. Mathematics, English"/>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <label className="form-label fw-semibold">
                  Upload Image (Optional):
                </label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Bio / Teaching Philosophy:
                </label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} className="form-control" rows="3" placeholder="Write a few lines about your teaching philosophy..."></textarea>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-4">
          <Button type="submit" label="Submit" />
        </div>
      </div>
    </form>
  );
}
