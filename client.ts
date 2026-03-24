import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { VehicleProgram } from "../target/types/vehicle_program";
import { PublicKey } from "@solana/web3.js";

const main = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  const program = anchor.workspace.VehicleProgram as Program<VehicleProgram>;
  const owner = provider.wallet.publicKey;
  
  console.log(" Vehicle Program Client");
  console.log("Wallet:", owner.toString());
  
  // 1. Register vehicle
  const [vehiclePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("vehicle"), owner.toBuffer()],
    program.programId
  );
  
  await program.methods
    .registerVehicle("Ford", "Mustang", 2024, new BN("2000000000"), "XYZ789")
    .accounts({
      vehicle: vehiclePDA,
      owner,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
  
  const vehicle = await program.account.vehicle.fetch(vehiclePDA);
  console.log(" Vehicle registered:", {
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year.toString(),
    price: vehicle.price.toString(),
    plate: vehicle.plate,
  });
  
  console.log("Demo completo!");
};

main().catch(console.error);
