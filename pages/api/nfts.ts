import type { NextApiRequest, NextApiResponse } from 'next'
import { Moralis } from 'moralis/node'

const appId = process.env.MORALIS_APPLICATION_ID
const serverUrl = process.env.MORALIS_SERVER_URL
Moralis.start({ serverUrl, appId })

type Data = {
  ethNFTs: object[]
  maticNFTs: object[]
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ethRes = await Moralis.Web3API.account.getNFTs({
    address: '0x423e588119854dF936D7F1e1F33864aba8cDccF2',
    // address: '0x86433770dfc7d4903b9e47640a861cfa9b5b13ac',
  })
  const maticRes = await Moralis.Web3API.account.getNFTs({
    chain: 'matic',
    address: '0x423e588119854dF936D7F1e1F33864aba8cDccF2',
    // address: '0x86433770dfc7d4903b9e47640a861cfa9b5b13ac',
  })
  res.status(200).json({ ethNFTs: ethRes.result, maticNFTs: maticRes.result })
}
