# Waste Management - Near Protocol
Produce waste, register, transfer and recycle it!

# Roles
- Producer / Can produce waste
- Recycler / Can recycle waste

# Functions
## Producer / You need to be a Producer to produce waste.
beProducer(company:string, sector: string)
findProducerById(id:u32)
findProducers(offset: u32, limit: u32=10)
## Recycler / You need to be a Recycler to recycle waste.
beRecycler(name:AccountId, type:string)
findRecyclersById(id:u32)
findRecyclers(offset:u32, limit:u32=10)
## Waste
produce(name:string, desc:string, deposit:u8)
transfer(id:u32, recycler:string)
recycle(id:u32)
findWasteById(id:u32)
findWastes(offset: u32, limit:u32=10)

# Build and devDeploy
```ts
yarn
yarn build:release
near dev-deploy ./build/release/waste.wasm
export CONTRACT=<AccountId>
echo $CONTRACT
```

# Functions Usage
BeProducer
```ts
near call $CONTRACT beProducer '{"company": "Man Turkiye", "sector": "Automotive"}' --accountId producer1.testnet
```
View Producer By ID
```ts
near view $CONTRACT findProducerById '{"id": ProducerID }'
```
View Producers
```ts
near view $CONTRACT findProducers '{"offset" : 0 }'
```
BeRecycler
```ts
near call $CONTRACT beRecycler '{"name" : "recycler.testnet", "type": "mixed"}' --accountId recycler.testnet
```
View Recycler by Id
```ts
near view $CONTRACT findRecyclersById '{"id" : 124636559}'
```
View Recyclers
```ts
near view $CONTRACT findRecyclers '{"offset" : 0}'
```
Produce Waste
```ts
near call $CONTRACT produce '{"name": "TestWaste", "desc":"Metal", "deposit": 1 }' --accountId producer1.testnet --amount 1
```
Transfer Waste 
```ts
near call $CONTRACT transfer '{"id" : 3218353101 , "recycler" : "recycler.testnet"}' --accountId producer1.testnet
```
Recycle Waste
```ts
near call $CONTRACT recycle '{"id": 2909267869}' --accountId recycler.testnet
```
View Waste by ID
```ts
near view $CONTRACT findWasteById '{"id": 2903064455}'
```
View Wastes
```ts
near view $CONTRACT findWastes '{"offset" : 1, "limit" : 10}'
```