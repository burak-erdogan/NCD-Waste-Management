#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$PRODUCER" ] && echo "Missing \$PRODUCER environment variable" && exit 1
[ -z "$RECYCLER" ] && echo "Missing \$RECYCLER environment variable" && exit 1

echo
echo 'About to call transfer() on the contract'
echo 'This call is transfer waste to' $RECYCLER
echo near call $CONTRACT transfer '{"id" : WasteID , "recycler" : "$RECYCLER"}' --accountId $PRODUCER
echo 
echo \$CONTRACT is $CONTRACT
echo \$PRODUCER is $PRODUCER
echo \$RECYCLER is $RECYCLER 
echo 
echo 'View Waste on the contract' 
echo 'You need to be change "WasteID" on script'
near view $CONTRACT findWastes '{"offset" : 0}'
echo 
echo 'You need to change "WasteID" on script'
echo 'You need to change "WasteID" on script'
echo 'You need to change "WasteID" on script'
echo 'You need to change "WasteID" on script'
echo
near view $CONTRACT findRecyclers '{"offset" : 0}'
echo
echo
echo 'You need to change "RECYCLERNAME" on script'
echo 'You need to change "RECYCLERNAME" on script'
echo 'You need to change "RECYCLERNAME" on script'
echo 'You need to change "RECYCLERNAME" on script'
echo
near call $CONTRACT transfer '{"id" : 4047905235 , "recycler" : "recycler.testnet"}' --accountId $PRODUCER