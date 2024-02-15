import ApiService from '../api/ApiService'

function Home() {
  const { isFetching: fetchingHello, data: helloWorld } =
    ApiService.useGetHelloWorld()

  return (
    <div className="flex items-center justify-center h-screen">
      {' '}
      {fetchingHello && <div>Loading...</div>}
      {helloWorld && (
        <div className="bg-amber-200">
          <p className="font-bold text-green-600">{helloWorld.message}</p>
        </div>
      )}
    </div>
  )
}

export default Home
