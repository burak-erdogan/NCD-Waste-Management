# Waste Management - Near Protocol
Produce waste, register, transfer and recycle it!
This project developed in Patika.dev's Near Bootcamp.
Here is Loom video : https://www.loom.com/share/8e90d36905b54e79b9cbfb6de1388a07
# Roles
- Producer / Can produce waste
- Recycler / Can recycle waste

# Functions
## Producer / You need to be a Producer to produce waste.
```ts
-beProducer(company:string, sector: string)  // Call function
-findProducerById(id:u32)                    // View function
-findProducers(offset: u32, limit: u32=10)   // View function         
```
## Recycler / You need to be a Recycler to recycle waste.
```ts
-beRecycler(name:AccountId, type:string)      // Call function
-findRecyclersById(id:u32)                    // View function        
-findRecyclers(offset:u32, limit:u32=10)      // View function         
```
## Waste
```ts
-produce(name:string, desc:string, deposit:u8) // Call function
-transfer(id:u32, recycler:string)             // Call function
-recycle(id:u32)                               // Call function       
-findWasteById(id:u32)                         // View function                          
-findWastes(offset: u32, limit:u32=10)         // View function   
```
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
near call $CONTRACT beProducer '{"company": "TOGG", "sector": "Automotive"}' --accountId ProducerAccountID
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
near call $CONTRACT beRecycler '{"name" : "RECYCLERID", "type": "mixed"}' --accountId RecyclerAccountID
```
View Recycler by Id
```ts
near view $CONTRACT findRecyclersById '{"id" : RecyclerID}'
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
near call $CONTRACT transfer '{"id" : WasteID , "recycler" : "RecyclerAccountID"}' --accountId ProducerAccountID
```
Recycle Waste
```ts
near call $CONTRACT recycle '{"id": WasteID}' --accountId RecyclerAccountID
```
View Waste by ID
```ts
near view $CONTRACT findWasteById '{"id": WasteID}'
```
View Wastes
```ts
near view $CONTRACT findWastes '{"offset" : 0}'
```