import { useState } from 'react';
import ApiService from '../api/ApiService'
import { HtmlEntity } from '../types/HtmlEntity';
import ContentItem from '../components/ContentItem';

function Home() {
  const { isFetching: fetchingHello, data: helloWorld } =
    ApiService.useGetHelloWorld()
  
  const [htmlContent, setHtmlContent] = useState([] as HtmlEntity[])
  const [contentDisplayToggle, setContentDisplayToggle] = useState(false as boolean)

  const useRetrieveContent = ApiService.useRetrieveContent();

  const retrieveContentHandler = () => {

    const retrievedData = useRetrieveContent.data;
    if (retrievedData) {
      setHtmlContent(retrievedData);
      setContentDisplayToggle(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{fetchingHello && <div>Loading...</div>}
      {helloWorld && (
        <div className="bg-amber-200">
          <p className="font-bold text-green-600">{helloWorld.message}</p>
        </div>
      )}</h1>
      {' '}
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded border border-blue-700 hover:bg-blue-700"
         style={{display:!contentDisplayToggle?"":"none"}} onClick={retrieveContentHandler}>Retrieve wiki page content</button>
      <div className="overflow-auto max-h-150">
        {htmlContent.map(eachContent => 
          <ContentItem
          key={eachContent.id}
          content={eachContent}
        />
        )}
      </div>
    </div>
  )
}

export default Home