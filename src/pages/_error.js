// import Link from 'next/link'

function Error({ statusCode }) {

  // const goBack = () => {
  //   return (
  //       <Link href="/"><a>Go back home</a></Link>
  //   )
  // }
  return (
    
    <h2 className="text-white text-lg h-full flex items-center justify-center flex-row">
      { statusCode === 404 ?
        `Error ${statusCode} page not found`
        : statusCode ? `An error ${statusCode} occurred on server`
        : `An error occurred on client`
      }
    </h2>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error