import { useState, useEffect } from "react";
import { Card, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteOutline } from "@mui/icons-material";

export default function Dashboard(props) {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    getForms();
  }, []);

  function getForms() {
    axios({
      method: "get",
      url: "http://localhost:5000/api/forms/getAllForms",
    })
      .then((res) => {
        setForms(res.data.forms || []);
        console.log(res.data.forms);
      })
      .catch((err) => {
        console.error("Error fetching forms:", err);
      });
  }

  function deleteForm(id, name) {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/forms/deleteFormById",
      data: {
        id: id,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("Form deleted successfully");
          getForms();
        } else {
          alert("Error deleting form");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <Paper>
      <Paper
        style={{
          margin: "15px auto",
          width: "95%",
          minHeight: "95vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "auto",
          }}
        >
          {forms.length > 0 ? (
            forms.map((item) => (
              <span
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "50px",
                  flexDirection: "column",
                }}
              >
                <Link
                  to={`/dashboard/viewform/${item.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Card
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      backgroundColor: "#2DB604",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%235AFF24' stroke-width='70.5' stroke-opacity='0.06' %3E%3Ccircle fill='%232DB604' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%232cac06' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%232ba307' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%232a9a08' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23299009' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2328870a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23267e0a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%2325750b' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%2323640b' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%231f5b0b' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%231d53

0a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%231b4b0a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23194309' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23173b08' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23153307' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23132b04' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23112401' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundAttachment: "fixed",
                      backgroundSize: "cover",
                      color: "white",
                    }}
                  >
                    <h3>{item.name}</h3>
                  </Card>
                </Link>
                <Button
                  style={{
                    backgroundColor: "purple",
                    width: "100%",
                    padding: "0",
                    margin: "0",
                  }}
                  onClick={() => {
                    deleteForm(item.id, item.name);
                  }}
                >
                  <DeleteOutline htmlColor="#fff" />
                </Button>
              </span>
            ))
          ) : (
            <h1>No Forms</h1>
          )}
        </div>
      </Paper>
    </Paper>
  );
}
