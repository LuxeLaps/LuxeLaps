import { 
  Connection, 
  PublicKey, 
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction // Add this import
} from '@solana/web3.js';
import { 
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID // Add this import
} from '@solana/spl-token';

// Add interface for metadata
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL);

export async function mintNFT(imageUrl: string, metadata: NFTMetadata) {
  try {
    // Fund the mint authority with SOL
    const mintAuthority = Keypair.generate();
    const airdropSignature = await connection.requestAirdrop(
      mintAuthority.publicKey,
      1000000000 // 1 SOL
    );
    await connection.confirmTransaction(airdropSignature);

    // Create mint account
    const mint = await createMint(
      connection,
      mintAuthority,
      mintAuthority.publicKey,
      mintAuthority.publicKey, // Freeze authority
      0  // 0 decimals for NFT
    );

    // Create token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      mintAuthority,
      mint,
      mintAuthority.publicKey
    );

    // Mint 1 token (NFT)
    await mintTo(
      connection,
      mintAuthority,
      mint,
      tokenAccount.address,
      mintAuthority,
      1
    );

    // Add metadata transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: mintAuthority.publicKey,
        toPubkey: tokenAccount.address,
        lamports: 5000 // Rent exempt amount
      })
    );

    await sendAndConfirmTransaction(connection, transaction, [mintAuthority]);

    return {
      mint: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      metadata,
      owner: mintAuthority.publicKey.toBase58()
    };
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}