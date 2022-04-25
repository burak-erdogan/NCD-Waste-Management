import {PersistentUnorderedMap, math, Context, context, u128, logging, ContractPromiseBatch} from "near-sdk-as";

import { AccountId, asNEAR, Amount } from "./utils";

// storages

export const wastes = new PersistentUnorderedMap<u32, Waste>("w");

export const producers = new PersistentUnorderedMap<u32, Producer>("p");

export const recyclers = new PersistentUnorderedMap<u32, Recycler>("r");

// limitage
export const maxamountlimit = u128.from("20000000000000000000000000");


@nearBindgen
export class Producer {
          id: u32;
          name: AccountId = Context.sender;
          company: string;
          sector: string;
          
          constructor(name: AccountId, company: string, sector: string) {
            this.id = math.hash32<string>(name);
            this.name = Context.sender;
            this.sector = sector;
            this.company = company;
          }

          static beProducer(name: AccountId, company: string, sector: string): Producer {
                                logging.log("Producer created" + name + company + sector);
                                const producer = new Producer(name, company, sector);
                                producers.set(producer.id, producer);
                                return producer;
                                  }

          static findProducerById(id: u32): Producer {
                              return producers.getSome(id);
                              }
          
          static findProducerByName(name: string): Producer {
                return producers.getSome(math.hash32<string>(name));
          }
                               
          static findProducers(offset:u32, limit:u32): Producer[] {
                                return producers.values(offset, limit + offset);
                                }
           }
          
                                
                                  
@nearBindgen
export class Recycler {
          id: u32;
          name: AccountId = Context.sender;
          type: string;
        
          constructor(name: AccountId, type: string) {
            this.id = math.hash32<string>(name);
            this.name = Context.sender
            this.type = type;
          }

          static beRecycler(name: AccountId ,type: string): Recycler {
                                const recycler = new Recycler(name, type);
                                recyclers.set(recycler.id, recycler);
                                return recycler;
                                }

          static findRecyclersById(id: u32): Recycler {
                              return recyclers.getSome(id);
                              }

          static findRecyclers(offset: u32, limit: u32): Recycler[] {
                                return recyclers.values(offset, limit + offset);
                                }
          static findRecyclersByName(name: string): Recycler {
                                return recyclers.getSome(math.hash32<string>(name));
          }
                                   
         }



@nearBindgen
export class Waste {
  id: u32;
  producer: AccountId = context.sender;
  name: string;
  desc: string;
  deposit: u128;
  status: string;
  amountlimit : u128;
  responsible: AccountId = context.sender;
 
                

                  constructor(id:u32 ,name: string, desc: string, deposit: u128, producer: AccountId) {
                    this.id = math.hash32<string>(name);
                    this.name = name;
                    this.desc = desc;
                    this.deposit = Context.attachedDeposit;
                    this.producer = Context.sender;
                    this.status = "pending";
                    this.amountlimit = maxamountlimit;
                    this.responsible = context.sender;
                    }

                  static produceWaste(name: string, desc: string, deposit: u128, producer: AccountId): Waste {
                                  const prod = Producer.findProducerByName(producer);
                                  assert(prod.name == producer, "You need to be a Producer to produce waste");
                                  assert(Context.attachedDeposit == deposit, "You need to pay same deposit ");
                                  assert(deposit > u128.Zero, "Deposit must be greater than 0, If you're polluting the Earth, you have to pay for it.");
                                  assert(deposit <= maxamountlimit, "You can't deposite more than 20 NEAR");
                                  logging.log("Waste produced by:" + Context.sender);
                                  logging.log("Waste name is:" + name);
                                  logging.log("Waste desc is:" + desc);
                                  logging.log("Deposited for Waste:" + asNEAR(deposit) + "NEAR");
                                  let id = math.hash32<string>(name);
                                  let waste = new Waste(id, name, desc, deposit, Context.sender); 
                                  waste.status = "pending";
                                  wastes.set(waste.id, waste);
                                  return waste;
                  }

                  static findWasteById(id: u32): Waste {
                                    let waste = wastes.getSome(id);
                                    return waste;
                                    }

                  static findWastes(offset: u32, limit: u32): Waste[] {
                                    return wastes.values(offset, limit + offset);
                                    }
                  

                  static transferWaste(id: u32, recycler: string): void {
                                    const waste = wastes.getSome(id);
                                    const recyc = Recycler.findRecyclersByName(recycler);
                                    assert(context.sender == waste.responsible, "You are not the responsible for this waste");
                                    assert(recyc.name == recycler, "Recycler must be registered");
                                    waste.responsible = recycler;
                                    waste.status = "transfered";
                                    logging.log("Waste transfered to:" + recycler);
                                    logging.log("Waste status is:" + waste.status);
                                    wastes.set(waste.id, waste); 
                  }

                  static recycleWaste(id: u32): Waste {
                                    const waste = wastes.getSome(id);
                                    const deposited = wastes.getSome(id).deposit;
                                    const recycler = context.sender;
                                    assert(deposited <= maxamountlimit, "You can't withdraw more than 20 NEAR");
                                    assert(context.sender == waste.responsible, "You are not the responsible for this waste");
                                    logging.log("Deposit transferred to " + context.sender);
                                    logging.log("Waste recycled by: " + context.sender);
                                    logging.log("Waste name is: " + waste.name);
                                    logging.log("Waste desc is: " + waste.desc);
                                    logging.log("Waste status is: " + waste.status);
                                    const withdraw = ContractPromiseBatch.create(recycler);
                                    withdraw.transfer(deposited);
                                    waste.status = "recycled";
                                    wastes.set(waste.id, waste);
                                    return waste;
                  }
                }                                 
