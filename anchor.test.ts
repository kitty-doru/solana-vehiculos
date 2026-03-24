import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VehicleProgram } from "../target/types/vehicle_program";
import { assert } from "chai";

describe("vehicle-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.VehicleProgram as Program<VehicleProgram>;
  let vehicleKp: anchor.web3.Keypair;

  beforeEach(() => {
    vehicleKp = anchor.web3.Keypair.generate();
  });

  it("Registers vehicle", async () => {
    await program.methods
      .registerVehicle("Toyota", "Corolla", 2023, 1000000000n, "ABC123")
      .accounts({
        vehicle: vehicleKp.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([vehicleKp])
      .rpc();

    const vehicle = await program.account.vehicle.fetch(vehicleKp.publicKey);
    
    assert.equal(vehicle.brand, "Toyota");
    assert.equal(vehicle.model, "Corolla");
    assert.equal(vehicle.year, 2023);
    assert.equal(vehicle.plate, "ABC123");
    assert.isTrue(vehicle.isForSale);
    console.log("✅ Vehicle OK!");
  });

  it(" Lists for sale", async () => {
    // Register
    await program.methods
      .registerVehicle("Ford", "F150", 2024, 2000000000n, "XYZ456")
      .accounts({
        vehicle: vehicleKp.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([vehicleKp])
      .rpc();

    // List for sale
    await program.methods
      .listForSale(2500000000n)
      .accounts({
        vehicle: vehicleKp.publicKey,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const vehicle = await program.account.vehicle.fetch(vehicleKp.publicKey);
    assert.equal(vehicle.price, 2500000000n);
    console.log(" List OK!");
  });
});
