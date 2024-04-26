import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

type PostDetailsProps = {
  userId: number,
  id: number,
  title: string,
  body: string
}

type User = {
  name: string,
  email: string,
  website: string
}

type Comment = {
  id: number,
  name: string,
  email: string,
  body: string
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetailsProps | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post details');
        }
        const postData = await postResponse.json();
        setPost(postData);

        // Fetch author details
        const authorResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        if (!authorResponse.ok) {
          throw new Error('Failed to fetch author details');
        }
        const authorData = await authorResponse.json();
        setAuthor(authorData);

        // Fetch comments
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post details, author details, and comments:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  return (
    <div className='mt-6 mx-3'>
      {post && (
        <div>
          <h2 className='font-semibold'> Title: <span className='font-normal'>{post.title}</span> </h2>
          <p className='font-semibold'> Texto: <span className='font-normal'>{post.body} </span></p>
          <p className='font-semibold'>User ID: <span className='font-normal'>{post.userId}</span></p>
          <p className='font-semibold'>Author: <Link to={`/authors/${post.userId}`} className='font-normal text-blue-500 hover:underline'>View Profile</Link></p>
        </div>
      )}

      {author && (
        <div>
          <h3 className='mt-6 font-semibold'>Author Details</h3>
          <p className='font-semibold'>Name: <span className='font-normal'>{author.name}</span></p>
          <p className='font-semibold'>Email: <span className='font-normal'>{author.email}</span></p>
          <p className='font-semibold'>Website: <span className='font-normal'>{author.website}</span></p>
        </div>
      )}

      <h3 className='mt-5 font-semibold'>Comments</h3>
      <ul>
        {comments.map(comment => (
       <li key={comment.id} className='mt-3 mb-5'>
       <div className="border border-gray-300 rounded-lg p-4">
         <p className='font-semibold mx-3'>Name: <span className='font-normal'>{comment.name}</span></p>
         <p className='font-semibold mx-3'>Email: <span className='font-normal'>{comment.email}</span></p>
         <p className='font-semibold mx-3'>Body: <span className='font-normal'>{comment.body}</span></p>
       </div>
     </li>
     
        ))}
      </ul>
    </div>
  );
}

export default PostDetails;
