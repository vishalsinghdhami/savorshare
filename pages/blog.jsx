import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "@/components/firebase";
import { v4 } from "uuid";
import { Form, Card, Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
function Blogs() {
  const [allblogs, setAllblogs] = useState([]);
  const [newcomment, setNewcomment] = useState("");
  const [email, setemail] = useState("");

  const addComment = async (blogid, index) => {
    let ret = { email: email, comment: newcomment, blogid: blogid };
    let sample = [...allblogs];
    sample[index].comments.push(ret);

    setAllblogs(sample);
    await axios.post("https://savorshare.onrender.com/blog/addcomment", ret);
  };

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [userid, setuserid] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState("");
  const [type, settype] = useState("image");

  const getblogdata = async () => {
    const response = await axios.get(
      "https://savorshare.onrender.com/blog/getall"
    );
    setAllblogs(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getblogdata();
    setemail(localStorage.getItem("user").email);
    setuserid(localStorage.getItem("user")._id);
  }, []);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `data/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
      });
    });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newblog = async () => {
    handleClose();
    const response = await axios.post(
      "https://savorshare.onrender.com/blog/add ",
      {
        title: title,
        description: description,
        userid: userid,
        photos: {
          title: imageUpload.name,
          url: imageUrls,
          type: "image",
        },
      }
    );
    settitle("");
    setdescription("");
    setImageUpload(null);
    console.log(response);
  };

  return (
    <div>
      <Button
        style={{ fontSize: 16, margin: "2% 2%", backgroundColor: "#d63031" }}
        variant="secondary"
        onClick={handleShow}
      >
        Add new Blog
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => settitle(e.target.value)}
                value={title}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                placeholder="Enter Blog"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <Button
                style={{ backgroundColor: "#d63031", fontSize: 16 }}
                onClick={uploadFile}
              >
                {" "}
                Upload Image
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#d63031", fontSize: 16 }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#d63031", fontSize: 16 }}
            onClick={newblog}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {allblogs.map((it, index) => {
        return (
          <Card
            key={index}
            style={{ fontSize: "16px", marginLeft: "25%", width: "50%" }}
          >
            <Card.Img variant="top" src={it.photos.url} />
            <Card.Body>
              <Card.Title>{it.title}</Card.Title>
              <Card.Text>{it.description}</Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    type="text"
                    onChange={(e) => setNewcomment(e.target.value)}
                    value={newcomment}
                    placeholder="add comment"
                  />
                  <Button
                    style={{ margin: "1% 1%", fontSize: 16 }}
                    onClick={(e) => addComment(it._id)}
                  >
                    Add comment
                  </Button>
                </Form.Group>
              </Form>
              {show2 ? (
                <div>
                  {allblogs.map((it, index) => {
                    return (
                      <p key={index}>
                        {`@${it.comments.email} ${it.comments.comment}`}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              <Button
                style={{ fontSize: 16 }}
                variant="primary"
                onClick={(e) => setShow2(!show2)}
              >
                Show comments
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default Blogs;
