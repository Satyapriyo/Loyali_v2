import {
    createTree,
    findLeafAssetIdPda,
    mintToCollectionV1,
    mplBubblegum,
    parseLeafFromMintV1Transaction
  } from '@metaplex-foundation/mpl-bubblegum'
  import {
    createNft,
    mplTokenMetadata,
  } from '@metaplex-foundation/mpl-token-metadata'
  import {
    createGenericFile,
    generateSigner,
    keypairIdentity,
    percentAmount,
    publicKey
  } from '@metaplex-foundation/umi'
  import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
  import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
  import fs from 'fs'
  
  // Create the wrapper function
  const createCnft = async () => {
    //
    // ** Set Up Umi **
    //
  
    // In this instance we are using a locally stored wallet. This can be replaced
    // with the code from 'generating a new wallet' if need be but make sure you
    // airdrop/send at least 7.7 SOL to the new wallet.
  
    const umi = createUmi('https://api.devnet.solana.com')
      .use(mplBubblegum())
      .use(mplTokenMetadata())
      .use(
        irysUploader({
          // mainnet address: "https://node1.irys.xyz"
          // devnet address: "https://devnet.irys.xyz"
          address: 'https://devnet.irys.xyz',
        })
      )
  
    // Generate a new keypair signer.
    const signer = generateSigner(umi)
  
    // You will need to us fs and navigate the filesystem to
    // load the wallet you wish to use via relative pathing.
    const walletFile = fs.readFileSync('./keypair.json')
  
    // Convert your walletFile onto a keypair.
    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletFile))
  
    // Load the keypair into umi.
    umi.use(keypairIdentity(keypair))
  
    //
    // ** Create a Merkle Tree **
    //
  
    const merkleTree = generateSigner(umi)
  
    console.log(
      'Merkle Tree Public Key:',
      merkleTree.publicKey,
      '\nStore this address as you will need it later.'
    )
  
    //   Create a tree with the following parameters.
    //   This tree will cost approximately 7.7 SOL to create with a maximum
    //   capacity of 1,000,000 leaves/nfts. You may have to airdrop some SOL
    //   to the umi identity account before running this script.
  
    console.log('Creating Merkle Tree...')
    const createTreeTx = await createTree(umi, {
      merkleTree,
      maxDepth: 20,
      maxBufferSize: 64,
      canopyDepth: 14,
    })
  
    await createTreeTx.sendAndConfirm(umi)
  
    //
    // ** Create Token Metadata Collection NFT (Optional) **
    //
  
    //
    // If you wish to mint a NFT to a collection you must first create a collection NFT.
    // This step is optional and you can skip it if you do not wish to mint a NFT to a collection
    // or have previously created a collection NFT.
    //
  
    const collectionSigner = generateSigner(umi)
  
    // Path to image file
    const collectionImageFile = fs.readFileSync('./collection.png')
  
    const genericCollectionImageFile = createGenericFile(
      collectionImageFile,
      'collection.png'
    )
  
    const collectionImageUri = await umi.uploader.upload([
      genericCollectionImageFile,
    ])
  
    const collectionMetadata = {
      name: 'My cNFT Collection',
      image: collectionImageUri[0],
      externalUrl: 'https://www.example.com',
      properties: {
        files: [
          {
            uri: collectionImageUri[0],
            type: 'image/png',
          },
        ],
      },
    }
  
    console.log('Uploading Collection Metadata...')
    const collectionMetadataUri = await umi.uploader.uploadJson(
      collectionMetadata
    )
  
    console.log('Creating Collection NFT...')
    await createNft(umi, {
      mint: collectionSigner,
      name: 'My cNFT Collection',
      uri: 'https://www.example.com/collection.json',
      isCollection: true,
      sellerFeeBasisPoints: percentAmount(0),
    }).sendAndConfirm(umi)
  
    //
    //   ** Upload Image and Metadata used for the NFT (Optional) **
    //
  
    //   If you already have an image and metadata file uploaded, you can skip this step
    //   and use the uri of the uploaded files in the mintV1 call.
  
    //   Path to image file
    const nftImageFile = fs.readFileSync('./nft.png')
  
    const genericNftImageFile = createGenericFile(nftImageFile, 'nft.png')
  
    const nftImageUri = await umi.uploader.upload([genericNftImageFile])
  
    const nftMetadata = {
      name: 'My cNFT',
      image: nftImageUri[0],
      externalUrl: 'https://www.example.com',
      attributes: [
        {
          trait_type: 'trait1',
          value: 'value1',
        },
        {
          trait_type: 'trait2',
          value: 'value2',
        },
      ],
      properties: {
        files: [
          {
            uri: nftImageUri[0],
            type: 'image/png',
          },
        ],
      },
    }
  
    console.log('Uploading cNFT metadata...')
    const nftMetadataUri = await umi.uploader.uploadJson(nftMetadata)
  
    //
    // ** Mint a Compressed NFT to the Merkle Tree **
    //
  
    //
    // If you do not wish to mint a NFT to a collection you can set the collection
    // field to `none()`.
    //
  
    // The owner of the cNFT being minted.
    const newOwner = publicKey('111111111111111111111111111111')
  
    console.log('Minting Compressed NFT to Merkle Tree...')
  
  const { signature } = await mintToCollectionV1(umi, {
    leafOwner: newOwner,
    merkleTree: merkleTree.publicKey,
    collectionMint: collectionSigner.publicKey,
    metadata: {
      name: 'My cNFT',
      uri: nftMetadataUri, // Either use `nftMetadataUri` or a previously uploaded uri.
      sellerFeeBasisPoints: 500, // 5%
      collection: { key: collectionSigner.publicKey, verified: false },
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          share: 100,
        },
      ],
    },
  }).sendAndConfirm(umi, { send: { commitment: 'finalized' } })
  
    //
    // ** Fetching Asset **
    //
  
    //
    // Here we find the asset ID of the compressed NFT using the leaf index of the mint transaction
    // and then log the asset information.
    //
  
    console.log('Finding Asset ID...')
    const leaf = await parseLeafFromMintV1Transaction(umi, signature)
    const assetId = findLeafAssetIdPda(umi, {
      merkleTree: merkleTree.publicKey,
      leafIndex: leaf.nonce,
    })
  
    console.log('Compressed NFT Asset ID:', assetId.toString())
  
    // Fetch the asset using umi rpc with DAS.
    //const asset = await umi.rpc.getAsset(assetId[0])
  
    //console.log({ asset })
  };
  
  // run the wrapper function
  createCnft();