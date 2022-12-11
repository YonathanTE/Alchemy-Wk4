import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from './components/nftCard'

const Home = () => {
  const [wallet, setWalletAddress] = useState(""); // To specify that the data type will be a String
  const [collection, setCollectionAddress] = useState(""); // ^
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  // Function to gather NFTs for an address & can filter by a condition
  const fetchNFTs = async() => {
    let nfts; 
    console.log("Fetching NFTs");
    const apiKey = "j_UNa8GvqqFUi-lVHlkyGaOvftbjzfji"
    const baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;

    if(!collection.length) { // Condition is based on owner
      var requestOptions = {
        method: 'GET'
      };
      
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else { 
      console.log("Fetching NFTs for collection owned by address");
      
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`; // Condition is based on being a part of a certain collection from the owner

      nfts= await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("NFTs:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  }
  

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const apiKey = "j_UNa8GvqqFUi-lVHlkyGaOvftbjzfji"
      const baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      // Condition to display NFTs found in the collection
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts)
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center py-2=8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2"> {/* To keep everything in the center*/}
        <input disabled={fetchForCollection} className="w-3/5 bg-slate-200 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:test-gray-50" onChange={(e) => {setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add wallet address"></input>
        <input disabled={fetchForCollection} className="w-3/5 bg-slate-200 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:test-gray-50" onChange={(e) => {setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add collection address"></input>
        <label className='text-black-600'><input onChange={(e) => {setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className="disabled:bg-slate-500 text-white bg-blue-500 px-4 py-2 mt-3 rounded-sm w-1/5" onClick={
          () => { 
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }
        }>Send it</button>
      </div>
      <div className="flex flex-wrap gap-y-10 mt-4 w-5/6 gap-x-2 justify-center">
        { // Condition to check if there are any NFTs
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
