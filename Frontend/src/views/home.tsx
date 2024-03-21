import useAxios from 'axios-hooks'
import { Spinner } from '../components'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function HomePage() {
  const { user } = useAuth()
  const navigate =  useNavigate()

  const [{ data, loading }]= useAxios({
    url:'http://localhost:8080/v1/movies',
    method: 'GET',
    headers: {
      Authorization: "bearer " + user?.access_token
    }
  })

  if (loading) return <div className='flex h-full items-center justify-center bg-slate-400'><Spinner /></div>

  return (
    <div className="min-h-full flex flex-1 py-12 lg:px-8">
      {data.map((movie: any) => (
        <div key={movie.id} onClick={() => navigate('/movie/' + movie.id)} className='w-96 m-4 cursor-pointer hover:shadow-md hover:opacity-75'>
          <img src={movie.img} className='mb-4' />
          <h3 className='text-center'>{movie.title}</h3>
          <h5 className='text-center text-sm'>reviews: {movie.reviews.length}</h5>
        </div>  
      ))}
    </div>
  )
}