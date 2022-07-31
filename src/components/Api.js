import React,{useEffect,useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Chart from './Chart'
import Modal from 'react-bootstrap/Modal';
import './Api.css';

const Api = () => {

    const [posts,setPosts]= useState([]);
    const [newName, setNewName] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [show, setShow] = useState(false);  
    const BASE_URL = "https://jsonplaceholder.typicode.com/users";

useEffect(() => {
        const getPosts= async () => {
            const { data: res} = await axios.get(BASE_URL);
            setPosts(res);
        };
        getPosts();
      },[]);

      const addPost = async() =>{
        const post ={name:newName ,id:posts.length+1};
        await  axios.post(BASE_URL,post);
        setPosts([post, ...posts]);
    };

    const updatePost = async (post) =>{
        post.name=updateName;
        await axios.put(BASE_URL + "/" + post.id);
        const postsClone = [...posts];
        const index = postsClone.indexOf(post);
        postsClone[index] = {...post};
        setPosts(postsClone);
        setShow(false);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deletePost = async (post) =>{
        await axios.delete(BASE_URL + "/" + post.id + post);
        setPosts(posts.filter((p)=> p.id !== post.id));
    };

    return (
        <div className='text-center'>
        <div className='container'>
       <h5>Number of posts :{posts.length}</h5>
       <label>
           Name:  
           <input type="text" placeholder="Write a new name"  value={newName} onChange={(e) => setNewName(e.target.value)}/>
       </label>
       <Button className='mx-2 mb-1' variant="primary" onClick={addPost}>Add</Button>

           <div>
               {
                   posts.map(post =>
                       <div key={post.id} className='d-flex justify-content-center align-items-center py-4'>
                           <div className='mx-4'>
                           <h5 className='pb-1'>Name</h5>
                           <p className='mt-3'>{post.name}</p>
                           </div>
                           <div className='mx-4'>
                           <h5 className='text-center pb-2'>Update</h5>
                           <Button variant="info" onClick={handleShow}>Update</Button>
                           <Modal show={show} onHide={handleClose} animation={true}>
                           <Modal.Header closeButton>
                           <Modal.Title>Name update</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                           <label>Name:<input type="text" placeholder="Change the name" value={updateName} onChange={(e) => setUpdateName(e.target.value)}/></label>
                           </Modal.Body>
                           <Modal.Footer>
                           <Button variant="secondary" onClick={handleClose}>
                               Close
                           </Button>
                           </Modal.Footer>                   
                       </Modal>
                       <Button variant="success" className='mx-1' onClick={()=> updatePost(post)}>
                               Save
                           </Button>
                           </div>
                           <div className='mx-4'>
                           <h5 className='mb-3'>Delete</h5>
                           <Button variant="danger" onClick={()=> deletePost(post)}>Delete</Button>
                           </div>
                       </div>)
               }
           </div>          
   </div>
   <Chart posts={posts}/>
   </div>
    );
};

export default Api;