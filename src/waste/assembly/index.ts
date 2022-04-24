
import { Context, u128, math } from "near-sdk-as";

import { AccountId, toYocto } from "./utils"

import { Waste, Producer, Recycler } from "./model";

//near call $CONTRACT beProducer '{"company": "Man Turkiye", "sector": "Automotive"}' --accountId producer1.testnet

export function beProducer(company:string, sector: string): Producer {
  return Producer.beProducer(Context.sender, company, sector);
}
// near view $CONTRACT findProducerById '{"id": ProducerID }'
export function findProducerById(id:u32): Producer {
  return Producer.findProducerById(id);
}
// near view $CONTRACT findProducers '{"offset" : 0 }'
export function findProducers(offset: u32, limit: u32=10): Producer[] {
  return Producer.findProducers(offset, limit);
}

// near call $CONTRACT beRecycler '{"name" : "recycler.testnet", "type": "mixed"}' --accountId recycler.testnet

export function beRecycler(name:AccountId, type:string): Recycler {
  return Recycler.beRecycler(name, type);
}

// near view $CONTRACT findRecyclersById '{"id" : 124636559}'
export function findRecyclersById(id:u32): Recycler {
  return Recycler.findRecyclersById(id);
}
// near view $CONTRACT findRecyclers '{"offset" : 0}'
export function findRecyclers(offset:u32, limit:u32=10): Recycler[] {
  return Recycler.findRecyclers(offset, limit);
}


//near call $CONTRACT produce '{"name": "TestWaste2", "desc":"Metal", "deposit": 0 }' --accountId producer1.testnet  **deposit cant be 0
//near call $CONTRACT produce '{"name": "TestWaste3", "desc":"Metal", "deposit": 21 }' --accountId producer1.testnet --amount 21   **amount max limited 20 NEAR
// near call $CONTRACT produce '{"name": "TestWaste", "desc":"Metal", "deposit": 1 }' --accountId producer1.testnet --amount 1   *** DONE

export function produce(name:string, desc:string, deposit:u8): Waste {
  return Waste.produceWaste(name, desc, toYocto(deposit), Context.sender);
}

// near call $CONTRACT transfer '{"id" : 3218353101 , "recycler" : "recycler.testnet"}' --accountId producer1.testnet

export function transfer(id:u32, recycler:string): void {
  Waste.transferWaste(id, recycler);
}

// near call $CONTRACT recycle '{"id": 2909267869}' --accountId recycler.testnet
export function recycle(id:u32): void {
  Waste.recycleWaste(id);
}

//near view $CONTRACT findWasteById '{"id": 2903064455}'

export function findWasteById(id:u32): Waste {
  return Waste.findWasteById(id);
}
// near view $CONTRACT findWastes '{"offset" : 1, "limit" : 10}'
export function findWastes(offset: u32, limit:u32=10): Waste[] {
  return Waste.findWastes(offset, limit);
}




