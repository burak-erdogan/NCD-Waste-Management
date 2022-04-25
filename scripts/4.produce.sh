#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$PRODUCER" ] && echo "Missing \$PRODUCER environment variable" && exit 1

echo
echo 'About to call produce() on the contract'
echo 'This call is produce new waste on the contract'
echo near call $CONTRACT produce '{"name": "TestWaste", "desc":"Metal", "deposit": 1 }' --accountId $PRODUCER --amount 1
echo 
echo \$CONTRACT is $CONTRACT
echo \$PRODUCER is $PRODUCER
echo 
echo 
echo 'Name= Waste-name, desc= Waste-Desc(Plastic,Metal,Glass etc.) deposit= pay it for produce waste= amount'
echo 'You can change before using script'
echo 'deposit must be 20>x>0 Near'
echo 'amount must be equal deposit'
echo
echo
echo
near call $CONTRACT produce '{"name": "TestWaste", "desc":"Metal", "deposit": 1 }' --accountId $PRODUCER --amount 1