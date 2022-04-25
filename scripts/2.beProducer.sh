#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$PRODUCER" ] && echo "Missing \$PRODUCER environment variable" && exit 1

echo
echo 'About to call beProducer() on the contract'
echo near call $CONTRACT beProducer '{"company": "TOGG", "sector": "Automotive"}' --accountId $PRODUCER
echo
echo \$CONTRACT is $CONTRACT
echo \$PRODUCER is $PRODUCER
echo 
echo  'You can change COMPANYNAME and SECTORNAME before using script'
echo
near call $CONTRACT beProducer '{"company": "COMPANYNAME", "sector": "SECTOR"}' --accountId $PRODUCER
