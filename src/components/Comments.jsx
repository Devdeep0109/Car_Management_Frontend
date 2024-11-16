import axios from "axios";
import {  useEffect, useState } from "react";
import "./Comment.css";

const Comments = (props) => {
     //getting comment from backend.....
    const [commentData, setCommentData] = useState()

    const mess_id = props.mess_id;
   

    const fetchComments = async() =>{
        try{
            await axios.get(`http://localhost:8000/comment/sendComments/${mess_id}`).then(   async(res) => {

                const data = await res.data.data
                console.log("data: ",data);
                console.log("Result ",data);
                setCommentData(await data)
                console.log("Comment Data",commentData);
            })
        }
        catch(error){
            alert(error.message);
        }
    };


   

    useEffect( () =>{
     fetchComments();
    }, [])


    return (
        <div className="innerdiv3">
      
                {!commentData  ? <> <p>No Comments</p></> : <>
                
                {commentData.map((comment ,key) => (
                    <div key={key}>
                        <p>Commented by : {comment.createdBy.username}</p>
                        <p>{comment.content}</p>
                        <p>{comment.createdAt}</p>
                    </div>
                ))}
                </>
                }

                
              
                
       
        </div>
    )
}

export default Comments;
