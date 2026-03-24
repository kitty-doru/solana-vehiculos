use anchor_lang::prelude::*;

declare_id!("HzWgYgPBnbvwKyfXW7Kv2VZ5AggpGGumA5Za2u22sada");

#[program]
pub mod vehicle_program {
    use super::*;

    pub fn register_vehicle(
        ctx: Context<RegisterVehicle>,
        brand: String,
        model: String,
        year: u16,
        price: u64,
        plate: String,
    ) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;
        
        vehicle.owner = ctx.accounts.owner.key();
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.year = year;
        vehicle.price = price;
        vehicle.plate = plate;
        vehicle.is_for_sale = true;
        
        msg!("🚗 {} {} registered | Plate: {}", vehicle.brand, vehicle.model, vehicle.plate);
        Ok(())
    }

    pub fn list_for_sale(
        ctx: Context<ListForSale>,
        new_price: u64,
    ) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;
        require!(vehicle.owner == ctx.accounts.owner.key(), VehicleError::NotTheOwner);
        
        vehicle.is_for_sale = true;
        vehicle.price = new_price;
        msg!("📈 Listed for {} lamports", new_price);
        Ok(())
    }

    pub fn delete_vehicle(ctx: Context<DeleteVehicle>) -> Result<()> {
        msg!("🗑️ Vehicle deleted");
        Ok(())
    }
}

#[error_code]
pub enum VehicleError {
    #[msg("Not the owner")]
    NotTheOwner,
}

// ✅ InitSpace + max_len FIJOS
#[account]
#[derive(InitSpace)]
pub struct Vehicle {
    pub owner: Pubkey,
    #[max_len(20)]
    pub brand: String,
    #[max_len(20)]
    pub model: String,
    pub year: u16,
    pub price: u64,
    #[max_len(10)]
    pub plate: String,
    pub is_for_sale: bool,
}

// ✅ Accounts SIMPLIFICADOS
#[derive(Accounts)]
pub struct RegisterVehicle<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Vehicle::INIT_SPACE
    )]
    pub vehicle: Account<'info, Vehicle>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ListForSale<'info> {
    #[account(mut)]
    pub vehicle: Account<'info, Vehicle>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteVehicle<'info> {
    #[account(mut, close = owner)]
    pub vehicle: Account<'info, Vehicle>,
    #[account(mut)]
    pub owner: Signer<'info>,
}
