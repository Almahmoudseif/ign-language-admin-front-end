import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lessons.css";

const LessonList = ({ refresh }) => {
  const [lessons, setLessons] = useState([]);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lessonType: "",
    imageFile: null,
    videoFile: null,
  });
  const [levelFilter, setLevelFilter] = useState("ALL");

  const fetchLessons = async () => {
    try {
      const res = await axios.get("http://192.168.43.33:8080/api/lessons");
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await axios.delete(`http://192.168.43.33:8080/api/lessons/${id}`);
        fetchLessons();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const startEdit = (lesson) => {
    setEditingLesson(lesson.id);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      lessonType: lesson.lessonType || "",
      imageFile: null,
      videoFile: null,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const updateData = new FormData();
      updateData.append("title", formData.title);
      updateData.append("description", formData.description);
      updateData.append("lessonType", formData.lessonType);

      if (formData.imageFile) updateData.append("image", formData.imageFile);
      if (formData.videoFile) updateData.append("video", formData.videoFile);

      await axios.put(`http://192.168.43.33:8080/api/lessons/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingLesson(null);
      fetchLessons();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const filteredLessons =
    levelFilter === "ALL"
      ? lessons
      : lessons.filter((l) => l.level === levelFilter);

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <label>Filter Level: </label>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="ADVANCED">ADVANCED</option>
        </select>
      </div>

      {filteredLessons.length === 0 ? (
        <p>No lessons found for this level.</p>
      ) : (
        <table className="lessons-table">
          <thead>
            <tr>
              <th>Lesson Name</th>
              <th>Description</th>
              <th>Media</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>
                  {editingLesson === lesson.id ? (
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  ) : (
                    lesson.title
                  )}
                </td>
                <td>
                  {editingLesson === lesson.id ? (
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  ) : (
                    lesson.description
                  )}
                </td>
                <td>
                  {editingLesson === lesson.id ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({ ...formData, imageFile: e.target.files[0] })
                        }
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          setFormData({ ...formData, videoFile: e.target.files[0] })
                        }
                      />
                    </>
                  ) : lesson.imageUrl ? (
                    <img
                      src={lesson.imageUrl}
                      alt={lesson.title}
                      style={{ width: "120px" }}
                    />
                  ) : lesson.videoUrl ? (
                    <video width="200" controls>
                      <source src={lesson.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    "No media"
                  )}
                </td>
                <td>
                  {editingLesson === lesson.id ? (
                    <>
                      <button onClick={() => handleUpdate(lesson.id)}>💾 Save</button>
                      <button onClick={() => setEditingLesson(null)}>❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(lesson)}>✏ Edit</button>
                      <button onClick={() => handleDelete(lesson.id)}>🗑 Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LessonList;
