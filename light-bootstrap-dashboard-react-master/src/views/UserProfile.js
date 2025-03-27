import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const { id } = useParams();
  const storedId = localStorage.getItem("user_id") || id;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/userProfile?id=${23}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [storedId]);

  const handlePasswordChange = async () => {
    if (!window.confirm("Do you want to reset your password?")) return;

    setLoading(true);
    setTimeout(() => alert("Processing request... Please wait."), 500);

    try {
      const response = await fetch("http://localhost:3000/send-reset-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData?.email }),
      });

      const result = await response.json();
      response.ok ? alert("Password reset link sent!") : alert(result.message);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Stored User ID:", storedId); // Debugging
  
    if (!storedId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
  
    if (!window.confirm("Do you want to update your profile?")) return;
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:3000/updateUserProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: storedId,
          name: userData.name,
          about_me: userData.about_me,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Failed to update profile.");
      }
    } catch (error) {
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };
  
  
  if (!userData) return <p>Loading user data...</p>;

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Username</label>
                      <Form.Control
                        name="username"
                        value={userData.name || ""}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>Email</label>
                      <Form.Control
                        name="email"
                        value={userData.email || ""}
                        type="email"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>About Me</label>
                      <Form.Control
                        name="aboutMe"
                        value={userData.about_me || ""}
                        onChange={(e) =>
                          setUserData({ ...userData, about_me: e.target.value })
                        }
                        as="textarea"
                        rows="4"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="btn-fill pull-right" type="submit" variant="info">
                  Update Profile
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Button variant="danger" onClick={handlePasswordChange} disabled={loading}>
                {loading ? "Sending..." : "Change Password"}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md="4">
          <Card className="card-user">
            <Card.Body>
              <div className="author" style={{ textAlign: "center" }}>
                <img
                  alt="User"
                  className="avatar border-gray"
                  src={userData.profile_image || "https://www.w3schools.com/w3images/avatar2.png"}
                  style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                />
                <h5 className="title">{userData.name}</h5>
                <p className="description">Role: {userData.role || "Not Assigned"}</p>
                <p className="description">Teams:</p>
                <ul>
                  {userData.teams && userData.teams.length > 0 ? (
                    userData.teams.map((team, index) => <li key={index}>{team}</li>)
                  ) : (
                    <li>No team assigned</li>
                  )}
                </ul>
                <p className="description">Projects:</p>
                <ul>
                  {userData.projects && userData.projects.length > 0 ? (
                    userData.projects.map((project, index) => <li key={index}>{project}</li>)
                  ) : (
                    <li>No project assigned</li>
                  )}
                </ul>
              </div>
              <p className="description text-center">
                "{userData.about_me || "No bio available"}"
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
