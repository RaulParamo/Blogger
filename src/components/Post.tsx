
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

type PostProps = {
  userId: number,
  id: number,
  title: string,
  body: string
}

const PostList = ({ allPosts }: { allPosts?: boolean }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts${!allPosts ? `?_page=${currentPage}&_limit=5` : ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        if (!allPosts) {
          const totalCountResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`);
          if (!totalCountResponse.ok) {
            throw new Error('Failed to fetch total count of posts');
          }
          const totalCountData = await totalCountResponse.json();
          setTotalPages(Math.ceil(totalCountData.length / 5)); // Calculating total pages based on total number of posts
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [currentPage, allPosts]);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <h1 className='my-3 mx-auto text-center text-2xl uppercase font-black'>Post</h1>

      <ul>
        {posts.map(post => (
       <div className="mb-6">
       <div className="border border-gray-200 rounded-lg">
         <li className='mt-6 mx-3'>
           <Link to={`/post/${post.id}`} className='font-semibold '> Title: <span className='font-normal hover:bg-indigo-100 hover:font-black'>{post.title}</span> </Link>
           <p className='font-semibold'> Texto: <span className='font-normal'>{post.body}</span> </p>
         </li>
       </div>
     </div>
     
        
        ))}
      </ul>
      {!allPosts && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-l"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-700 text-black' : 'bg-blue-200 text-blue-700 hover:bg-blue-300 hover:text-blue-800'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-r"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

const Post = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <PostList /> : null}
      {location.pathname === '/post' ? <PostList allPosts={true} /> : null}
    </>
  )
}

export default Post; 