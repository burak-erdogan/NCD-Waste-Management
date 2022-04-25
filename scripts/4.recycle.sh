#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$PRODUCER" ] && echo "Missing \$PRODUCER environment variable" && exit 1
[ -z "$RECYCLER" ] && echo "Missing \$RECYCLER environment variable" && exit 1

echo
echo 'About to call recycle() on the contract'
echo 'This call is recycle waste and get deposits'
echo near call $CONTRACT recycle '{"id": WasteID}' --accountId $RECYCLER
echo 
echo \$CONTRACT is $CONTRACT
echo \$PRODUCER is $PRODUCER
echo \$RECYCLER is $RECYCLER 
echo 
echo 'View Waste on the contract' 
echo 'You need to be change "WasteID" on script'
near view $CONTRACT findWastes '{"offset" : 0}'
echo 
echo 'You need to be change "WasteID" on script'
echo 'You need to be change "WasteID" on script'
echo 'You need to be change "WasteID" on script'
echo 'You need to be change "WasteID" on script'
echo
echo
echo
near call $CONTRACT recycle '{"id": 4047905235}' --accountId $RECYCLER