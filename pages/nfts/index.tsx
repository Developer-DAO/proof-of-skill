import { GetServerSidePropsContext } from 'next'
import axios from '../../utils/axiosConfig'

import NftList from '../../components/NftList'

export default function indexPage({
  data,
}: {
  data: {
    ethNFTs: object[]
    maticNFTs: object[]
  }
}) {
  return (
    <>
      <NftList nfts={data} />
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data } = await axios.get('/api/nfts')
  console.log(data)
  return {
    props: {
      data,
    },
  }
}
