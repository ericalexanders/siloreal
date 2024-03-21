import useAxios from 'axios-hooks'
import { Spinner } from '../components'
import { useAuth } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


export default function MoviePage() {
  const { user } = useAuth()
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [content, setContent] = useState('')

  const [{ data, loading }, refetch]= useAxios({
    url:'http://localhost:8080/v1/movies/' + id,
    method: 'GET',
    headers: {
      Authorization: "bearer " + user?.access_token
    }
  })

  const [{ data: reviewData, loading: reviewLoading }, executePost]= useAxios({
    url:'http://localhost:8080/v1/reviews',
    method: 'POST',
    headers: {
      Authorization: "bearer " + user?.access_token
    }
  })

  const sendReview = async () => {
    const body = {
      title,
      rating: Number(rating),
      content,
      userId: user?.id,
      movieId: data.id
    }
    await executePost({ data: body })
    refetch()
  }

  if (loading || reviewLoading) return <div className='flex h-full items-center justify-center bg-slate-400'><Spinner /></div>

  return (
    <div className="flex justify-center py-12">
      <div className='flex shadow-md'>
        <div key={data.id} className='w-96 m-4'>
          <img src={data.img} className='mb-4' />
          <h3 className='text-center'>{data.title}</h3>
          <h5 className='text-center text-sm'>reviews: {data.reviews.length}</h5>
        </div>

        <div className='w-96 m-4'>
          <h4 className='block text-xl font-semibold leading-6 text-gray-900 mb-8'>New review</h4>
          <form className="mx-auto max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="tiele" className="block text-sm font-semibold leading-6 text-gray-900">
                  Titulo
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="tiele" className="block text-sm font-semibold leading-6 text-gray-900">
                  Rating
                </label>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="title"
                    min={1}
                    max={10}
                    id="title"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  onClick={sendReview}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  send
                </button>
              </div>
            </div>
          </form>
        </div>  
      </div>
      <div className='p-8'>
        {data.reviews.map((review: any) => (
          <div className='bg-slate-200 p-2 rounded-sm'>
            <p>{review.title}</p>
            <p>{review.content}</p>
            <p>Rk: {review.rating}</p>
          </div>  
        ))}
      </div>

    </div>
  )
}