export const NFTCard = ({nft}) => { // Using a prop
    
    return (
        <div className="w-1/3 flex flex-col">
                <div className="rounded-md">
                    <img className="object-cover h-100 w-full rounded-t-lg" src={nft.media[0].gateway}></img> {/* Displays the NFT*/} 
                </div>
            <div className="flex flex-col y-gap-3 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div>
                    <h2 className="text-xl text-black-800">{nft.title}</h2>{/* Displays the NFT title*/} 
                    <p>{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p>{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p> {/* Displays the NFT contract address from the first 4 elements of the address and the last 4 elements*/} 
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-700">{nft.description?.substr(0, 150)}</p> {/* Displays the description, unless it isn't there. Condition is set through the '?' */} 
                </div>

                <div className="flex justify-center mb-1">
                    <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-4 bg-blue-500 w-8/10 text-center rounded-m text-white cursor-pointer">Etherscan View</a> {/* Uses 'target={"_blank"}' to open a new tab for the etherscan page*/}
                </div>
            </div>
            
        </div>
    )
}