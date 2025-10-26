import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Form from "../components/Form";
import Table from "../components/Table";
import Vision from "../components/Vision";
import "../styles/style.css";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    setStudents(storedStudents);
    setTeachers(storedTeachers);
  }, []);

  // Sync updates
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  return (
    <>
      <Navbar />
      <HeroCarousel />

      <main className="container py-5">
        {/* Student Section */}
        <section id="student-admission">
          <Heading title="Student Admission" className="mt-4" />
          <Form type="student" data={students} setData={setStudents} />
          <Table type="student" data={students} setData={setStudents} />
        </section>
      </main>

      {/* Faculty Section */}
      <section id="faculty-section" className="d-block w-100">
        <div className="container py-5">
          <Heading title="Faculty Section" />
          <Form type="teacher" data={teachers} setData={setTeachers} />
          <Table type="teacher" data={teachers} setData={setTeachers} />
        </div>
      </section>

      <Vision />
      <Footer />
    </>
  );
}
