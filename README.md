# solana-vehiculos
Descripcion
Vehicle Program es un smart contract descentralizado en Solana que permite registrar, listar para venta, transferir y eliminar vehículos de forma transparente y segura. Resuelve problemas del mercado automotriz tradicional como fraudes, intermediarios caros y transferencias lentas.

Caracteristicas
Registro de vehículos con datos completos (marca, modelo, año, precio, placa)
Listado para venta con precio dinámico
Transferencia segura de propiedad
Eliminación con reembolso de SOL
Costo por transacción: ~0.00025 SOL
Velocidad: <400ms por operación
Estructura Tecnica

Copy code
programs/
└── vehicle-program/src/lib.rs     # Smart contract Rust
tests/
└── vehicle-program.ts            # Tests TypeScript
app/
├── index.html                    # Frontend web
└── idl.json                      # Interface description
Anchor.toml                       # Configuración Anchor
Instalacion Local
bash

Copy code
# Requisitos: Node.js, Rust, Solana CLI, Anchor CLI
git clone <repo>
cd vehicle-marketplace
npm install

# Configurar Devnet
solana config set --url devnet
solana-keygen new

# Build y deploy
anchor build
anchor deploy
anchor start
Uso
Desarrollo
bash

Copy code
anchor test                    # Ejecutar tests
anchor build                   # Compilar
anchor deploy                  # Desplegar Devnet
anchor start                   # Frontend local
Funciones del Smart Contract

Copy code
register_vehicle(brand, model, year, price, plate)
list_for_sale(new_price)
transfer_vehicle(new_price)
delete_vehicle()
Program ID

Copy code
HzWgYgPBnbvwKyfXW7Kv2VZ5AggpGGumA5Za2u22sada
Flujo de Usuario
Conectar wallet Phantom (Devnet)
Registrar vehículo: "Toyota Corolla 2023 ABC123"
Listar para venta: 2.5 SOL
Transferir a nuevo propietario
Historial público inmutable
Arquitectura de Datos
Vehicle Account (150 bytes)

Copy code
owner: Pubkey | brand: String<20> | model: String<20> 
year: u16 | price: u64 | plate: String<10> | is_for_sale: bool
Transaction Account (100 bytes)

Copy code
vehicle: Pubkey | seller: Pubkey | buyer: Pubkey | price: u64
Requisitos
Node.js 18+
Rust 1.75+
Solana CLI 1.18+
Anchor CLI 0.30+
Phantom Wallet (Devnet)
Scripts Disponibles
json

Copy code
{
  "test": "anchor test",
  "build": "anchor build", 
  "deploy": "anchor deploy",
  "start": "anchor start"
}
Redes Soportadas
Devnet (desarrollo)
Mainnet (producción)
Contribuciones
Fork del repositorio
Crear feature branch
Anchor test
Pull Request
